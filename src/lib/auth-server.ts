import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string;
const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_SITE_URL as string;
if (!convexUrl || !convexSiteUrl) {
    throw new Error("Missing Convex URL or Site URL");
}

export const {
    handler,
    preloadAuthQuery,
    isAuthenticated,
    getToken,
    fetchAuthQuery,
    fetchAuthMutation,
    fetchAuthAction,
} = convexBetterAuthNextJs({
    convexUrl: convexUrl,
    convexSiteUrl: convexSiteUrl,
});