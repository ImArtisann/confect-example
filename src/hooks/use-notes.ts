'use client'

import {useAtomSet} from "@effect-atom/atom-react";
import {createNoteAtom, deleteNoteAtom} from "@/lib/atom-test";

export const useNotes = () => {

    const createNote = useAtomSet(createNoteAtom, { mode: 'promiseExit'})


    const deleteNote = useAtomSet(deleteNoteAtom, { mode: 'promiseExit'})

    return { createNote, deleteNote }
}