'use client'

import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { Auth } from '@/components/auth/auth'

export default function AuthControl() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  return (
    <div>
      <Unauthenticated>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Log in</Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogTitle className="sr-only">Log in</DialogTitle>
            <DialogDescription className="sr-only">
              Sign in to your account to access horse listings and features
            </DialogDescription>
            <Auth />
          </DialogContent>
        </Dialog>
      </Unauthenticated>
      <Authenticated>
        <Button
          disabled={isLoggingOut}
          variant="outline"
          onClick={() => {
            authClient.signOut({
              fetchOptions: {
                onRequest: () => {
                  setIsLoggingOut(true)
                },
                onResponse: () => {
                  setIsLoggingOut(false)
                },
              },
            })
          }}
        >
          Log out
        </Button>
      </Authenticated>
      <AuthLoading>
        <Button variant="outline" disabled>
          Loading...
        </Button>
      </AuthLoading>
    </div>
  )
}
