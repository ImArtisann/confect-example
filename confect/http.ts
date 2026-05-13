import { HttpApi } from '@confect/server';
import { HttpMiddleware } from '@effect/platform';
import { flow } from 'effect';
import {ConvexApi} from "./http/convexApi";
import {authComponent, createAuth} from "./betterAuth";

export const siteUrl = process.env.SITE_URL;
if (!siteUrl) throw new Error('SITE_URL is not set');

const http = HttpApi.make({
    '/api/': {
        apiLive: ConvexApi,
        middleware: flow(
            HttpMiddleware.cors({
                allowedOrigins: [siteUrl],
                allowedHeaders: ['Content-Type', 'Authorization', 'Better-Auth-Cookie', 'x-convex-secret'],
                allowedMethods: ['GET', 'POST', 'OPTIONS'],
                exposedHeaders: ['Content-Length', 'Set-Better-Auth-Cookie'],
                maxAge: 600,
                credentials: true,
            }),
            HttpMiddleware.logger
        ),
    }
})

authComponent.registerRoutes(http, createAuth)

export default http;