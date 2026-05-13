import api from "./_generated/api";
import * as Layer from 'effect/Layer'
import {auth} from "./impl/auth";
import {Impl} from "@confect/server";
import {users} from "./impl/users";
import {notes} from "./impl/notes";
import {test} from "./impl/test";

export default Impl.make(api).pipe(
    Layer.provide(auth),
    Layer.provide(users),
    Layer.provide(notes),
    Layer.provide(test),
    Impl.finalize
)