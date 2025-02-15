'use client';

import { useState, useEffect } from 'react';
import { IMail } from '@/models/mail';

export default function Mails() {
    const [mails, setMails] = useState<IMail[]>([]);
    const [newMail, setNewMail] = useState({
        subject: '',
        recipient: '',
        preview: '',
        priority: 'medium',
        orderID: '',
        providerId: ''
    });
    const [activeTab, setActiveTab] = useState<'inbox' | 'sent'>('inbox');
    const ADMIN_EMAIL = 'admin@example.com'; // Replace with your actual admin email

    useEffect(() => {
        fetchMails();
    }, []);

    const fetchMails = async () => {
        try {
            const response = await fetch('/api/mail');
            const data = await response.json();
            if (data.success) {
                setMails(data.mails);
            }
        } catch (error) {
            console.error('Error fetching mails:', error);
        }
    };

    const handleSendMail = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const mailData = {
                ...newMail,
                type: 'sent',
                sender: ADMIN_EMAIL,
                date: new Date(),
            };

            const response = await fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mailData),
            });

            if (response.ok) {
                setNewMail({
                    subject: '',
                    recipient: '',
                    preview: '',
                    priority: 'medium',
                    orderID: '',
                    providerId: ''
                });
                fetchMails();
            }
        } catch (error) {
            console.error('Error sending mail:', error);
        }
    };

    // Filter mails based on active tab and admin status
    const filteredMails = mails.filter(mail => {
        if (activeTab === 'inbox') {
            return mail.recipient === ADMIN_EMAIL && mail.type === 'inbox';
        } else {
            return mail.sender === ADMIN_EMAIL && mail.type === 'sent';
        }
    });

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Mail Management</h1>
            
            {/* Mail Composition Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Compose New Mail</h2>
                <form onSubmit={handleSendMail} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-700">Recipient Email</label>
                        <input
                            type="email"
                            value={newMail.recipient}
                            onChange={(e) => setNewMail({...newMail, recipient: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700">Subject</label>
                        <input
                            type="text"
                            value={newMail.subject}
                            onChange={(e) => setNewMail({...newMail, subject: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700">Message</label>
                        <textarea
                            value={newMail.preview}
                            onChange={(e) => setNewMail({...newMail, preview: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                            rows={4}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700">Priority</label>
                        <select
                            value={newMail.priority}
                            onChange={(e) => setNewMail({...newMail, priority: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-1 text-gray-700">Order ID (Optional)</label>
                            <input
                                type="text"
                                value={newMail.orderID}
                                onChange={(e) => setNewMail({...newMail, orderID: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 text-gray-700">Provider ID (Optional)</label>
                            <input
                                type="text"
                                value={newMail.providerId}
                                onChange={(e) => setNewMail({...newMail, providerId: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                    >
                        Send Mail
                    </button>
                </form>
            </div>

            {/* Mail List */}
            <div className="bg-white rounded-lg shadow-md">
                <div className="border-b border-gray-200">
                    <div className="flex">
                        <button
                            className={`px-4 py-2 text-sm font-medium ${
                                activeTab === 'inbox' 
                                    ? 'border-b-2 border-gray-900 text-gray-900' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('inbox')}
                        >
                            Inbox
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium ${
                                activeTab === 'sent' 
                                    ? 'border-b-2 border-gray-900 text-gray-900' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab('sent')}
                        >
                            Sent
                        </button>
                    </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                    {filteredMails.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            No {activeTab} messages found
                        </div>
                    ) : (
                        filteredMails.map((mail: any) => (
                            <div key={mail._id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{mail.subject}</h3>
                                        <p className="text-sm text-gray-600">
                                            {activeTab === 'inbox' ? `From: ${mail.sender}` : `To: ${mail.recipient}`}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">{mail.preview}</p>
                                        {(mail.orderID || mail.providerId) && (
                                            <div className="mt-1 space-x-2">
                                                {mail.orderID && (
                                                    <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
                                                        Order: {mail.orderID}
                                                    </span>
                                                )}
                                                {mail.providerId && (
                                                    <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
                                                        Provider: {mail.providerId}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm text-gray-500">
                                            {new Date(mail.date).toLocaleDateString()}
                                        </span>
                                        {mail.priority && (
                                            <span className={`ml-2 px-2 py-1 text-xs rounded ${
                                                mail.priority === 'high' ? 'bg-red-100 text-red-800' :
                                                mail.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {mail.priority}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}