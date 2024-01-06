import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import Head from 'next/head'
import type { AppRouter } from './api/trpc/[trpc]'
import useSWR from 'swr'

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ]
})

export default function Home() {
  const { data } = useSWR('greeting', () => trpc.greeting.query({ name: 'name' }))

  return (
    <main className="container mx-auto p-4">
      <Head>
        <title>Next.js + tRPC Minimal Setup</title>
      </Head>
      <h1 className="mt-4 mb-4 text-2xl">Next.js + tRPC Minimal Setup</h1>
      {!data ? <p className="mb-4">Loading...</p> : (<dl className="mb-4">
        <dt className="font-bold">Result</dt>
        <dd className="mb-2">{data.text}</dd>
      </dl>)}
    </main>
  )
}
