import {isAuthenticated} from "@/lib/auth-server";
import {redirect} from "next/navigation";
import NotesClient from "@/app/auth/notes-client";


export default async function Page() {
    if (!(await isAuthenticated())) {
        redirect("/sign-in");
    }

    return <NotesClient />
}
