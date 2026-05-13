import * as Effect from 'effect/Effect'
import {DatabaseReader} from "../../_generated/services";
import {Id} from "../../../convex/_generated/dataModel";
import {NotFoundError} from "../../domain/errors";


//Note in effect v4 Effect.Service goes away new way of defining services
//Read more here: https://github.com/Effect-TS/effect-smol/blob/main/migration/services.md
export class NoteQueries extends Effect.Service<NoteQueries>()('services/queries/NoteQueries',{
    effect: Effect.gen(function* () {
        const reader = yield* DatabaseReader

        const getNote = Effect.fn('NoteQueries/getNote')(function* (payload: {
            noteId: Id<'notes'>
        }) {
            const { noteId } = payload

            return yield* reader.table('notes').get(noteId).pipe(
                Effect.mapError(() => new NotFoundError({ message: 'Note not found' }))
            )
        })

        const listAll = Effect.fn('NoteQueries/listAll')(function* () {

            return yield* reader.table('notes').index('by_creation_time', 'desc').collect()
        })

        const getUsers = Effect.fn('NoteQueries/getUsers')(function* (payload: {
            userId: string
        }) {
            const { userId } = payload

            return yield* reader.table('notes').index('by_user', (q) => q.eq('userId',userId)).collect()
        })

        return { getNote, listAll, getUsers }
    })
}){}