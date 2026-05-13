import {GroupSpec} from "@confect/core";
import {queries} from "./notes/queries";
import {mutations} from "./notes/mutations";

export const notes = GroupSpec.make('notes').addGroup(queries).addGroup(mutations)