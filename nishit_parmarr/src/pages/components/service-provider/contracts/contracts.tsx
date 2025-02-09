import React, { useState } from 'react';
import { CheckCircle, Clock, MapPin, DollarSign, Calendar, ArrowRight } from 'lucide-react';

export function ContractsSection() {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const contracts = [
    {
      id: 'JOB-2024-001',
      title: 'E-commerce Website Development',
      client: 'Tech Solutions Ltd',
      status: 'pending',
      price: 2500,
      startDate: '2024-02-15',
      dueDate: '2024-03-15',
      address: '123 Business Park, Tech Valley, CA 94025',
      description: 'Full e-commerce website with payment integration'
    },
    {
      id: 'JOB-2024-002',
      title: 'Mobile App UI Design',
      client: 'StartUp Innovations',
      status: 'completed',
      price: 1800,
      startDate: '2024-01-10',
      dueDate: '2024-02-01',
      completedDate: '2024-01-30',
      address: '456 Startup Hub, Innovation District, NY 10012',
      description: 'Complete UI design for iOS and Android app'
    },
    {
      id: 'JOB-2024-003',
      title: 'SEO Optimization Project',
      client: 'Digital Marketing Pro',
      status: 'pending',
      price: 1200,
      startDate: '2024-02-20',
      dueDate: '2024-03-10',
      address: '789 Digital Avenue, Marketing Hub, TX 75001',
      description: 'Full website SEO optimization and strategy'
    },
    {
      id: 'JOB-2024-004',
      title: 'Brand Identity Design',
      client: 'New Ventures Inc',
      status: 'completed',
      price: 3000,
      startDate: '2024-01-05',
      dueDate: '2024-02-05',
      completedDate: '2024-02-03',
      address: '321 Creative Street, Design District, FL 33127',
      description: 'Complete brand identity including logo and guidelines'
    }
  ];

  const filteredContracts = selectedStatus === 'all' 
    ? contracts 
    : contracts.filter(contract => contract.status === selectedStatus);

  return (
    <div className="bg-white rounded-lg">
      {/* Status Filters */}
      <div className="flex space-x-4 p-4 border-b">
        <button 
          onClick={() => setSelectedStatus('all')}
          className={`px-4 py-2 rounded-lg ${
            selectedStatus === 'all' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          All Contracts
        </button>
        <button 
          onClick={() => setSelectedStatus('pending')}
          className={`px-4 py-2 rounded-lg ${
            selectedStatus === 'pending' 
              ? 'bg-yellow-50 text-yellow-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Pending Jobs
        </button>
        <button 
          onClick={() => setSelectedStatus('completed')}
          className={`px-4 py-2 rounded-lg ${
            selectedStatus === 'completed' 
              ? 'bg-green-50 text-green-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Completed Jobs
        </button>
      </div>

      {/* Contracts List */}
      <div className="divide-y">
        {filteredContracts.map((contract) => (
          <div key={contract.id} className="p-6 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{contract.title}</h3>
                <p className="text-gray-600">{contract.client}</p>
              </div>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  contract.status === 'completed' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {contract.status === 'completed' ? (
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Completed
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Pending
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {new Date(contract.startDate).toLocaleDateString()} 
                  <ArrowRight className="w-4 h-4 mx-2 inline" />
                  {new Date(contract.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                <span>${contract.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-gray-600">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>{contract.address}</span>
            </div>

            <p className="mt-2 text-gray-600">{contract.description}</p>

            {contract.status === 'completed' && contract.completedDate && (
              <div className="mt-2 text-sm text-green-600">
                Completed on: {new Date(contract.completedDate).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContractsSection;