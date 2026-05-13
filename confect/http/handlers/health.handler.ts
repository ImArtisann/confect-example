import { HttpApiBuilder, HttpServerResponse } from '@effect/platform';
import * as Effect from 'effect/Effect'
import {Api} from "../api";

export const HealthHandlerLive = HttpApiBuilder.group(Api, 'health', (handlers) =>
    handlers.handle('status', () =>
        Effect.gen(function* () {

            return yield* Effect.succeed(HttpServerResponse.text('Received webhook', { status: 200 }));
        }).pipe(Effect.orDie)
    )
)