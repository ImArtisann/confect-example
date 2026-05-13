import {FunctionSpec, GenericId, GroupSpec} from "@confect/core";
import * as Schema from "effect/Schema";
import {UnauthorizedError} from "../../domain/errors";

export const queries = GroupSpec.make("queries").addFunction(
    FunctionSpec.publicQuery({
        name: 'list',
        args: Schema.Struct({}),
        returns: Schema.Array(Schema.Struct({
            noteId: GenericId.GenericId('notes'),
            text: Schema.String,
            tag: Schema.optional(Schema.String),
        })),
    })
).addFunction(
    FunctionSpec.publicQuery({
        name: 'users',
        args: Schema.Struct({}),
        returns: Schema.Array(Schema.Struct({
            noteId: GenericId.GenericId('notes'),
            text: Schema.String,
            tag: Schema.optional(Schema.String),
        })),
        error: UnauthorizedError
    })
).addFunction(
    FunctionSpec.publicQuery({
        name: 'searchUsers',
        args: Schema.Struct({
            userId: Schema.String
        }),
        returns: Schema.Array(Schema.Struct({
            noteId: GenericId.GenericId('notes'),
            text: Schema.String,
            tag: Schema.optional(Schema.String),
        })),
        error: UnauthorizedError
    })
);