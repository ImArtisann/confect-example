import * as Effect from 'effect/Effect'
import {DatabaseWriter} from "../../_generated/services";
import {UserQueries} from "../queries/UserQueries";
import {NotFoundError} from "../../domain/errors";


//Note in effect v4 Effect.Service goes away new way of defining services
//Read more here: https://github.com/Effect-TS/effect-smol/blob/main/migration/services.md
export class UserMutations extends Effect.Service<UserMutations>()('services/mutations/UserMutations',{
    dependencies: [UserQueries.Default],
    effect: Effect.gen(function* () {
        const writer = yield* DatabaseWriter
        const users = yield* UserQueries

        const createUser = Effect.fn('UserMutations/createUser')(function* (payload: {
            user: {
                userId: string,
                name: string,
                email: string,
                image?: string | null,
                createdAt: number,
            }
        }) {
            const { user } = payload

            return yield* writer.table('users').insert({
                ...user,
                role: 'user',
                updatedAt: Date.now(),
            })
        })

        const updateUser = Effect.fn('UserMutations/updateUser')(function* (payload: {
            userId: string,
            user: {
                name: string,
                email: string,
                image?: string | null,
                updatedAt: number,
            }
        }) {
            const { userId, user } = payload

            const userResult = yield* users.getUser({ userId })
            if(!userResult){
                return yield* new NotFoundError({ message: 'User not found'})
            }

            return yield* writer.table('users').patch(userResult._id, {
                ...user,
            })
        })

        const deleteUser = Effect.fn('UserMutations/deleteUser')(function* (payload: {
            userId: string
        }) {
            const { userId } = payload

            const userResult = yield* users.getUser({ userId })
            if(!userResult){
                return yield* new NotFoundError({ message: 'User not found'})
            }

            return yield* writer.table('users').delete(userResult._id)
        })

        return { createUser, updateUser, deleteUser }
    })
}){}