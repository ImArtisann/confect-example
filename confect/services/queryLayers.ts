import * as Layer from 'effect/Layer'
import {NoteQueries} from "./queries/NoteQueries";
import {UserQueries} from "./queries/UserQueries";

export const QueryLayers = Layer.mergeAll(
    NoteQueries.Default,
    UserQueries.Default,
)