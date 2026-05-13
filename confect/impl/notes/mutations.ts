import {FunctionImpl, GroupImpl} from "@confect/server";
import api from "../../_generated/api";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import {MutationLayers} from "../../services/mutationLayers";
import {NoteMutations} from "../../services/mutations/NoteMutations";
import {getAuth} from "../../utils/auth";
import {ForbiddenError, NotFoundError, UnauthorizedError} from "../../domain/errors";

const create = FunctionImpl.make(api, 'notes.mutations', 'create', ({ text, tag }) =>
    Effect.gen(function* () {
        const notes = yield* NoteMutations
        const auth = yield* getAuth()

        if(!auth){
            return yield* Effect.fail(new UnauthorizedError({ message: 'Unauthorized' }))
        }

        return yield* notes.createNote({ userId: auth.subject, text, tag }).pipe(Effect.as(null))
    }).pipe(Effect.provide(MutationLayers),Effect.orDie)
)

const deleteNote = FunctionImpl.make(api, 'notes.mutations', 'deleteNote', ({ noteId }) =>
    Effect.gen(function* () {
        const notes = yield* NoteMutations
        const auth = yield* getAuth()

        if(!auth){
            return yield* Effect.fail(new UnauthorizedError({ message: 'Unauthorized' }))
        }

        return yield* notes.deleteNote({ noteId, userId: auth.subject }).pipe(Effect.as(null))
    }).pipe(Effect.provide(MutationLayers),Effect.orDie)
)

const badDeleteNote = FunctionImpl.make(api, 'notes.mutations', 'badDeleteNote', ({ type}) =>
    Effect.gen(function* () {
        if(type === 'found'){
            return yield* Effect.fail(new NotFoundError({ message: 'Note not found' }))
        }else {
            return yield* Effect.fail(new ForbiddenError({ message: 'Forbidden' }))
        }
    }).pipe(Effect.orDie)
)

export const mutations = GroupImpl.make(api, 'notes.mutations').pipe(
    Layer.provide(create),
    Layer.provide(deleteNote),
    Layer.provide(badDeleteNote),
)