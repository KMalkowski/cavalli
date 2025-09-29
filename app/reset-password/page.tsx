import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const token = typeof params.token === 'string' ? params.token : null

  return (
    <div className="bg-background flex items-center justify-center">
      <ResetPasswordForm token={token} />
    </div>
  )
}
