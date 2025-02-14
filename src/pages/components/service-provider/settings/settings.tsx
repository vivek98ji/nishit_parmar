"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, LogOut } from "lucide-react"
import { Card, CardContent } from "../.././ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../.././ui/Tabs"
import { Button } from "../.././ui/button"
import { Input } from "../.././ui/input"
import { useRouter } from "next/navigation"
import  {Skeleton} from "../.././ui/skeleton"

interface UserInfo {
  name: string
  category: string
  owner_name: string
  contact: {
    phone: string
    email: string
  }
  location: {
    address: string
    city: string
    state: string
    zip_code: string
  }
  bank_info: {
    bank_name: string
    branch_name: string
    branch_address: string
    swift_code: string
    account_number: string
  }
  user_info: {
    user_id: string
    username: string
    email: string
  }
}

export function Settings() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [editedInfo, setEditedInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = "usr123456" // Example, replace dynamically
        const response = await fetch(`/api/provider?user_id=${userId}`)
        const data = await response.json()
        if (data.success) {
          setUserInfo(data.provider)
          setEditedInfo(data.provider)
        } else {
          console.error("Failed to fetch user info:", data.error)
        }
      } catch (error) {
        console.error("Error fetching user info:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [])

  const handleInputChange = (section: string, field: string, value: string) => {
    if (!editedInfo) return

    setEditedInfo(prev => {
      if (!prev) return prev

      if (section === "root") {
        return { ...prev, [field]: value }
      }

      // Ensure that `prev[section]` is treated as an object
      const sectionData = prev[section as keyof typeof prev]
      if (typeof sectionData !== 'object' || sectionData === null) {
        return prev // or handle the error case appropriately
      }

      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value,
        },
      }
    })
  }

  const handleSaveChanges = async () => {
    if (!editedInfo) return

    setSaving(true)
    try {
      const response = await fetch('/api/provider', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedInfo),
      })

      const data = await response.json()
      if (data.success) {
        setUserInfo(editedInfo)
        alert('Changes saved successfully!')
      } else {
        alert('Failed to save changes: ' + data.message)
      }
    } catch (error) {
      console.error('Error saving changes:', error)
      alert('Error saving changes')
    } finally {
      setSaving(false)
    }
  }

  const hasChanges = JSON.stringify(userInfo) !== JSON.stringify(editedInfo)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <div className="border-b border-gray-200 p-4 flex justify-between items-center bg-white rounded-t-lg">
          <Button
            variant="ghost"
            onClick={() => router.push("/service-page")}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button variant="destructive" onClick={() => router.push("/login")} className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            {hasChanges && (
              <Button
                onClick={handleSaveChanges}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            )}
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="general" className="py-2">
                General
              </TabsTrigger>
              <TabsTrigger value="bank" className="py-2">
                Bank Information
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <CardContent className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">General Settings</h2>
                {loading ? (
                  <SettingsSkeleton />
                ) : editedInfo ? (
                  <div className="space-y-4">
                    <EditableField
                      label="Business Name"
                      value={editedInfo.name}
                      onChange={(value) => handleInputChange('root', 'name', value)}
                    />
                    <EditableField
                      label="Category"
                      value={editedInfo.category}
                      onChange={(value) => handleInputChange('root', 'category', value)}
                    />
                    <EditableField
                      label="Owner"
                      value={editedInfo.owner_name}
                      onChange={(value) => handleInputChange('root', 'owner_name', value)}
                    />
                    <EditableField
                      label="Email"
                      value={editedInfo.contact.email}
                      onChange={(value) => handleInputChange('contact', 'email', value)}
                    />
                    <EditableField
                      label="Phone"
                      value={editedInfo.contact.phone}
                      onChange={(value) => handleInputChange('contact', 'phone', value)}
                    />
                    <EditableField
                      label="Address"
                      value={editedInfo.location.address}
                      onChange={(value) => handleInputChange('location', 'address', value)}
                    />
                    <EditableField
                      label="City"
                      value={editedInfo.location.city}
                      onChange={(value) => handleInputChange('location', 'city', value)}
                    />
                    <EditableField
                      label="State"
                      value={editedInfo.location.state}
                      onChange={(value) => handleInputChange('location', 'state', value)}
                    />
                    <EditableField
                      label="ZIP Code"
                      value={editedInfo.location.zip_code}
                      onChange={(value) => handleInputChange('location', 'zip_code', value)}
                    />
                  </div>
                ) : (
                  <p className="text-red-500">Error loading user info</p>
                )}
              </CardContent>
            </TabsContent>

            <TabsContent value="bank">
              <CardContent className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Bank Information</h2>
                {loading ? (
                  <SettingsSkeleton />
                ) : editedInfo ? (
                  <div className="space-y-4">
                    <EditableField
                      label="Bank Name"
                      value={editedInfo.bank_info.bank_name}
                      onChange={(value) => handleInputChange('bank_info', 'bank_name', value)}
                    />
                    <EditableField
                      label="Branch Name"
                      value={editedInfo.bank_info.branch_name}
                      onChange={(value) => handleInputChange('bank_info', 'branch_name', value)}
                    />
                    <EditableField
                      label="Branch Address"
                      value={editedInfo.bank_info.branch_address}
                      onChange={(value) => handleInputChange('bank_info', 'branch_address', value)}
                    />
                    <EditableField
                      label="SWIFT Code"
                      value={editedInfo.bank_info.swift_code}
                      onChange={(value) => handleInputChange('bank_info', 'swift_code', value)}
                    />
                    <EditableField
                      label="Account Number"
                      value={editedInfo.bank_info.account_number}
                      onChange={(value) => handleInputChange('bank_info', 'account_number', value)}
                      type="password"
                    />
                  </div>
                ) : (
                  <p className="text-red-500">Error loading bank info</p>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  )
}

interface EditableFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}

function EditableField({ label, value, onChange, type = "text" }: EditableFieldProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-gray-500 mb-1 sm:mb-0">{label}:</span>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-md"
      />
    </div>
  )
}

function SettingsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex justify-between items-center">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}

export default Settings