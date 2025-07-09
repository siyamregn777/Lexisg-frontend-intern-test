// import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from '@/components/ModeToggle'

const Header = () => {
  return (
    <header className="p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex justify-between items-center border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 h-16">
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold">Lexi Legal Assistant</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-shrink-0"> {/* Wrap ModeToggle to prevent shifting */}
          <ModeToggle />
        </div>
        
        <div className="flex items-center gap-1 cursor-pointer flex-shrink-0">
          <Image 
            src="/share.jpg" 
            alt="Share" 
            width={20} 
            height={20}
            className="w-5 h-5"
          />
          <span>Share</span>
        </div>
        
        <div className="text-white cursor-pointer flex-shrink-0"> ... </div>

        <button className="p-1 rounded-full bg-amber-100 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer flex-shrink-0">
          <Image 
            src="/account.jpg" 
            alt="File" 
            width={24} 
            height={24} 
            className="w-5 h-5 hover:rounded-full"
          />
        </button>
      </div>
    </header>
  )
}

export default Header
