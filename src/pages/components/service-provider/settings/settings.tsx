"use client";

import { useState, useEffect } from "react";
import { Info, ArrowLeft, LogOut, Save } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../ui/Tabs";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";

interface UserInfo {
  name: string;
  category: string;
  owner_name: string;
  contact: {
    phone: string;
    email: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    zip_code: string;
  };
  bank_info: {
    bank_name: string;
    branch_name: string;
    branch_address: string;
    swift_code: string;
    account_number: string;
  };
  user_info: {
    user_id: string;
    username: string;
    email: string;
  };
}

export function Settings() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = "usr123456"; // Example, replace dynamically
        const response = await fetch(`/api/provider?user_id=${userId}`);
        const data = await response.json();
        if (data.success) {
          setUserInfo(data.provider);
        } else {
          console.error("Failed to fetch user info:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!userInfo) return <div>Error loading user info</div>;

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <Button variant="ghost" onClick={() => router.push("/service-page")} className="flex items-center">
          <ArrowLeft className="mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <Button variant="signout" onClick={() => router.push("/login")} className="mr-2">
            <LogOut className="mr-2" /> Sign Out
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Card>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-50 p-1">
              <TabsTrigger value="general" className="py-2">General</TabsTrigger>
              <TabsTrigger value="bank" className="py-2">Bank Information</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">General Settings</h2>
                <p><strong>Business Name:</strong> {userInfo.name}</p>
                <p><strong>Category:</strong> {userInfo.category}</p>
                <p><strong>Owner:</strong> {userInfo.owner_name}</p>
                <p><strong>Email:</strong> {userInfo.contact.email}</p>
                <p><strong>Phone:</strong> {userInfo.contact.phone}</p>
                <p><strong>Address:</strong> {userInfo.location.address}, {userInfo.location.city}, {userInfo.location.state}, {userInfo.location.zip_code}</p>
              </CardContent>
            </TabsContent>

            <TabsContent value="bank">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium">Bank Information</h2>
                <p><strong>Bank Name:</strong> {userInfo.bank_info.bank_name}</p>
                <p><strong>Branch Name:</strong> {userInfo.bank_info.branch_name}</p>
                <p><strong>Branch Address:</strong> {userInfo.bank_info.branch_address}</p>
                <p><strong>SWIFT Code:</strong> {userInfo.bank_info.swift_code}</p>
                <p><strong>Account Number:</strong> **** **** {userInfo.bank_info.account_number.slice(-4)}</p>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
