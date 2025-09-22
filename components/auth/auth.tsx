"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

export function Auth({ className, ...props }: React.ComponentProps<"div">) {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {isSignIn ? <SignInForm /> : <SignUpForm />}

      <div className="text-center text-sm">
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsSignIn(!isSignIn)}
          className="underline underline-offset-4 hover:text-primary"
        >
          {isSignIn ? "Sign up" : "Sign in"}
        </button>
      </div>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
