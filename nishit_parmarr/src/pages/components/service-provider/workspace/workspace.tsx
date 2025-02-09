import React from 'react';
import { Edit2, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  thumbnail: string;
  status: string;
  clients: number;
  revenue: number;
  views: number;
  collections: number;
}

export function Workspace() {
  const services: Service[] = [
    {
      id: "1",
      title: "Web Development Services",
      thumbnail: "/service-page/webd.jpg?height=80&width=80",
      status: "Active",
      clients: 16,
      revenue: 11440,
      views: 4400,
      collections: 5
    },
    {
      id: "2",
      title: "Mobile App Development",
      thumbnail: "/service-page/uiux.png?height=80&width=80",
      status: "Maintenance",
      clients: 13,
      revenue: 8611,
      views: 8400,
      collections: 4
    },
    {
      id: "3",
      title: "UI/UX Design Services",
      thumbnail: "/service-page/content.png?height=80&width=80",
      status: "Active",
      clients: 2,
      revenue: 1140,
      views: 2700,
      collections: 1
    }
  ];

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="border-b border-gray-200 mb-6">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-xl font-semibold text-gray-900">Services</h2>
          <div className="flex space-x-4">
            <span className="text-sm text-gray-500">STATE</span>
            <span className="text-sm text-gray-500">CLIENTS</span>
            <span className="text-sm text-gray-500">REVENUE</span>
            <span className="text-sm text-gray-500">VIEWS</span>
            <span className="text-sm text-gray-500">COLLECTIONS</span>
            <span className="w-20"></span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="flex items-center px-4 py-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center flex-1">
              <Image
                src={service.thumbnail}
                alt={service.title}
                width={80}
                height={80}
                className="rounded-lg mr-4"
              />
              <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
            </div>
            
            <div className="flex items-center space-x-16">
              <span className={`px-3 py-1 rounded-full text-sm ${
                service.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {service.status}
              </span>
              <span className="text-sm text-gray-600 w-16 text-center">{service.clients}</span>
              <span className="text-sm text-gray-600 w-20 text-center">${service.revenue.toLocaleString()}</span>
              <span className="text-sm text-gray-600 w-16 text-center">{(service.views / 1000).toFixed(1)}K</span>
              <span className="text-sm text-gray-600 w-16 text-center">{service.collections}</span>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  DETAILS
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Edit2 className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workspace;