import { HttpApi } from '@effect/platform';
import {HealthGroup} from "./groups/health.group";

export class Api extends HttpApi.make('Api').add(HealthGroup).prefix('/api') {}