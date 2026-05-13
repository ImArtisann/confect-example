import {FunctionSpec, GroupSpec} from "@confect/core";
import * as Schema from "effect/Schema";
import {NotFoundError, UnauthorizedError} from "../../domain/errors";
import type {updatePassword} from "./convex";

export const mutations = GroupSpec.make('mutations').addFunction(
    FunctionSpec.internalMutation({
        name: 'create',
        args: Schema.Struct({
            user: Schema.Struct({
                userId: Schema.String,
                name: Schema.String,
                email: Schema.String,
                image: Schema.optional(Schema.NullOr(Schema.String)),
                createdAt: Schema.Number,
            })
        }),
        returns: Schema.Null,
    })
).addFunction(
    FunctionSpec.internalMutation({
        name: 'update',
        args: Schema.Struct({
            userId: Schema.String,
            user: Schema.Struct({
                name: Schema.String,
                email: Schema.String,
                image: Schema.optional(Schema.NullOr(Schema.String)),
                updatedAt: Schema.Number,
            })
        }),
        returns: Schema.Null,
        error: NotFoundError
    })
).addFunction(
    FunctionSpec.internalMutation({
        name: 'deleteUser',
        args: Schema.Struct({
            userId: Schema.String
        }),
        returns: Schema.Null,
        error: NotFoundError,
    })
).addFunction(
    FunctionSpec.convexPublicMutation<typeof updatePassword>()('updatePassword')
)