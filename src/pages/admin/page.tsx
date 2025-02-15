'use client';

import { useState } from 'react';
import Image from 'next/image';
import React from 'react';
import ManageServices from './manage-services/page';
import AdminServiceRequests from './service-partners/page';
import ReferralWallet from './referall-wallet/page';
import AdminLayout from '@/pages/components/admin/AdminLayout';
import { AdminIncome } from './incomee/page';

export default function Admin() {
    const [activeTab, setActiveTab] = useState('service-partners');

    const renderContent = () => {
        switch (activeTab) {
            case 'service-partners':
                return <AdminServiceRequests />;
            case 'manage-services':
                return <ManageServices />;
            case 'referall-wallet':
                return <ReferralWallet />;
            case 'incomee':
                return <AdminIncome />
            default:
                return <AdminServiceRequests />;
        }
    };

    return (
        <AdminLayout>
            {renderContent()}
        </AdminLayout>
    );
}
