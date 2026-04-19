'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export function LoginForm({ buttonClassName }: { buttonClassName: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await login(email, password)
    router.push('/')
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <input
        className="h-12 rounded-full border border-black/10 bg-white/80 px-4 text-sm text-neutral-950 shadow-inner backdrop-blur-sm placeholder:text-neutral-500"
        placeholder="Email address"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="h-12 rounded-full border border-black/10 bg-white/80 px-4 text-sm text-neutral-950 shadow-inner backdrop-blur-sm placeholder:text-neutral-500"
        placeholder="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading} className={buttonClassName}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}

export function RegisterForm({ buttonClassName }: { buttonClassName: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading } = useAuth()
  const router = useRouter()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await signup(name, email, password)
    router.push('/')
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <input
        className="h-12 rounded-full border border-black/10 bg-white/80 px-4 text-sm text-neutral-950 shadow-inner backdrop-blur-sm placeholder:text-neutral-500"
        placeholder="Full name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="h-12 rounded-full border border-black/10 bg-white/80 px-4 text-sm text-neutral-950 shadow-inner backdrop-blur-sm placeholder:text-neutral-500"
        placeholder="Email address"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="h-12 rounded-full border border-black/10 bg-white/80 px-4 text-sm text-neutral-950 shadow-inner backdrop-blur-sm placeholder:text-neutral-500"
        placeholder="Password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading} className={buttonClassName}>
        {isLoading ? 'Creating…' : 'Create account'}
      </button>
    </form>
  )
}
