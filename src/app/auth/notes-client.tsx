'use client'


import {useRouter} from "next/navigation";
import {QueryResult, useMutation, useQuery} from "@confect/react";
import refs from "@/confect-api/_generated/refs";
import {useState} from "react";
import {authClient} from "@/lib/auth-client";
import {useNotes} from "@/hooks/use-notes";
import {Id} from "@/convex/_generated/dataModel";
import {
    Authenticated,
    AuthLoading,
} from "convex/react";


export default function NotesClient() {
    const router = useRouter()
    const notesQuery = useQuery(refs.public.notes.queries.users, {})
    const [newText, setNewText] = useState("")
    const [newTag, setNewTag] = useState("")
    const [showCreate, setShowCreate] = useState(false)

    const { createNote, deleteNote, tryBad } = useNotes()

    const notes = QueryResult.match(notesQuery, {
        onLoading: () => null,
        onSuccess: (allNotes) => allNotes,
        onFailure: () => {
            router.replace('/sign-in')
            return null
        }
    })


    async function handleCreate(e: React.FormEvent) {
        e.preventDefault()
        await createNote({ text: newText, tag: newTag || undefined })
        setNewText("")
        setNewTag("")
        setShowCreate(false)
    }

    async function handleSignOut() {
        await authClient.signOut()
        router.replace("/sign-in")
    }

    if(!notes){
        return(
        <div className="min-h-screen flex items-center justify-center text-sm text-zinc-400">
            Loading…
        </div>)
    }


        return (
            <div className="min-h-screen bg-zinc-50">
                <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-zinc-900">My Notes</h1>
                    <button
                        onClick={async () => await tryBad({ type: 'found'})}
                        className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                        Bad Delete
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                        Sign out
                    </button>
                </header>

                <main className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowCreate((v) => !v)}
                            className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 transition-colors"
                        >
                            {showCreate ? "Cancel" : "Create note"}
                        </button>
                    </div>

                    {showCreate && (
                        <form
                            onSubmit={handleCreate}
                            className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col gap-3"
                        >
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                                    Note
                                </label>
                                <input
                                    type="text"
                                    value={newText}
                                    onChange={(e) => setNewText(e.target.value)}
                                    required
                                    maxLength={100}
                                    placeholder="Write something…"
                                    className="border border-zinc-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                                    Tag (optional)
                                </label>
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="e.g. work, personal"
                                    className="border border-zinc-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 disabled:opacity-50 transition-colors"
                                >
                                    Save note
                                </button>
                            </div>
                        </form>
                    )}


                        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-zinc-200 bg-zinc-50">
                                    <th className="px-4 py-3 text-left font-medium text-zinc-500">
                                        Note
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium text-zinc-500">
                                        Tag
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium text-zinc-500">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {notes.map((note, i) => (
                                    <tr
                                        key={note.noteId}
                                        className={`border-b border-zinc-100 last:border-0 ${i % 2 === 0 ? "" : "bg-zinc-50/50"}`}
                                    >
                                        <td className="px-4 py-3 text-zinc-900">{note.text}</td>
                                        <td className="px-4 py-3 text-zinc-500">
                                            {note.tag ?? "—"}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={async () => await deleteNote({noteId: note.noteId})}
                                                className="text-sm text-red-500 hover:text-red-700 disabled:opacity-40 transition-colors"
                                            >
                                               Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                </main>
            </div>
        )
}