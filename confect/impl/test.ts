import {FunctionImpl, GroupImpl} from "@confect/server";
import api from "../_generated/api";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import {ForbiddenError, NotFoundError} from "../domain/errors";


const badDeleteNote = FunctionImpl.make(api, 'test', 'badDeleteNote', ({ type}) =>
    Effect.gen(function* () {
        if(type === 'found'){
            return yield* Effect.fail(new NotFoundError({ message: 'Note not found' }))
        }else {
            return yield* Effect.fail(new ForbiddenError({ message: 'Forbidden' }))
        }
    }).pipe(Effect.orDie)
)

export const test = GroupImpl.make(api, 'test').pipe(
    Layer.provide(badDeleteNote),
)