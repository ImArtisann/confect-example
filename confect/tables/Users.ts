import { Table } from "@confect/server";
import * as Schema from 'effect/Schema'

export const Users = Table.make(
    'users',
    Schema.Struct({
        userId: Schema.String,
        name: Schema.String,
        email: Schema.String,
        image: Schema.optional(Schema.NullOr(Schema.String)),
        role: Schema.Literal('admin', 'user'),
        createdAt: Schema.Number,
        updatedAt: Schema.Number,
    })
).index('by_user', ['userId'])