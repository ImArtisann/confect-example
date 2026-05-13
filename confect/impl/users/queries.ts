import {FunctionImpl, GroupImpl} from "@confect/server";
import api from "../../_generated/api";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

const get = FunctionImpl.make(api, 'users.queries', 'get', () =>
    Effect.gen(function* () {

        return null
    }).pipe(Effect.orDie)
)

export const queries = GroupImpl.make(api, 'users.queries').pipe(
    Layer.provide(get),
)