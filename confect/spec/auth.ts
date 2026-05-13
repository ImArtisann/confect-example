import { FunctionSpec, GroupSpec } from '@confect/core';
import type { getAuthUser, onCreate, onDelete, onUpdate } from '../betterAuth';

export const auth = GroupSpec.make('auth')
    .addFunction(FunctionSpec.convexInternalMutation<typeof onCreate>()('onCreate'))
    .addFunction(FunctionSpec.convexInternalMutation<typeof onUpdate>()('onUpdate'))
    .addFunction(FunctionSpec.convexInternalMutation<typeof onDelete>()('onDelete'))
    .addFunction(FunctionSpec.convexPublicQuery<typeof getAuthUser>()('getAuthUser'));
