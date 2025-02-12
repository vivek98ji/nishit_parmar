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
        <div className="min-h-screen bg-white text-gray-900 p-8">
            <h1 className="text-4xl font-extrabold text-center mb-8 ">
                Service Provider Requests 
            </h1>

            {/* <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> */}
            <div className='grid gap-5 lg-grid-cols-1'>
                {serviceRequests.map((request) => (
                    <div
                        key={request.id}
                        className=" p-6 rounded-xl shadow-lg hover:shadow-lg border transition-shadow"
                    >
                        <h2 className="text-2xl font-bold mb-2">{request.name}</h2>
                        <p className="text-sm text-gray-600">Provider: {request.provider}</p>
                        <p
                            className={`mt-2 text-sm font-semibold ${request.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'
                                }`}
                        >
                            Status: {request.status}
                        </p>
                        <div className="mt-6 flex  justify-center gap-20">
                            <button
                                className="flex-1 py-2 text-sm font-medium text-white bg-black rounded-md  hover:bg-gray-900 transition"
                                onClick={() => handleAccept(request.id)}
                            >
                                Accept
                            </button>
                            <button
                                className="flex-1 py-2 text-sm font-medium text-white bg-gray-800 rounded-md shadow-lg hover:bg-gray-500 transition"
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
