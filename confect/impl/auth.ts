import { FunctionImpl, GroupImpl } from '@confect/server';
import * as Layer from 'effect/Layer';
import api from '../_generated/api';
import {
    getAuthUser as convexGetAuthUser,
    onCreate as convexOnCreate,
    onDelete as convexOnDelete,
    onUpdate as convexOnUpdate,
} from '../betterAuth';

const onCreate = FunctionImpl.make(api, 'auth', 'onCreate', convexOnCreate);
const onUpdate = FunctionImpl.make(api, 'auth', 'onUpdate', convexOnUpdate);
const onDelete = FunctionImpl.make(api, 'auth', 'onDelete', convexOnDelete);
const getAuthUser = FunctionImpl.make(api, 'auth', 'getAuthUser', convexGetAuthUser);

export const auth = GroupImpl.make(api, 'auth').pipe(
    Layer.provide(onCreate),
    Layer.provide(onUpdate),
    Layer.provide(onDelete),
    Layer.provide(getAuthUser)
);
