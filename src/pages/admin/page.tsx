'use client';

import { useState } from 'react';
import Image from 'next/image';
import React from 'react';
import ManageServices from './manage-services/page';
import AdminServiceRequests from './service-partners/page';
import ReferralWallet from './referall-wallet/page';

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
            default:
                return <AdminServiceRequests />;
        }
    };

    return (
        <div className="p-8">
            {renderContent()}
        </div>
    );
}
