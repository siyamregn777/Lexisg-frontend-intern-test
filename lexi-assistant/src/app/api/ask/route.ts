// app/api/ask/route.ts
import { sampleQuery, sampleResponse } from '@/lib/data'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { query } = await req.json()

  const normalize = (str: string) =>
    str
    .replace(/\*\*(.*?)\*\*/g, '$1') // remove bold
    .replace(/_(.*?)_/g, '$1')       // remove italics
    .replace(/#+\s?/g, '')           // remove headings
    .replace(/>`(.*?)`/g, '$1')      // remove inline code
    .replace(/>\s?(.*)/g, '$1')      // remove blockquote arrow
    .replace(/---/g, '')   

  if (normalize(query) === normalize(sampleQuery)) {
    return NextResponse.json(sampleResponse)
  }

  return NextResponse.json({
    answer: "Sorry, I couldn't find a matching Answer. Please , feel free to ask the customer support team. use siyamregnyeshidagna777@gmail.com",
    citation: null,
  })
}
