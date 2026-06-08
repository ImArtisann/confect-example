import { WebSocketClient } from '@confect/js';
import { Atom } from '@effect-atom/atom-react';
import * as Effect from 'effect/Effect';
import * as Schedule from 'effect/Schedule';
import * as Stream from 'effect/Stream';
import refs from "@/confect-api/_generated/refs";
import {Id} from "@/convex/_generated/dataModel";
import {fetchAuthToken} from "@/lib/auth-actions";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error('NEXT_PUBLIC_COVEX_URL environment variable is not set');
}

const retrySchedule = Schedule.exponential('200 millis').pipe(
    Schedule.jittered,
    Schedule.intersect(Schedule.recurs(3))
);

const WebSocketClientLive = WebSocketClient.layer(convexUrl);

const runtimeAtom = Atom.runtime(WebSocketClientLive);

export const getNotesList = runtimeAtom.atom(
    () => Stream.unwrap(
        Effect.gen(function* () {
            const client = yield* WebSocketClient.WebSocketClient;
            const query = client.reactiveQuery(refs.public.notes.queries.list, {})

            return query.pipe(
                Stream.catchTag('WebSocketClientError', () => Stream.retry(query, retrySchedule)),
                Stream.catchTag('ParseError', () => Stream.succeed([]))
            )
        })
    )
).pipe(
    Atom.withReactivity(['notes']),
)

export const getUserNotes = runtimeAtom.atom(
    () => Stream.unwrap(
        Effect.gen(function* () {
            const client = yield* WebSocketClient.WebSocketClient;

            yield* client.setAuth(
                () => Effect.promise(() => fetchAuthToken())
            )

            const query = client.reactiveQuery(refs.public.notes.queries.users, {})

            return query.pipe(
                Stream.catchTag('WebSocketClientError', () => Stream.retry(query, retrySchedule)),
                Stream.catchTag('ParseError', () => Stream.succeed([]))
            )
        })
    )
).pipe(Atom.withReactivity(['notes']))

export const deleteNoteAtom = runtimeAtom.fn(
    Effect.fn(function* (noteId: Id<'notes'>) {
        const client = yield* WebSocketClient.WebSocketClient;

        yield* client.setAuth(
            () => Effect.promise(() => fetchAuthToken())
        )

        return yield* client.mutation(refs.public.notes.mutations.deleteNote, { noteId })
    }),
    { reactivityKeys: ['notes']}
)

export const createNoteAtom = runtimeAtom.fn(
    Effect.fn(function* (payload: { text: string, tag?: string}){
        const client = yield* WebSocketClient.WebSocketClient;

        yield* client.setAuth(
            () => Effect.promise(() => fetchAuthToken())
        )

        return yield* client.mutation(refs.public.notes.mutations.create, payload)
    }),
    { reactivityKeys: ['notes']}
)