import {useMutation} from "@confect/react";
import * as Match from "effect/Match";
import refs from "@/confect-api/_generated/refs";
import {withToast} from "@/hooks/with-toast";

export const useNotes = () => {
    const tryBad = withToast(useMutation(refs.public.test.badDeleteNote), {
        onWaiting: 'Deleting note…',
        onSuccess: 'Note deleted',
        onFailure: (error) =>
            Match.value(error).pipe(
                Match.tag('NotFoundError', () => 'The note you are trying to delete does not exist'),
                Match.tag('ForbiddenError', () => 'You are not allowed to delete this note'),
                Match.orElse(() => undefined),
            ),
    })
    const createNote = withToast(useMutation(refs.public.notes.mutations.create), {
        onWaiting: 'Creating note…',
        onSuccess: 'Note created',
        onFailure: (error) =>
            Match.value(error).pipe(
                Match.tag('UnauthorizedError', () => 'You must be signed in to create a note'),
                Match.tag('NotFoundError', () => 'Account not found'),
                Match.orElse(() => undefined),
            ),
    })


    const deleteNote = withToast(useMutation(refs.public.notes.mutations.deleteNote), {
        onWaiting: 'Deleting note…',
        onSuccess: 'Note deleted',
        onFailure: (error) =>
            Match.value(error).pipe(
                Match.tag('UnauthorizedError', () => 'You must be signed in to delete a note'),
                Match.tag('ForbiddenError', () => 'You are not allowed to delete this note'),
                Match.tag('NotFoundError', () => 'The note you are trying to delete does not exist'),
                Match.orElse(() => undefined),
            ),
    })

    return { createNote, deleteNote, tryBad }
}