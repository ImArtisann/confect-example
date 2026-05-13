import * as Effect from 'effect/Effect'
import {DatabaseWriter} from "../../_generated/services";
import {UserQueries} from "../queries/UserQueries";
import {ForbiddenError, NotFoundError} from "../../domain/errors";
import {NoteQueries} from "../queries/NoteQueries";
import {Id} from "../../../convex/_generated/dataModel";


//Note in effect v4 Effect.Service goes away new way of defining services
//Read more here: https://github.com/Effect-TS/effect-smol/blob/main/migration/services.md
export class NoteMutations extends Effect.Service<NoteMutations>()('services/mutations/NoteMutations',{
    dependencies: [UserQueries.Default, NoteQueries.Default],
    effect: Effect.gen(function* () {
        const writer = yield* DatabaseWriter
        const users = yield* UserQueries
        const notes = yield* NoteQueries

        const createNote = Effect.fn('NoteMutations/createNote')(function* (payload: {
            userId: string,
            text: string,
            tag?: string,
        }) {
            const { userId, text, tag } = payload

            const userTable = yield* users.getUser({ userId })

            if(!userTable){
                return yield* Effect.fail(new NotFoundError({ message: 'User not found '}))
            }

            return yield* writer.table('notes').insert({
                userId,
                text,
                tag,
                author: {
                    role: userTable.role,
                    name: userTable.name
                }
            })
        })

        const deleteNote = Effect.fn('NoteMutations/deleteNote')(function* (payload: {
            userId: string,
            noteId: Id<'notes'>
        }) {
            const {userId, noteId} = payload

            const noteTable = yield* notes.getNote({noteId})

            if(noteTable.userId !== userId){
                return yield* Effect.fail(new ForbiddenError({ message: 'User is not authorized to delete this note' }))
            }

            return yield* writer.table('notes').delete(noteId).pipe(
                Effect.mapError(() => new NotFoundError({ message: 'Note not found' }))
            )
        })

        return { createNote,deleteNote }
    })
}){}