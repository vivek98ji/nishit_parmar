import React, { useState } from 'react';
import { Mail as MailIcon, Star, AlertCircle, Package, Shield } from 'lucide-react';

export function MailInbox() {  // ✅ Renamed to avoid conflict
  const [selectedCategory, setSelectedCategory] = useState('all');

  const emails = [
    {
      id: 1,
      type: 'admin',
      subject: 'Important: Service Guidelines Update',
      sender: 'Admin Team',
      preview: 'Please review the updated service provider guidelines for 2024...',
      date: '2h ago',
      isRead: false,
      isStarred: true,
      priority: 'high'
    },
    {
      id: 2,
      type: 'order',
      subject: 'New Order: Website Development Service',
      sender: 'John Smith',
      preview: 'I would like to proceed with the website development package...',
      date: '4h ago',
      isRead: true,
      isStarred: false,
      orderID: '#ORD-2024-001'
    },
  ];

  const filteredEmails = selectedCategory === 'all' 
    ? emails 
    : emails.filter(email => email.type === selectedCategory);

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
          <MailIcon className="w-4 h-4 inline mr-2" />  {/* ✅ Renamed Icon */}
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
        {filteredEmails.map((email) => (
          <div 
            key={email.id} 
            className={`p-4 hover:bg-gray-50 cursor-pointer ${
              !email.isRead ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {email.type === 'admin' ? (
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
                    <span className="font-medium">{email.sender}</span>
                    {email.type === 'admin' && email.priority === 'high' && (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    {email.isStarred && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900">{email.subject}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    {email.type === 'order' && (
                      <span className="text-green-600">{email.orderID}</span>
                    )}
                    <span>{email.preview}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{email.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MailInbox;  // ✅ Renamed Component
