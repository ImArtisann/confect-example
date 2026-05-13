import {FunctionImpl, GroupImpl} from "@confect/server";
import api from "../../_generated/api";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import {updatePassword as updateUserPassword} from "../../spec/users/convex";
import {MutationLayers} from "../../services/mutationLayers";
import {UserMutations} from "../../services/mutations/UserMutations";


const create = FunctionImpl.make(api, 'users.mutations', 'create', ({ user }) =>
    Effect.gen(function* () {
        const users = yield* UserMutations

        return yield* users.createUser({ user }).pipe(Effect.as(null))
    }).pipe(Effect.provide(MutationLayers),Effect.orDie)
)

const update = FunctionImpl.make(api, 'users.mutations', 'update', ({ userId, user }) =>
    Effect.gen(function* () {
        const users = yield* UserMutations

        return yield* users.updateUser({ userId, user }).pipe(Effect.as(null))
    }).pipe(Effect.provide(MutationLayers),Effect.orDie)
)

export const deleteUser = FunctionImpl.make(api, 'users.mutations', 'deleteUser', ({ userId }) =>
    Effect.gen(function* () {
        const users = yield* UserMutations

        return yield* users.deleteUser({ userId }).pipe(Effect.as(null))
    }).pipe(Effect.provide(MutationLayers),Effect.orDie)
)

export const updatePassword = FunctionImpl.make(api, 'users.mutations', 'updatePassword', updateUserPassword)

export const mutations = GroupImpl.make(api, 'users.mutations').pipe(
    Layer.provide(create),
    Layer.provide(update),
    Layer.provide(deleteUser),
    Layer.provide(updatePassword),
)