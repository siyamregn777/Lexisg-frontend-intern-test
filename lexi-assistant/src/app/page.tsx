'use client'

import { useState } from 'react'

type Message = {
  role: 'user' | 'assistant'
  text: string
  citation?: {
    text: string
    pdfUrl: string
    paragraph?: string
  }
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handleAsk = async () => {
    if (!query.trim()) return
    setLoading(true)

    setMessages((prev) => [...prev, { role: 'user', text: query }])

    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })

    const data = await res.json()

    const assistantMessage: Message = {
      role: 'assistant',
      text: data.answer,
    }

    if (data.citation) {
      assistantMessage.citation = {
        text: data.citation.text,
        pdfUrl: data.citation.pdfUrl,
        paragraph: data.citation.paragraph,
      }
    }

    setMessages((prev) => [...prev, assistantMessage])
    setQuery('')
    setLoading(false)
  }

  return (
    <main className="flex flex-col h-screen">
      <header className="p-4 bg-gray-800 text-white text-center text-lg font-semibold">
        Lexi Legal Assistant
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-gray-100">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-2xl mx-auto p-4 rounded-lg whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-blue-100 self-end'
                : 'bg-white border text-gray-800'
            }`}
          >
            {msg.text}
            {msg.role === 'assistant' && msg.citation && (
              <div className="mt-4 border-t pt-2 text-sm text-gray-600">
                <p className="italic">{msg.citation.text}</p>
                <a
                  href={msg.citation.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-1 inline-block"
                >
                  📄 Download Judgment PDF
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-white flex items-center gap-2">
        <textarea
          className="flex-1 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
          placeholder="Ask a legal question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleAsk()
            }
          }}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </main>
  )
}
