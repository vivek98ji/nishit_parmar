import React, { useEffect, useState } from 'react';
import { Edit2, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  providerId: string;
  thumbnail?: string; // Optional field
  clients?: number; // Optional field
  views?: number; // Optional field
  collections?: number; // Optional field
}

export function Workspace() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to fetch services");
        }

        // Set all services without filtering
        setServices(data.bookings || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch services");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center px-4 py-3 hover:bg-gray-50 rounded-lg">
              <div className="w-20 h-20 bg-gray-200 rounded-lg mr-4" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

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
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className="flex items-center px-4 py-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center flex-1">
                <Image
                  src={service.thumbnail || "/service-page/webd.jpg?height=80&width=80"} // Default thumbnail if not provided
                  alt={service.name}
                  width={80}
                  height={80}
                  className="rounded-lg mr-4"
                />
                <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
              </div>
              
              <div className="flex items-center space-x-16">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  service.available ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {service.available ? 'Active' : 'Inactive'}
                </span>
                <span className="text-sm text-gray-600 w-16 text-center">
                  {service.clients || 0} {/* Default to 0 if clients is not provided */}
                </span>
                <span className="text-sm text-gray-600 w-20 text-center">
                  ${service.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 w-16 text-center">
                  {(service.views || 100).toLocaleString()} {/* Default to 100 if views is not provided */}
                </span>
                <span className="text-sm text-gray-600 w-16 text-center">
                  {service.collections || 0} {/* Default to 0 if collections is not provided */}
                </span>
                
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
          ))
        ) : (
          <div className="text-center text-gray-500">No services found.</div>
        )}
      </div>
    </div>
  );
}

export default Workspace;