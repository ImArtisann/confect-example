import {FunctionSpec, GroupSpec} from "@confect/core";
import * as Schema from "effect/Schema";
import {ForbiddenError, NotFoundError} from "../domain/errors";

export const test = GroupSpec.make('test').addFunction(
    FunctionSpec.publicMutation({
        name: 'badDeleteNote',
        args: Schema.Struct({
            type: Schema.Literal('found', 'forbidden'),
        }),
        returns: Schema.Null,
        error: Schema.Union(NotFoundError, ForbiddenError),
    })
)