"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";
import { ForgotPasswordForm } from "./forgot-password-form";

export type AuthMode = "sign-in" | "sign-up" | "forgot-password";

export function Auth({ className, ...props }: React.ComponentProps<"div">) {
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {authMode === "sign-in" ? <SignInForm setAuthMode={setAuthMode} /> : null}
      {authMode === "sign-up" ? <SignUpForm /> : null}
      {authMode === "forgot-password" ? <ForgotPasswordForm /> : null}

      {authMode !== "forgot-password" ? (
        <>
          <div className="text-center text-sm">
            {authMode === "sign-in"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              onClick={() => {
                if (authMode === "sign-in") {
                  setAuthMode("sign-up");
                } else if (authMode === "sign-up") {
                  setAuthMode("sign-in");
                }
              }}
              className="underline underline-offset-4 hover:text-primary"
            >
              {authMode !== "sign-up" ? "Sign up" : "Sign in"}
            </button>
          </div>

          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </>
      ) : null}
    </div>
  );
}
