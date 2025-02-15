"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail as MailIcon, Star, AlertCircle, Package, Shield } from 'lucide-react';

interface Mail {
  _id: string;
  type: 'admin' | 'order';
  subject: string;
  sender: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  isStarred: boolean;
  priority?: 'high' | 'normal';
  orderID?: string;
  providerId: string;
}

const useMails = (providerId: string | null) => {
  const [mails, setMails] = useState<Mail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        setLoading(true);
        
        if (!providerId) {
          throw new Error("No provider ID found in URL");
        }

        const response = await fetch(`/api/mail?providerId=${providerId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch mails');
        }

        if (!data.success) {
          throw new Error(data.message || 'Failed to load mail data');
        }

        // Transform API response to Mail interface
        const transformedMails: Mail[] = data.mails.map((mail: any) => ({
          _id: mail._id,
          type: mail.type || 'admin',
          subject: mail.subject,
          sender: mail.sender,
          content: mail.content || mail.preview, // Handle preview/content naming
          createdAt: new Date(mail.createdAt || mail.date).toLocaleString(),
          isRead: mail.isRead,
          isStarred: mail.isStarred,
          priority: mail.priority,
          orderID: mail.orderID,
          providerId: mail.providerId
        }));

        setMails(transformedMails);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch emails");
      } finally {
        setLoading(false);
      }
    };

    if (providerId) {
      fetchMails();
    }
  }, [providerId]);

  return { mails, loading, error };
};

export default function MailInbox() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId");
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'admin'>('all');
  const { mails, loading, error } = useMails(providerId);

  const filteredMails = selectedCategory === 'all' 
    ? mails 
    : mails.filter(mail => mail.type === selectedCategory);

  if (!providerId) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: No provider ID specified</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading emails...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Mail Filter Tabs */}
      <div className="flex space-x-4 p-4 border-b border-gray-200">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <MailIcon className="w-5 h-5 mr-2" />
          All Mails
        </button>
        <button
          onClick={() => setSelectedCategory('admin')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === 'admin'
              ? 'bg-purple-50 text-purple-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Shield className="w-5 h-5 mr-2" />
          Admin Mails
        </button>
      </div>

      {/* Mail List */}
      <div className="divide-y divide-gray-200">
        {filteredMails.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No emails found for this provider
          </div>
        ) : (
          filteredMails.map((mail) => (
            <div
              key={mail._id}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                !mail.isRead ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                {/* Left Section */}
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className={`p-2 rounded-full ${
                    mail.type === 'admin' 
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {mail.type === 'admin' ? (
                      <Shield className="w-5 h-5" />
                    ) : (
                      <Package className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900 truncate">
                        {mail.sender}
                      </span>
                      {mail.priority === 'high' && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      {mail.isStarred && (
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      )}
                    </div>
                    
                    <h3 className="font-medium text-gray-900 truncate">
                      {mail.subject}
                    </h3>
                    
                    <p className="text-sm text-gray-500 truncate">
                      {mail.content}
                    </p>

                    {mail.orderID && (
                      <div className="mt-1 text-sm text-green-600">
                        Order ID: {mail.orderID}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col items-end space-y-1 ml-4">
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {mail.createdAt}
                  </span>
                  {!mail.isRead && (
                    <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                      New
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

