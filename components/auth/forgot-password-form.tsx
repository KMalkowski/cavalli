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
          toast.success(
            'Email do resetowania hasła został wysłany! Sprawdź swoją skrzynkę.'
          )
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
          <CardTitle className="text-xl">Zapomniałeś hasła?</CardTitle>
          <CardDescription>
            Podaj swój adres email, a wyślemy Ci link do resetowania hasła
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
                    required: 'Email jest wymagany',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Proszę podać prawidłowy adres email',
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="jan@example.com"
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
                  {isSubmitting ? 'Wysyłanie...' : 'Wyślij email resetujący'}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
