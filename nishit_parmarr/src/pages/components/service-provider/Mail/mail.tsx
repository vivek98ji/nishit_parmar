import React, { useState, useEffect } from 'react';
import { Mail as MailIcon, Star, AlertCircle, Package, Shield } from 'lucide-react';

// Type definitions for our mail data
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
}

// Custom hook for fetching mails
const useMails = () => {
  const [mails, setMails] = useState<Mail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await fetch('/api/mail');
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch mails');
        }

        // Transform the data to match our Mail interface
        const transformedMails = data.mails.map((mail: any) => ({
          _id: mail._id,
          type: mail.type || 'admin',
          subject: mail.subject,
          sender: mail.sender || 'Unknown Sender',
          content: mail.content,
          createdAt: new Date(mail.createdAt).toLocaleString(),
          isRead: mail.isRead || false,
          isStarred: mail.isStarred || false,
          priority: mail.priority || 'normal',
          ...(mail.orderID && { orderID: mail.orderID })
        }));

        setMails(transformedMails);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMails();
  }, []);

  return { mails, loading, error };
};

export function MailInbox() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { mails, loading, error } = useMails();

  const filteredMails = selectedCategory === 'all' 
    ? mails 
    : mails.filter(mail => mail.type === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading...</div>
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
    <div className="bg-white rounded-lg">
      {/* Mail Categories */}
      <div className="flex space-x-4 p-4 border-b">
        <button 
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === 'all' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <MailIcon className="w-4 h-4 inline mr-2" />
          All Mail
        </button>
        <button 
          onClick={() => setSelectedCategory('admin')}
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === 'admin' 
              ? 'bg-purple-50 text-purple-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Shield className="w-4 h-4 inline mr-2" />
          Admin
        </button>
      </div>

      {/* Mail List */}
      <div className="divide-y">
        {filteredMails.map((mail) => (
          <div 
            key={mail._id} 
            className={`p-4 hover:bg-gray-50 cursor-pointer ${
              !mail.isRead ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {mail.type === 'admin' ? (
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                ) : (
                  <div className="bg-green-100 p-2 rounded-full">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{mail.sender}</span>
                    {mail.type === 'admin' && mail.priority === 'high' && (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    {mail.isStarred && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900">{mail.subject}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    {mail.type === 'order' && mail.orderID && (
                      <span className="text-green-600">{mail.orderID}</span>
                    )}
                    <span>{mail.content}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{mail.createdAt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MailInbox;