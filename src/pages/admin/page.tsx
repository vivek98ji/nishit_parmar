'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';
import ManageServices from './manage-services/page';
import AdminServiceRequests from './service-partners/page';
import ReferralWallet from './referall-wallet/page';
import AdminLayout from './AdminLayout';
import Income from './admin-income/page';
import BlogsAdmin from './blogs/page';
import Mails from './mails/page';

export default function Admin() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Redirect from /admin/page to /admin/service-partners/page if needed
        if (router.pathname === '/admin/page') {
            router.push('/admin/service-partners/page');
        }
    }, [router]);

    if (!mounted) {
        return null;
    }


    // Extract the current path to determine active content
    const currentPath = router.pathname;
    
    const renderContent = () => {
        switch (true) {
            case currentPath.includes('service-partners'):
                return <AdminServiceRequests />;
            case currentPath.includes('manage-services'):
                return <ManageServices />;
            case currentPath.includes('referall-wallet'):
                return <ReferralWallet />;
            case currentPath.includes('admin-income'):
                return <Income />;
            case currentPath.includes('mails'):
                return <Mails />;
            case currentPath.includes('blogs'):
                return <BlogsAdmin />;
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
