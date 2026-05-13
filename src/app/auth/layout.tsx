import { isAuthenticated } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import {ClientAuthBoundary} from "@/lib/client-auth-boundary";

export default async function Layout({ children }: PropsWithChildren) {
    if (!(await isAuthenticated())) {
        redirect("/sign-in");
    }
    return <ClientAuthBoundary>{children}</ClientAuthBoundary>;
}