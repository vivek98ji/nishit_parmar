"use client"

import { useState } from "react"
import { Upload, Plus, Minus } from "lucide-react"
import type React from "react" // Added import for React

interface ServiceFormData {
  title: string
  category: string
  description: string
  price: string
  deliveryTime: string
  requirements: string[]
  images: string[]
}

interface AddServiceFormProps {
  onClose: () => void
}

export default function AddServiceForm({ onClose }: AddServiceFormProps) {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    category: "",
    description: "",
    price: "",
    deliveryTime: "",
    requirements: [""],
    images: [],
  })

  const categories = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Video Editing",
    "Voice Over",
    "Translation",
    "Other",
  ]

  const handleInputChange = (field: keyof ServiceFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements]
    newRequirements[index] = value
    setFormData((prev) => ({ ...prev, requirements: newRequirements }))
  }

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }))
  }

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Service Images</label>
        <div className="flex gap-4">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            >
              <div className="text-center">
                <Upload className="w-6 h-6 mx-auto text-gray-400" />
                <span className="text-sm text-gray-500">Upload</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Service Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="e.g., Professional Web Development"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Describe your service in detail..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="e.g., 100"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Delivery Time (days)</label>
          <input
            type="number"
            value={formData.deliveryTime}
            onChange={(e) => handleInputChange("deliveryTime", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="e.g., 7"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Requirements</label>
        <div className="space-y-2">
          {formData.requirements.map((req, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={req}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="What do you need from the buyer?"
              />
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Requirement
          </button>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Create Service
        </button>
      </div>
    </form>
  )
}

