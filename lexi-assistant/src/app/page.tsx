'use client'

import { useState, useRef, useEffect } from 'react'
import { ModeToggle } from '@/components/ModeToggle'

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
  const bottomRef = useRef<HTMLDivElement>(null)

  const handleAsk = async () => {
    if (!query.trim()) return
    setLoading(true)

    setMessages((prev) => [...prev, { role: 'user', text: query }])

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })

      const data = await res.json()

      const assistantMessage: Message = {
        role: 'assistant',
        text: data.answer,
        citation: data.citation ? {
          text: data.citation.text,
          pdfUrl: data.citation.pdfUrl,
          paragraph: data.citation.paragraph
        } : undefined
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        text: "Sorry, I couldn't process your request. Please try again." 
      }])
    } finally {
      setQuery('')
      setLoading(false)
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="p-4 bg-gray-800 dark:bg-gray-900 text-white flex justify-between items-center">
        <span className="text-lg font-semibold">Lexi Legal Assistant</span>
        <ModeToggle />
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-4 whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-blue-100 dark:bg-blue-900 ml-auto'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
            }`}
            style={{ 
              maxWidth: 'min(100%, 800px)',
              marginLeft: msg.role === 'assistant' ? '0' : 'auto'
            }}
          >
            <p className={msg.role === 'user' ? 'text-blue-900' : 'text-gray-800 dark:text-gray-200'}>
              {msg.text}
            </p>
            {msg.citation && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  {msg.citation.text}
                </p>
                <a
                  href={msg.citation.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  📄 View Source Document
                </a>
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleAsk()
              }
            }}
            placeholder="Ask a legal question..."
            rows={2}
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
            disabled={loading}
          />
          <button
            onClick={handleAsk}
            disabled={loading || !query.trim()}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}