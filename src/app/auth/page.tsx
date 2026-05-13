'use client'

import NotesClient from "@/app/auth/notes-client";

import {
    Authenticated,
    AuthLoading,
} from "convex/react";


export default function Page() {

    return <>
        <AuthLoading>
            <div className="min-h-screen flex items-center justify-center text-sm text-zinc-400">
                Loading…
            </div>)
        </AuthLoading>
        <Authenticated><NotesClient /></Authenticated>
    </>
}
