import Link from "next/link"
import Image from "next/image"
import { User, Star } from "lucide-react"
import { Reviews } from "../Review/Review"
import { Workspace } from "../workspace/workspace"
import { Income } from "../income/income"
import { MailInbox } from "../Mail/mail"
import { ContractsSection} from "../contracts/contracts"
import { PromotePlans } from "../promote/promote"
import AddServiceForm from "../addService/addService"
import Settings from "../settings/settings"

interface MainContentProps {
  activeTab: string
}

export function MainContent({ activeTab }: MainContentProps) {
  // If the activeTab is Reviews, show the Reviews component
  if (activeTab === "Reviews") {
    return <Reviews />
  }
  if (activeTab === "Workspace") {
    return <Workspace />
  }
  if (activeTab === "Income") {
    return <Income />
  }
  if (activeTab === "Mail") {
    return <MailInbox />
  }
  if (activeTab === "Contracts") {
    return <ContractsSection />
  }
  if (activeTab === "Promote") {
    return <PromotePlans />
  }
  if ( activeTab === "addservice") {
    return <AddServiceForm onClose={() => {}}/>
  }
  if ( activeTab === "Settings") {
    return <Settings />
  }


  const stats = [
    { label: "Total Views", value: "4.42K", subtext: "119", change: "+600.0% since previous day" },
    { label: "Collections", value: "5", change: "0.0% since previous day" },
    { label: "Power Ranking", value: "No.0", change: "0 since previous day" },
    { label: "Total Services", value: "12", change: "+2 since previous week" },
    { label: "Completed Orders", value: "156", change: "+23.5% since previous week" },
  ]

  const latestServices = [
    { title: "Web Development", price: "$499", date: "2025-02-05", thumbnail: "/service-page/webd.jpg" },
    { title: "UI/UX Design", price: "$299", date: "2025-02-03", thumbnail: "/service-page/uiux.png" },
    { title: "Content Writing", price: "$199", date: "2025-02-01", thumbnail: "/service-page/content.png" },
  ]

  const latestPurchases = [
    { customer: "John Doe", service: "Web Development", price: "$499", date: "2025-02-07" },
    { customer: "Jane Smith", service: "UI/UX Design", price: "$299", date: "2025-02-06" },
    { customer: "Mike Johnson", service: "Content Writing", price: "$199", date: "2025-02-05" },
  ]

  const customerReviews = [
    { customer: "John Doe", rating: 5, comment: "Excellent service!", date: "2025-02-07" },
    { customer: "Jane Smith", rating: 4, comment: "Great work!", date: "2025-02-06" },
    { customer: "Mike Johnson", rating: 5, comment: "Very professional!", date: "2025-02-05" },
  ]

  return (
    <main className="p-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
            <div className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
              {stat.subtext && <span className="ml-2 text-sm text-gray-500">↗ {stat.subtext}</span>}
            </div>
            <div className="text-xs text-gray-500 mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Released Services */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Latest Released Services</h2>
              <Link href="/services" className="text-sm text-gray-600 hover:text-gray-900">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {latestServices.map((service, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                  <Image
                    src={service.thumbnail || "/placeholder.svg"}
                    alt={service.title}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-500">{service.date}</p>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{service.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Purchases */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Latest Purchases</h2>
              <Link href="/purchases" className="text-sm text-gray-600 hover:text-gray-900">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {latestPurchases.map((purchase, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <User className="h-10 w-10 text-gray-400" />
                    <div>
                      <h3 className="font-medium text-gray-900">{purchase.customer}</h3>
                      <p className="text-sm text-gray-500">{purchase.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{purchase.price}</div>
                    <div className="text-sm text-gray-500">{purchase.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Customer Reviews & Earnings */}
        <div className="lg:col-span-1 space-y-6">
          {/* Earnings Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Earnings Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Earnings</span>
                <span className="text-2xl font-semibold text-gray-900">$5,678</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">This Month</span>
                <span className="text-lg font-semibold text-gray-900">$1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">This Week</span>
                <span className="text-lg font-semibold text-gray-900">$567</span>
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Latest Reviews</h2>
            <div className="space-y-4">
              {customerReviews.map((review, index) => (
                <div key={index} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{review.customer}</div>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

