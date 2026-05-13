import { DatabaseSchema } from '@confect/server';
import {Notes} from "./tables/Notes";
import {Users} from "./tables/Users";

export default DatabaseSchema.make().addTable(Notes).addTable(Users)