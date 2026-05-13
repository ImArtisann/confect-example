import {queries} from "./users/queries";
import {mutations} from "./users/mutations";
import * as Layer from 'effect/Layer'
import {GroupImpl} from "@confect/server";
import api from "../_generated/api";

export const users = GroupImpl.make(api, 'users').pipe(
    Layer.provide(queries),
    Layer.provide(mutations),
)