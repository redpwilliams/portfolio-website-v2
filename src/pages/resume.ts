import type { APIRoute } from 'astro'
import { readFileSync } from 'fs'
import path from 'path'

export const GET: APIRoute = async () => {
  const pdf = readFileSync(path.resolve('./public/resume.pdf'))
  return new Response(pdf, {
    headers: { 'Content-Type': 'application/pdf' }
  })
}
