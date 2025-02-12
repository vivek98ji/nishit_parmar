'use client';

import { useState } from 'react';
import { services as initialServices } from './data/serviceData';
import Image from 'next/image';
import type { Service as BaseService } from './data/serviceData';
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
