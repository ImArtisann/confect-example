import {FunctionSpec, GroupSpec} from "@confect/core";
import * as Schema from "effect/Schema";
import {NotFoundError, UnauthorizedError} from "../../domain/errors";

export const queries = GroupSpec.make('queries').addFunction(
    FunctionSpec.publicQuery({
        name: 'get',
        args: Schema.Struct({}),
        returns: Schema.Null,
        error: Schema.Union(UnauthorizedError, NotFoundError),
    })
)