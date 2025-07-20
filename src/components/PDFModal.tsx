type Props = {
  onClose: () => void
}

export default function PDFModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative w-[90%] h-[90%] bg-white rounded-xl p-4 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>
        <iframe
          src="/judgment.pdf#page=2"
          className="w-full h-full rounded"
        />
      </div>
    </div>
  )
}
