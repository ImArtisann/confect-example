import {FunctionImpl, GroupImpl} from "@confect/server";
import api from "../../_generated/api";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import {QueryLayers} from "../../services/queryLayers";
import {NoteQueries} from "../../services/queries/NoteQueries";
import {getAuth} from "../../utils/auth";
import {UnauthorizedError} from "../../domain/errors";


const list = FunctionImpl.make(api, 'notes.queries', 'list', () =>
    Effect.gen(function* () {
        const notes = yield* NoteQueries


        return yield* notes.listAll().pipe(
            Effect.map(notes =>
                notes.map(n => ({
                    noteId: n._id,
                    text: n.text,
                    tag: n.tag,
                }))
            )
        )
    }).pipe(Effect.provide(QueryLayers),Effect.orDie)
)

const users = FunctionImpl.make(api, 'notes.queries', 'users', () =>
    Effect.gen(function* () {
        const notes = yield* NoteQueries
        const auth = yield* getAuth()

        if(!auth){
            return yield* Effect.fail(new UnauthorizedError({ message: 'Unauthorized' }))
        }

        return yield* notes.getUsers({userId: auth.subject}).pipe(
            Effect.map(notes =>
                notes.map(n => ({
                    noteId: n._id,
                    text: n.text,
                    tag: n.tag,
                }))
            )
        )
    }).pipe(Effect.provide(QueryLayers),Effect.orDie)
)

const searchUsers = FunctionImpl.make(api, 'notes.queries', 'searchUsers', ({ userId }) =>
    Effect.gen(function* () {
        const notes = yield* NoteQueries
        const auth = yield* getAuth()

        if(!auth){
            return yield* Effect.fail(new UnauthorizedError({ message: 'Unauthorized' }))
        }

        return yield* notes.getUsers({userId}).pipe(
            Effect.map(notes =>
                notes.map(n => ({
                    noteId: n._id,
                    text: n.text,
                    tag: n.tag,
                }))
            )
        )
    }).pipe(Effect.provide(QueryLayers),Effect.orDie)
)

export const queries = GroupImpl.make(api, 'notes.queries').pipe(
    Layer.provide(list),
    Layer.provide(users),
    Layer.provide(searchUsers),
)