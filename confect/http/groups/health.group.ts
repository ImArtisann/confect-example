import { HttpApiEndpoint, HttpApiGroup } from '@effect/platform';
import * as Schema from 'effect/Schema'

export class HealthGroup extends HttpApiGroup.make('health').add(
    HttpApiEndpoint.get('status', '/status').addSuccess(
        Schema.Struct({ ok: Schema.Boolean })
    )
){}