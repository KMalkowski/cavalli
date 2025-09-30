'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SignInForm } from './sign-in-form'
import { SignUpForm } from './sign-up-form'
import { ForgotPasswordForm } from './forgot-password-form'

export type AuthMode = 'sign-in' | 'sign-up' | 'forgot-password'

export function Auth({ className, ...props }: React.ComponentProps<'div'>) {
  const [authMode, setAuthMode] = useState<AuthMode>('sign-in')

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      {authMode === 'sign-in' ? <SignInForm setAuthMode={setAuthMode} /> : null}
      {authMode === 'sign-up' ? <SignUpForm /> : null}
      {authMode === 'forgot-password' ? <ForgotPasswordForm /> : null}

      {authMode !== 'forgot-password' ? (
        <>
          <div className="text-center text-sm">
            {authMode === 'sign-in' ? 'Nie masz konta? ' : 'Masz już konto? '}
            <button
              onClick={() => {
                if (authMode === 'sign-in') {
                  setAuthMode('sign-up')
                } else if (authMode === 'sign-up') {
                  setAuthMode('sign-in')
                }
              }}
              className="hover:text-primary cursor-pointer underline underline-offset-4"
            >
              {authMode !== 'sign-up' ? 'Zarejestruj się' : 'Zaloguj się'}
            </button>
          </div>

          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            Kontynuując, zgadzasz się z naszymi{' '}
            <a href="#" className="cursor-pointer">
              Warunkami Użytkowania
            </a>{' '}
            i{' '}
            <a href="#" className="cursor-pointer">
              Polityką Prywatności
            </a>
            .
          </div>
        </>
      ) : null}
    </div>
  )
}
