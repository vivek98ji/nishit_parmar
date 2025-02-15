import React from 'react';
import { useRouter } from 'next/router';
import { FaUsers, FaCog, FaWallet } from 'react-icons/fa';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const currentPath = router.pathname;

    const menuItems = [
        {
            path: '/admin/service-partners/page',
            name: 'Service Partners',
            icon: <FaUsers className="w-5 h-5" />
        },
        {
            path: '/admin/manage-services/page',
            name: 'Manage Services',
            icon: <FaCog className="w-5 h-5" />
        },
        {
            path: '/admin/referall-wallet/page',
            name: 'Referral & Wallet',
            icon: <FaWallet className="w-5 h-5" />
        }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-black text-white">
                {/* Logo */}
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                </div>

                {/* Navigation */}
                <nav className="mt-6">
                    {menuItems.map((item) => (
                        <div
                            key={item.path}
                            className={`p-4 cursor-pointer flex items-center space-x-3 
                                ${currentPath === item.path 
                                    ? 'bg-gray-800 border-l-4 border-white' 
                                    : 'hover:bg-gray-800'}`}
                            onClick={() => router.push(item.path)}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout; 