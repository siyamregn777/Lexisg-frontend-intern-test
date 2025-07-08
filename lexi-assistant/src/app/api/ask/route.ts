import { sampleQuery, sampleResponse } from '@/lib/data'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { query } = await req.json()

  const normalize = (str: string) =>
    str.toLowerCase().replace(/\s+/g, ' ').trim()

  if (normalize(query) === normalize(sampleQuery)) {
    return NextResponse.json(sampleResponse)
  }

  return NextResponse.json({
    answer: "Sorry, I couldn't find a matching precedent.",
    citation: null,
  })
}
