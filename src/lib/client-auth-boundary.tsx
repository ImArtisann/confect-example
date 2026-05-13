"use client";

import { useRouter } from "next/navigation";
import { AuthBoundary } from "@convex-dev/better-auth/react";
import { api } from "@/convex/_generated/api";
import { isAuthError } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import {PropsWithChildren} from "react";

export const ClientAuthBoundary = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    return (
        <AuthBoundary
            authClient={authClient}
            // This can do anything you like, a redirect is typical.
            onUnauth={() => router.replace("/sign-in")}
            getAuthUserFn={api.auth.getAuthUser}
            isAuthError={isAuthError}
        >
            {children}
        </AuthBoundary>
    );
};