'use client'

import { QueryResult, useQuery } from "@confect/react"
import refs from "@/confect-api/_generated/refs"
import Link from "next/link"
import {useNotes} from "@/hooks/use-notes";

export default function Home() {
    const notes = useQuery(refs.public.notes.queries.list, {})

    const {  deleteNote } = useNotes()

    return (
        <div className="min-h-screen bg-zinc-50">
            <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-zinc-900">Notes</h1>
                <Link
                    href="/sign-in"
                    className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
                >
                    Sign in
                </Link>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-8">
                {QueryResult.match(notes, {
                    onLoading: () => (
                        <div className="text-sm text-zinc-400 py-12 text-center">Loading…</div>
                    ),
                    onSuccess: (notes) => notes.length === 0 ? (
                        <div className="text-sm text-zinc-400 py-12 text-center">No notes yet.</div>
                    ) : (
                        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-zinc-200 bg-zinc-50">
                                        <th className="px-4 py-3 text-left font-medium text-zinc-500">Note</th>
                                        <th className="px-4 py-3 text-left font-medium text-zinc-500">Tag</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notes.map((note, i) => (
                                        <tr
                                            key={note.noteId}
                                            className={`border-b border-zinc-100 last:border-0 ${i % 2 === 0 ? "" : "bg-zinc-50/50"}`}
                                        >
                                            <td className="px-4 py-3 text-zinc-900">{note.text}</td>
                                            <td className="px-4 py-3 text-zinc-500">{note.tag ?? "—"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ),
                })}
            </main>
        </div>
    )
}
