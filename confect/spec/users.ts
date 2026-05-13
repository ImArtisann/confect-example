import {GroupSpec} from "@confect/core";
import {queries} from "./users/queries";
import {mutations} from "./users/mutations";

export const users = GroupSpec.make('users').addGroup(queries).addGroup(mutations)