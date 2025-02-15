"use client"

import { useSearchParams } from "next/navigation";
import { useState } from "react"
import Sidebar from "./components/service-provider/sidebar/sidebar"
import Header from "./components/service-provider/header/header"
import MainContent from "./components/service-provider/dashboard/main_content"

export default function Dashboard() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId");
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("Home")

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 overflow-auto">
        <Header setSidebarOpen={setSidebarOpen} activeTab={activeTab} />
        <MainContent activeTab={activeTab} />
      </div>
    </div>
  )
}

