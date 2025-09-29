'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type AuthMode } from './auth'

type SignInFormData = {
  email: string
  password: string
}

export function SignInForm({
  className,
  setAuthMode,
  ...props
}: React.ComponentProps<'div'> & { setAuthMode: (mode: AuthMode) => void }) {
  const form = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError: (error) => {
          toast.error(error.error.message)
        },
      }
    )
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="grid gap-6">
        <h1 className="text-center text-xl font-bold">Welcome back</h1>
        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={async () => {
              try {
                await authClient.signIn.social({
                  provider: 'google',
                })
              } catch (error) {
                toast.error('Google sign in failed. Please try again.')
                console.error('Google sign in failed:', error)
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>
        </div>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or use your email
          </span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email address',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: 'Password is required',
              }}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <div
                      onClick={() => setAuthMode('forgot-password')}
                      className="ml-auto cursor-pointer text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </div>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
