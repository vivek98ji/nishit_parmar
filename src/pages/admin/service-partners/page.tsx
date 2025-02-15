import React, { useEffect, useState } from 'react';

interface ServiceRequest {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    available: boolean;
    providerId: string;
    createdAt: string;
    updatedAt: string;
}

const AdminServiceRequests: React.FC = () => {
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServiceRequests = async () => {
            try {
                const response = await fetch('/api/serviceRequest');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                if (data.success) {
                    setServiceRequests(data.services);
                } else {
                    throw new Error(data.error || 'Unknown error');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchServiceRequests();
    }, []);

    const handleAccept = (id: string): void => {
        alert(`Service request ${id} accepted`);
    };

    const handleDecline = (id: string): void => {
        alert(`Service request ${id} declined`);
    };

    if (loading) return <div className="text-center p-8">Loading...</div>;
    if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-screen bg-white text-gray-900 p-8">
            <h1 className="text-4xl font-extrabold text-center mb-8">
                Service Provider Requests
            </h1>

            <div className="grid gap-5 lg:grid-cols-1">
                {serviceRequests.map((request) => (
                    <div
                        key={request._id}
                        className="p-6 rounded-xl shadow-lg hover:shadow-lg border transition-shadow"
                    >
                        <h2 className="text-2xl font-bold mb-2">{request.name}</h2>
                        <p className="text-sm text-gray-600">Provider ID: {request.providerId}</p>
                        <p className="text-sm text-gray-600">Category: {request.category}</p>
                        <p
                            className={`mt-2 text-sm font-semibold ${
                                request.available ? 'text-green-500' : 'text-red-500'
                            }`}
                        >
                            Status: {request.available ? 'Available' : 'Unavailable'}
                        </p>
                        <div className="mt-6 flex justify-center gap-20">
                            <button
                                className="flex-1 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 transition"
                                onClick={() => handleAccept(request._id)}
                            >
                                Accept
                            </button>
                            <button
                                className="flex-1 py-2 text-sm font-medium text-white bg-gray-800 rounded-md shadow-lg hover:bg-gray-500 transition"
                                onClick={() => handleDecline(request._id)}
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminServiceRequests;