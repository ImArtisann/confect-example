import { Table } from "@confect/server";
import * as Schema from 'effect/Schema'

export const Notes = Table.make(
    "notes",
    Schema.Struct({
        userId: Schema.String,
        text: Schema.String.pipe(Schema.maxLength(100)),
        tag: Schema.optional(Schema.String),
        author: Schema.Struct({
            role: Schema.Literal("admin", "user"),
            name: Schema.String,
        }),
    }),
)
    .index('by_user', ['userId'])
    .index("by_text", ["text"])
    .index("by_role", ["author.role"])
    .searchIndex("text", {
        searchField: "text",
        filterFields: ["tag"],
    })
