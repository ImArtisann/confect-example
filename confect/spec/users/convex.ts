import { v } from "convex/values";
import {mutation} from "../../../convex/_generated/server";
import {authComponent, createAuth} from "../../betterAuth";

export const updatePassword = mutation({
    args: {
        currentPassword: v.string(),
        newPassword: v.string(),
    },
    handler: async (ctx, args) => {
        const { auth, headers } = await authComponent.getAuth(createAuth, ctx);
        await auth.api.changePassword({
            body: {
                currentPassword: args.currentPassword,
                newPassword: args.newPassword,
            },
            headers,
        });
    },
});