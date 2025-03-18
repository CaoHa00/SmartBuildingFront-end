import { Input } from "@/components/ui/input"
import { Mic, Search } from "lucide-react"
import { useState } from "react"
import { useSidebar } from "./ui/sidebar"

export default function SearchBar() {
  const { state } = useSidebar()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isCollapsed = state === "collapsed"

  const handleSearchClick = () => {
    if (isCollapsed) {
      setIsSearchOpen(!isSearchOpen)
    }
  }

  return (
    <div className={`relative flex items-center transition-all duration-200 ${
      isCollapsed ? (isSearchOpen ? 'w-60' : 'w-9') : 'w-70'
    }`}>
      <div className={`relative flex ${
        isCollapsed && !isSearchOpen ? 'w-9' : 'w-full'
      } text-blue-800 bg-white border border-blue-300 rounded-lg`}>
        <Search 
          className={`${isCollapsed ? 'cursor-pointer' : ''} absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5`}
          onClick={handleSearchClick}
        />
        <Input 
          placeholder="Search" 
          className={`pl-12 pr-4 bg-sky-100 ${isCollapsed && !isSearchOpen ? 'hidden' : 'block'}`}
        />
      </div>
    </div>
  )
}