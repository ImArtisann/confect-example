'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"

export default function SignInPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError("")
        const { error } = await authClient.signIn.email({ email, password })
        if (error) {
            setError(error.message ?? "Failed to sign in")
            setLoading(false)
        } else {
            router.push("/auth")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50">
            <div className="w-full max-w-sm bg-white rounded-xl border border-zinc-200 shadow-sm p-8">
                <h1 className="text-2xl font-semibold text-zinc-900 mb-6">Sign in</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border border-zinc-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border border-zinc-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                            placeholder="••••••••"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-zinc-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-700 disabled:opacity-50 transition-colors"
                    >
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-zinc-500 text-center">
                    {"Don't have an account? "}
                    <Link href="/sign-up" className="text-zinc-900 font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
