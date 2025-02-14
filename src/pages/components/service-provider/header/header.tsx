"use client"

import { Menu, Settings } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  setSidebarOpen: (isOpen: boolean) => void
  activeTab: string
}

export function Header({ setSidebarOpen, activeTab }: HeaderProps) {
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
          <button className="px-4 py-2 text-base font-medium text-gray-900">{activeTab || "Dashboard"}</button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/settings"
          className={`p-2 rounded-md transition-colors ${
            activeTab === "Settings"
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Settings className="h-6 w-6" />
        </Link>
      </div>
    </header>
  )
}