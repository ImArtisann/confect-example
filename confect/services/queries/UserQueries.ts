import * as Effect from 'effect/Effect'
import * as Option from 'effect/Option'
import {DatabaseReader} from "../../_generated/services";


//Note in effect v4 Effect.Service goes away new way of defining services
//Read more here: https://github.com/Effect-TS/effect-smol/blob/main/migration/services.md
export class UserQueries extends Effect.Service<UserQueries>()('services/queries/UserQueries',{
    effect: Effect.gen(function* () {
        const reader = yield* DatabaseReader

        const getUser = Effect.fn('UserQueries/getUser')(function* (payload: {
            userId: string
        }) {
            const { userId } = payload
            return yield* reader.table('users').index('by_user', (q) => q.eq('userId', userId)).first().pipe(
                Effect.flatMap(
                    Option.match({
                        onNone: () => Effect.succeed(null),
                        onSome: Effect.succeed
                    })
                )
            )
        })

        return { getUser }
    })
}){}