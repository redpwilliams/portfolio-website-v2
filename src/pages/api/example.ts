import { kv } from '@vercel/kv'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const data = await kv.hgetall('spotify')
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
}
