import * as Schema from "effect/Schema";

export class UnauthorizedError extends Schema.TaggedError<UnauthorizedError>()('UnathorizedError',{
    message: Schema.String
}) {}
export class NotFoundError extends Schema.TaggedError<UnauthorizedError>()('NotFoundError',{
    message: Schema.String
}) {}
export class ForbiddenError extends Schema.TaggedError<UnauthorizedError>()('ForbiddenError',{
    message: Schema.String
}) {}
