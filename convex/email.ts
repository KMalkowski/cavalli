import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { ActionCtx, internalMutation } from "./_generated/server";

export const resend: Resend = new Resend(components.resend, {
  testMode: false,
});

export const sendResetPassword = async (
  ctx: ActionCtx,
  {
    to,
    url,
  }: {
    to: string;
    url: string;
  },
) => {
  console.log("Sending reset password email to", to, url);
  await resend.sendEmail(ctx, {
    from: "System <system@cavalli.pl>",
    to,
    subject: "Reset your password",
    html: `
      <div style="font-family: 'Poppins', sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a; background: #faf7f5; padding: 32px;">
        <h2 style="color: #1a1a1a; font-size: 24px; font-weight: 600; margin-bottom: 16px;">Reset your password</h2>
        <p style="margin-bottom: 24px; line-height: 1.6;">We received a request to reset your password. Click the button below to reset it:</p>
        <p style="text-align: center; margin: 32px 0;">
          <a
            href="${url}"
            style="
              background: #9b2c2c;
              color: #ffffff;
              padding: 8px 16px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: 500;
              font-size: 14px;
              box-shadow: 1px 1px 16px -2px rgba(0, 63, 18, 0.06), 1px 1px 2px -3px rgba(0, 63, 18, 0.12);
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              transition: background 0.2s;
              height: 36px;
              min-width: 36px;
              border: none;
              cursor: pointer;
              outline: none;
            "
          >
            Reset Password
          </a>
        </p>
        <p style="margin-bottom: 8px; line-height: 1.6;">If the button above does not work, copy and paste the following link into your browser:</p>
        <p style="word-break: break-all; margin-bottom: 32px;">
          <a href="${url}" style="color: #9b2c2c; text-decoration: underline;">${url}</a>
        </p>
        <p style="color: #57534e; font-size: 12px; margin-top: 32px; line-height: 1.5;">
          If you did not request a password reset, you can safely ignore this email.
        </p>
      </div>
    `,
  });
};
