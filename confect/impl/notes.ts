import api from "../_generated/api";
import {GroupImpl} from "@confect/server";
import * as Layer from "effect/Layer";
import {queries} from "./notes/queries";
import {mutations} from "./notes/mutations";


export const notes = GroupImpl.make(api, 'notes').pipe(
    Layer.provide(queries),
    Layer.provide(mutations),
)