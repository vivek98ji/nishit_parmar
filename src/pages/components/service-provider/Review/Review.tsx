import { ThumbsUp, Trash2, MessageCircle, Star } from "lucide-react"
import Image from "next/image"

interface Review {
  id: string
  user: {
    name: string
    avatar: string
  }
  rating: number
  comment: string
  date: string
  likes: number
}

export default function Reviews() {
  const reviews: Review[] = [
    {
      id: "1",
      user: {
        name: "CrazyDiscoverer",
        avatar: "/service-page/pfp.jpg?height=40&width=40",
      },
      rating: 5,
      comment:
        "hellow oworld how are tu est vouis un deus trois quatre cinq six sept huit neuf dix onze douze treize quatorze quinze seize dix-sept dix-huit dix-neuf vingt",
      date: "a month ago",
      likes: 1,
    },
    {
      id: "2",
      user: {
        name: "Suyash_Yadav_5942",
        avatar: "/service-page/pfp.jpg?height=40&width=40",
      },
      rating: 4,
      comment: "neuf dix onze douze treize quatorze quinze seize dix-sept dix-huit dix-neuf vingt",
      date: "a month ago",
      likes: 2,
    },
  ]

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {["REVIEWS"].map((tab) => (
              <button
                key={tab}
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  tab === "REVIEWS"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg">
                <Image
                  src={review.user.avatar || "/service-page/webd.jpg"}
                  alt={review.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{review.user.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-500">
                        <ThumbsUp className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-500">
                        <MessageCircle className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-500">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>
                      {review.likes} like{review.likes !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

