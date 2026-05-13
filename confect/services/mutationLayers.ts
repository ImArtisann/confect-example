import * as Layer from 'effect/Layer'
import {NoteMutations} from "./mutations/NoteMutations";
import {UserMutations} from "./mutations/UserMutations";

export const MutationLayers = Layer.mergeAll(
    NoteMutations.Default,
    UserMutations.Default,
)