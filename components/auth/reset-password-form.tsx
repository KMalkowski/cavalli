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
type ResetPasswordFormData = {
  password: string
  confirmPassword: string
}

export function ResetPasswordForm({
  className,
  token,
  ...props
}: React.ComponentProps<'div'> & { token: string | null }) {
  const form = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!token) {
      toast.error('Invalid reset token')
      return
    }

    await authClient.resetPassword(
      {
        newPassword: data.password,
        token,
      },
      {
        onSuccess: () => {
          toast.success('Password reset successfully!')
        },
        onError: (error) => {
          toast.error(error.error.message)
        },
      }
    )
  }

  const isSubmitting = form.formState.isSubmitting

  if (!token) {
    return (
      <div className={cn('flex', className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Invalid Reset Link</CardTitle>
            <CardDescription>
              The password reset link is invalid or has expired. Please request
              a new one.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn('w-full max-w-md', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
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
                  name="password"
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  rules={{
                    required: 'Please confirm your password',
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
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
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
