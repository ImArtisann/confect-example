import {FunctionSpec, GenericId, GroupSpec} from "@confect/core";
import * as Schema from "effect/Schema";
import {ForbiddenError, NotFoundError, UnauthorizedError} from "../../domain/errors";

export const mutations = GroupSpec.make('mutations').addFunction(
    FunctionSpec.publicMutation({
        name: 'create',
        args: Schema.Struct({
            text: Schema.String.pipe(Schema.maxLength(100)),
            tag: Schema.optional(Schema.String),
        }),
        returns: Schema.Null,
        error: Schema.Union(UnauthorizedError, NotFoundError),
    })
).addFunction(
    FunctionSpec.publicMutation({
        name: 'deleteNote',
        args: Schema.Struct({
            noteId: GenericId.GenericId('notes'),
        }),
        returns: Schema.Null,
        error: Schema.Union(UnauthorizedError, NotFoundError, ForbiddenError),
    })
).addFunction(
    FunctionSpec.publicMutation({
        name: 'badDeleteNote',
        args: Schema.Struct({
            type: Schema.Literal('found', 'forbidden'),
        }),
        returns: Schema.Null,
        error: Schema.Union(NotFoundError, ForbiddenError),
    })
)