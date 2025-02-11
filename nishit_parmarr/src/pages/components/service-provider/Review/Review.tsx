"use client"

import { useEffect, useState } from "react"
import { ThumbsUp, Trash2, MessageCircle, Star } from "lucide-react"
import Image from "next/image"

interface Comment {
  _id: string
  user: string
  avatar: string
  rating: number
  comment: string
  date: string
  likes: number
}

export function Reviews() {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch comments from the API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comments")
        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to fetch comments")
        }

        setComments(data.bookings || []) // Use the `bookings` field
      } catch (err) {
        console.error("Fetch error:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch comments")
        setComments([]) // Set empty array on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [])

  // Function to handle liking a comment
  const handleLike = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to like comment")
      }

      // Update the likes count in the UI
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        )
      )
    } catch (err) {
      console.error("Like error:", err)
    }
  }

  // Function to handle deleting a comment
  const handleDelete = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });
  
      const data = await response.json();
  
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to delete comment");
      }
  
      // Remove the deleted comment from the UI
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button className="py-4 px-1 text-sm font-medium border-b-2 border-primary text-primary">
              REVIEWS
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg">
                  <Image
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.user}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{comment.user}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            {[...Array(comment.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            {[...Array(5 - comment.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-gray-200 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">{comment.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLike(comment._id)}
                          className="p-1 text-gray-400 hover:text-gray-500 flex items-center gap-1"
                        >
                          <ThumbsUp className="h-5 w-5" />
                          <span className="text-sm">{comment.likes}</span>
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-500">
                          <MessageCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(comment._id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{comment.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No comments available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews