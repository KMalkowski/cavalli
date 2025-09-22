"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Auth } from "@/components/auth/auth";

export default function AuthControl() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <div>
      <Unauthenticated>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Log in</Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogTitle>Welcome back</DialogTitle>
            <Auth />
          </DialogContent>
        </Dialog>
      </Unauthenticated>
      <Authenticated>
        <Button
          disabled={isLoggingOut}
          onClick={() => {
            authClient.signOut({
              fetchOptions: {
                onRequest: () => {
                  setIsLoggingOut(true);
                },
                onResponse: () => {
                  setIsLoggingOut(false);
                },
              },
            });
          }}
        >
          Log out
        </Button>
      </Authenticated>
    </div>
  );
}
