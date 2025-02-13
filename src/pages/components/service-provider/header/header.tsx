"use client"

import { Menu, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeaderProps {
  setSidebarOpen: (isOpen: boolean) => void
  activeTab: string
  setActiveTab: (tab: string) => void 
}

export function Header({ setSidebarOpen, activeTab, setActiveTab }: HeaderProps) {
  const router = useRouter()

  const handleSettingsClick = () => {
    setActiveTab("Settings")
    router.push('/settings') // Navigate to settings page
  }

  return (
    <header className="h-20 flex items-center justify-between px-6 border-b border-gray-200">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Menu className="h-6 w-6 text-gray-500" />
        </button>
        <div className="flex space-x-6 ml-6">
          <button className="px-4 py-2 text-base font-medium text-gray-900">{activeTab}</button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleSettingsClick}
          className={`p-2 transition-colors ${
            activeTab === 'Settings' 
              ? 'text-gray-900 bg-gray-100 rounded-md' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Settings className="h-6 w-6" />
        </button>
      </div>
    </header>
  )
}