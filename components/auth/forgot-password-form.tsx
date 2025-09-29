'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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

type ForgotPasswordFormData = {
  email: string
}

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const form = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await authClient.forgetPassword(
      {
        email: data.email,
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
      },
      {
        onSuccess: () => {
          toast.success('Password reset email sent! Check your inbox.')
        },
        onError: (error) => {
          toast.error(error.error.message)
        },
      }
    )
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
              >
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Email'}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
