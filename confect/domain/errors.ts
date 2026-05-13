import * as Schema from "effect/Schema";

export class UnauthorizedError extends Schema.TaggedError<UnauthorizedError>()('UnauthorizedError',{
    message: Schema.String
}) {}
export class NotFoundError extends Schema.TaggedError<NotFoundError>()('NotFoundError',{
    message: Schema.String
}) {}
export class ForbiddenError extends Schema.TaggedError<ForbiddenError>()('ForbiddenError',{
    message: Schema.String
}) {}
