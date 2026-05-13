import {AuthFunctions, createClient, type GenericCtx} from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import {components, internal} from "../convex/_generated/api";
import { DataModel } from "../convex/_generated/dataModel";
import { betterAuth } from "better-auth/minimal";
import authConfig from "./auth";

const siteUrl = process.env.SITE_URL as string;
if (!siteUrl) {
    throw new Error("Missing SITE_URL");
}

const authFunctions: AuthFunctions = internal.auth;

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth, {
    authFunctions,
    triggers: {
        user: {
            onCreate: async (ctx, doc) => {
                await ctx.runMutation(internal.users.mutations.create, {
                    user: {
                        userId: doc._id,
                        name: doc.name,
                        email: doc.email,
                        image: doc.image,
                        createdAt: doc.createdAt
                    }
                })
            },
            onUpdate: async (ctx, newDoc) => {
                await ctx.runMutation(internal.users.mutations.update, {
                    userId: newDoc._id,
                    user: {
                        name: newDoc.name,
                        email: newDoc.email,
                        image: newDoc.image,
                        updatedAt: newDoc.updatedAt
                    }
                })
            },
            onDelete: async (ctx, doc) => {
                await ctx.runMutation(internal.users.mutations.deleteUser, {
                    userId: doc._id,
                })
            }
        }
    }
});

export const createAuth = (ctx: GenericCtx<DataModel>) => {
    return betterAuth({
        baseURL: siteUrl,
        database: authComponent.adapter(ctx),
        // Configure simple, non-verified email/password to get started
        emailAndPassword: {
            enabled: true,
            requireEmailVerification: false,
        },
        plugins: [
            // The Convex plugin is required for Convex compatibility
            convex({ authConfig }),
        ],
    })
}

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();
export const { getAuthUser } = authComponent.clientApi();