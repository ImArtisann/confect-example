import {useMutation} from "@confect/react";
import * as Either from "effect/Either";
import * as Match from "effect/Match";
import refs from "@/confect-api/_generated/refs";
import {withToast} from "@/hooks/with-toast";
import React from "react";

export const useNotes = () => {
    const tryBad = useMutation(refs.public.test.badDeleteNote)
    const createNote = withToast(useMutation(refs.public.notes.mutations.create), {
        onWaiting: 'Creating note…',
        onSuccess: 'Note created',
        onFailure: (error) =>
            Match.value(error).pipe(
                Match.tag('UnathorizedError', () => 'You must be signed in to create a note'),
                Match.orElse(() => 'Failed to create note'),
            ),
    })


    const deleteNote = useMutation(refs.public.notes.mutations.deleteNote)

    const badDelete = React.useCallback(async () => {
        try {
            const result = await tryBad({type: 'found'})
            Either.match(result, {
                onLeft: (error) => console.log('Console Log:' +error._tag, error),
                onRight: () => console.log("deleted"),
            });
        }catch (e){
            console.log(e)
        }
    }, [tryBad])

    return { createNote, deleteNote, badDelete }
}