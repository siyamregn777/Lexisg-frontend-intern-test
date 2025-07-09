'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, Wrench, Mic, ArrowUp } from 'lucide-react'
import Header from '@/components/Header'
import ReactMarkdown from 'react-markdown'

type Message = {
  role: 'user' | 'assistant'
  text: string
  citation?: {
    text: string
    pdfUrl: string
    paragraph?: string
  }
}
const cleanMarkdown = (str: string) => {
  return str
    .replace(/\*\*(.*?)\*\*/g, '$1') // remove bold
    .replace(/_(.*?)_/g, '$1')       // remove italics
    .replace(/#+\s?/g, '')           // remove headings
    .replace(/>`(.*?)`/g, '$1')      // remove inline code
    .replace(/>\s?(.*)/g, '$1')      // remove blockquote arrow
    .replace(/---/g, '')             // remove horizontal lines
}


export default function Home() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [streamedText, setStreamedText] = useState('')
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

      const fullText = data.answer
      const citation = data.citation ? {
        text: data.citation.text,
        pdfUrl: data.citation.pdfUrl,
        paragraph: data.citation.paragraph
      } : undefined

      setStreamedText('')
      let index = 0
      let tempText = ''

      const type = () => {
      if (index < fullText.length) {
        tempText += fullText[index]
        setStreamedText(cleanMarkdown(tempText)) // <-- clean here
        index++
        setTimeout(type, 20)
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: fullText, citation }
        ])
        setStreamedText('')
      }
    }


      type()
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
  }, [messages, streamedText])

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <Header />
      
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-3xl mx-auto p-4 rounded-lg whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-blue-100 dark:bg-blue-900 text-black dark:text-white ml-auto'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>
                {msg.text}
              </ReactMarkdown>
            </div>

            {msg.role === 'assistant' && msg.citation && (
              <div className="mt-4 border-t pt-2 text-sm text-gray-600 dark:text-gray-400">
                <p className="italic">{msg.citation.text}</p>
                <p className='mt-5 mb-3 text-black dark:text-white'>
                  <span className='font-bold'>On Click:</span> Open this PDF:
                </p>
                <a
                  href={msg.citation.pdfUrl}
                  target="_blank"  //open on a new tab
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
                >
                  📄 View Source Document
                </a>
                <p className='bold mt-5 text-black dark:text-white'>
                  Scroll to and highlight Paragraph 7
                </p>
              </div>
            )}
          </div>
        ))}

        {streamedText && (
          <div className="max-w-3xl mx-auto p-4 rounded-lg whitespace-pre-wrap bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
            {streamedText}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 pt-2 pb-4">
        <div className="max-w-3xl mx-auto px-4">
          <div className="relative">
            <div className="relative">
              <div className="absolute left-3 bottom-3 flex gap-3">
                <button className="p-1 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-1">
                  <Plus className="w-5 h-5" />
                </button>
                <button className="p-1 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-2">
                  <Wrench className="w-5 h-5" />
                </button>
              </div>

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
                rows={1}
                className="w-full py-9 px-16 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none min-h-[60px] max-h-[400px]"
                disabled={loading}
              />

              <div className="absolute right-3 bottom-3 flex gap-3">
                {query ? (
                  <button
                    onClick={handleAsk}
                    disabled={loading}
                    className="p-1 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-full mr-1 flex items-center justify-center w-9 h-9"
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                        />
                      </svg>
                    ) : (
                      <ArrowUp className="w-5 h-5 cursor-pointer" />
                    )}
                  </button>
                ) : (
                  <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-1">
                    <Mic className="w-5 h-5 cursor-pointer" />
                  </button>
                )}
              </div>
            </div>

            {loading && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                Thinking...
              </p>
            )}

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              Lexi can make mistakes. Checking important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
