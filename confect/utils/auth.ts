import {Auth} from "../_generated/services";
import * as Effect from "effect/Effect";

export const getAuth = Effect.fn('getAuth')(function* () {
    const auth = yield* Auth

    return yield* auth.getUserIdentity.pipe(
        Effect.catchTag('NoUserIdentityFoundError', () => Effect.succeed(null))
    );
})