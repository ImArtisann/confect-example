import { HttpApiBuilder } from '@effect/platform';
import {Api} from "./api";
import * as Layer from 'effect/Layer'
import {HealthHandlerLive} from "./handlers/health.handler";

export const ConvexApi = HttpApiBuilder.api(Api).pipe(
    Layer.provide(HealthHandlerLive)
)