'use client';

import { useState } from 'react';
import Image from 'next/image';
import React from 'react';
import ManageServices from './manage-services/page';
import AdminServiceRequests from './service-partners/page';
import ReferralWallet from './referall-wallet/page';

export default function Admin() {
    return(
        <div>
            <ManageServices></ManageServices>
            <AdminServiceRequests/>
            <ReferralWallet/>
        </div>
    )
}
