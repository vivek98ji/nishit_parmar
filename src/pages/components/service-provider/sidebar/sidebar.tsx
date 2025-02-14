import { X, Home, Layout, DollarSign, FileText, Rocket, Plus, Mail } from "lucide-react"
import Image from "next/image"
import { comment } from "postcss"
import { MdReviews } from "react-icons/md"

interface SidebarProps {
  isSidebarOpen: boolean
  setSidebarOpen: (isOpen: boolean) => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ isSidebarOpen, setSidebarOpen, activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { name: "Dashboard", icon: Home },
    { name: "Workspace", icon: Layout },
    { name: "Mail", icon: Mail },
    { name: "Reviews", icon: MdReviews},
    { name: "Income", icon: DollarSign },
    { name: "Contracts", icon: FileText },
    { name: "Promote", icon: Rocket }
  ]

  
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 border-r border-gray-200`}
    >
      <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200">
        <Image
          src="/logo.png"
          alt="Logo"
          width={72}
          height={72}
          priority
          className="rounded-full border border-gray-300 shadow-sm"
        />
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <div className="p-6">
        <div className="space-y-2 mb-8">
        <button 
      className="w-full flex items-center justify-center space-x-2 px-3 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
      onClick={() => setActiveTab("addservice")}  // Add this onClick handler
      >
  <Plus className="h-5 w-5" />
  <span className="text-base font-medium">Add New Service</span>
</button>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.name ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-base font-medium">{item.name}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

