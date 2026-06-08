"use server"

import { getToken } from "@/lib/auth-server";


export async function fetchAuthToken() {
    return getToken();
}
