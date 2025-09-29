import { createClient, type GenericCtx } from '@convex-dev/better-auth'
import { convex } from '@convex-dev/better-auth/plugins'
import { requireActionCtx } from '@convex-dev/better-auth/utils'
import { components } from './_generated/api'
import { DataModel } from './_generated/dataModel'
import { query } from './_generated/server'
import { betterAuth } from 'better-auth'
import { resend, sendResetPassword } from './email'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth)

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false }
) => {
  return betterAuth({
    // disable logging when createAuth is called just to generate options.
    // this is not required, but there's a lot of noise in logs without it.
    logger: {
      disabled: optionsOnly,
    },
    baseURL: process.env.NEXT_PUBLIC_SITE_URL!,
    trustedOrigins: [
      process.env.NEXT_PUBLIC_SITE_URL!,
      'http://localhost:3000',
    ],
    database: authComponent.adapter(ctx),
    // Configure simple, non-verified email/password to get started
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      sendResetPassword: async ({ user, url }) => {
        console.log('Sending reset password email to', user.email, url)
        await sendResetPassword(requireActionCtx(ctx), {
          to: user.email,
          url,
        })
      },
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    plugins: [
      // The Convex plugin is required for Convex compatibility
      convex(),
    ],
  })
}

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    try {
      return await authComponent.getAuthUser(ctx)
    } catch (error) {
      return null
    }
  },
})
