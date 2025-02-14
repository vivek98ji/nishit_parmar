'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import mongoose from 'mongoose';

interface User {
    _id: string;
    name: string;
    email: string;
    wallet: number;
    referralCode: string;
    referralCount: number;
    avatar: string;
}

interface Transaction {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
    };
    type: 'credit' | 'debit';
    amount: number;
    description: string;
    date: string;
}

export default function ReferralWallet() {
    const [users, setUsers] = useState<User[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [activeTab, setActiveTab] = useState<'users' | 'transactions'>('users');
    const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchTransactions();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            showNotification('Failed to fetch users', true);
        }
    };

    const fetchTransactions = async () => {
        try {
            const response = await fetch('/api/transactions');
            const data = await response.json();
            if (data.success) {
                setTransactions(data.transactions);
            }
        } catch (error) {
            showNotification('Failed to fetch transactions', true);
        }
    };

    const showNotification = (message: string, isError: boolean = false) => {
        if (isError) {
            setError(message);
            setTimeout(() => setError(''), 3000);
        } else {
            setSuccess(message);
            setTimeout(() => setSuccess(''), 3000);
        }
    };

    const handleAddFunds = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!selectedUser) return;
    
        const numAmount = parseFloat(amount);
    
        if (isNaN(numAmount) || numAmount <= 0) {
            showNotification('Please enter a valid amount', true);
            return;
        }
    
        try {
            console.log(`Adding funds to user ID: ${selectedUser._id}`);
            const response = await fetch(`/api/users/${selectedUser._id}/add-funds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: numAmount }),
            });
    
            const data = await response.json();
            console.log(`Response from server: ${JSON.stringify(data)}`);
    
            if (data.success) {
                await fetchUsers();
                await fetchTransactions();
                showNotification(`Successfully added $${numAmount} to ${selectedUser.name}'s wallet`);
                setIsAddFundsModalOpen(false);
                setAmount('');
                setSelectedUser(null);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.log(`Error adding funds: ${(error as Error).message}`);
            showNotification(`Failed to add funds: ${(error as Error).message}`, true);
        }
    };

    // Function to generate new referral code
    const generateNewReferralCode = (userId: string) => {
        const user = users.find(u => u._id === userId);
        if (!user) return;

        const newCode = `${user.name.substring(0, 4).toUpperCase()}${Math.floor(Math.random() * 1000)}`;

        setUsers(users.map(u => {
            if (u._id === userId) {
                return { ...u, referralCode: newCode };
            }
            return u;
        }));

        showNotification(`New referral code generated: ${newCode}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            {/* Notification Area */}
            {error && (
                <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
                    {error}
                </div>
            )}
            {success && (
                <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
                    {success}
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Referral & Wallet System</h1>
                    <div className="mt-4">
                        <nav className="flex space-x-4">
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`px-4 py-2 rounded-md ${activeTab === 'users'
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Users & Wallets
                            </button>
                            <button
                                onClick={() => setActiveTab('transactions')}
                                className={`px-4 py-2 rounded-md ${activeTab === 'transactions'
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Transactions
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Users & Wallets Tab */}
                {activeTab === 'users' && (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Wallet Balance
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Referral Code
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Referrals
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <Image
                                                        className="h-10 w-10 rounded-full"
                                                        src={user.avatar}
                                                        alt=""
                                                        width={40}
                                                        height={40}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-gray-900">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 font-bold">${user.wallet}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-blue-100 text-gray-800">
                                                {user.referralCode}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">
                                            {user.referralCount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                                            <button
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setIsAddFundsModalOpen(true);
                                                }}
                                                className="bg-black text-white p-2 rounded-md mr-4"
                                            >
                                                Add Funds
                                            </button>
                                            <button
                                                onClick={() => generateNewReferralCode(user._id)}
                                                className="bg-black text-white p-2 rounded-md"
                                            >
                                                New Referral Code
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Transactions Tab */}
                {activeTab === 'transactions' && (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs  font-bold text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactions.map((transaction) => (
                                    <tr key={transaction._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm  font-semibold">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full p-1 ${transaction.type === 'credit'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            ${transaction.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold ">
                                            {transaction.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Updated Add Funds Modal */}
                {isAddFundsModalOpen && selectedUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full">
                            <h2 className="text-2xl font-bold mb-4">Add Funds to Wallet</h2>
                            <p className="text-gray-600 mb-4">
                                Current balance: ${selectedUser.wallet}
                            </p>
                            <form onSubmit={handleAddFunds}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Amount ($)
                                    </label>
                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                        placeholder="Enter amount"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAddFundsModalOpen(false);
                                            setSelectedUser(null);
                                            setAmount('');
                                        }}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Add Funds
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 