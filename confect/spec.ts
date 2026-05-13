import { Spec } from '@confect/core';
import {auth} from "./spec/auth";
import {notes} from "./spec/notes";
import {users} from "./spec/users";
import {test} from "./spec/test";

export default Spec.make().add(notes).add(users).add(test).add(auth)