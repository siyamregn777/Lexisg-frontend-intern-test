import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

type Props = {
  query: string
  setQuery: (val: string) => void
  response: string
  loading: boolean
  onSubmit: () => void
  onShowCitation: () => void
}

export default function ChatBox({ query, setQuery, response, loading, onSubmit, onShowCitation }: Props) {
  const citationText = `“as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.” (Para 7 of the document)`

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Ask a legal question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={4}
      />
      <Button onClick={onSubmit} disabled={loading}>
        {loading ? 'Generating Answer...' : 'Submit'}
      </Button>

      {response && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="mb-4">
            <p className="text-gray-500 text-sm font-semibold">Answer:</p>
            <p className="text-black mt-1">{response}</p>
          </div>

          <div className="border-t pt-4">
            <p className="text-gray-500 text-sm font-semibold mb-1">Citation:</p>
            <p className="text-sm italic text-gray-700">“as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.” <span className="font-medium">(Para 7 of the document)</span></p>

            <a
              href="/judgment.pdf#page=2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-blue-600 hover:underline text-sm"
            >
              📄 Download Judgment PDF
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
