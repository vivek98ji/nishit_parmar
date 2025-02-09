import React from 'react';

interface ServiceRequest {
    id: number;
    name: string;
    provider: string;
    status: string;
}

const AdminServiceRequests: React.FC = () => {
    const serviceRequests: ServiceRequest[] = [
        { id: 1, name: 'Plumbing Service', provider: 'John Doe', status: 'Pending' },
        { id: 2, name: 'Electrical Repair', provider: 'Jane Smith', status: 'Pending' },
    ];

    const handleAccept = (id: number): void => {
        alert(`Service request ${id} accepted`);
    };

    const handleDecline = (id: number): void => {
        alert(`Service request ${id} declined`);
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl font-extrabold text-white mb-8 text-center uppercase tracking-wide">
                Service Provider Requests
            </h1>

            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {serviceRequests.map((request) => (
                    <div
                        key={request.id}
                        className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-700 transition-transform transform hover:scale-105"
                    >
                        <h2 className="text-2xl font-bold mb-2 text-gray-100">{request.name}</h2>
                        <p className="text-gray-400">Provider: {request.provider}</p>
                        <p
                            className={`mt-2 text-sm ${request.status === 'Pending' ? 'text-yellow-400' : 'text-green-400'
                                }`}
                        >
                            Status: {request.status}
                        </p>
                        <div className="mt-6 flex gap-4">
                            <button
                                className="flex-1 py-2 text-sm font-semibold text-black bg-white rounded-xl hover:bg-gray-300 transition"
                                onClick={() => handleAccept(request.id)}
                            >
                                Accept
                            </button>
                            <button
                                className="flex-1 py-2 text-sm font-semibold border border-white text-white rounded-xl hover:bg-white hover:text-black transition"
                                onClick={() => handleDecline(request.id)}
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
