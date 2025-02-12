import React, { useState, useEffect } from "react";
import { CheckCircle, Clock, MapPin, DollarSign, Calendar, ArrowRight } from "lucide-react";

interface Contract {
  _id: string;
  title: string;
  client: string;
  status: string;
  price: number;
  startDate: string;
  dueDate: string;
  completedDate?: string;
  address: string;
  description: string;
  completed: boolean;
}

export function ContractsSection() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch("/api/booking");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Contracts:", data); // Debugging

        if (data.success && Array.isArray(data.bookings)) {
          setContracts(data.bookings); // Extract bookings array
        } else {
          console.error("Invalid API response format:", data);
          setContracts([]);
        }
      } catch (error) {
        console.error("Error fetching contracts:", error);
        setContracts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const filteredContracts =
    selectedStatus === "all"
      ? contracts
      : contracts.filter((contract) =>
          selectedStatus === "completed" ? contract.completed : !contract.completed
        );

  if (loading) {
    return <div className="p-6 text-center">Loading contracts...</div>;
  }

  return (
    <div className="bg-white rounded-lg">
      {/* Filter Buttons */}
      <div className="flex space-x-4 p-4 border-b">
        {["all", "pending", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg ${
              selectedStatus === status
                ? status === "completed"
                  ? "bg-green-50 text-green-600"
                  : status === "pending"
                  ? "bg-yellow-50 text-yellow-600"
                  : "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {status === "all" ? "All Contracts" : status === "pending" ? "Pending Jobs" : "Completed Jobs"}
          </button>
        ))}
      </div>

      {/* Contract Listings */}
      <div className="divide-y">
        {filteredContracts.map((contract) => (
          <div key={contract._id} className="p-6 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{contract.title}</h3>
                <p className="text-gray-600">{contract.client}</p>
              </div>
              <div className="flex items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    contract.completed ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {contract.completed ? (
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

            {/* Date and Price Info */}
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

            {/* Address */}
            <div className="flex items-start space-x-2 text-gray-600">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>{contract.address}</span>
            </div>

            {/* Description */}
            <p className="mt-2 text-gray-600">{contract.description}</p>

            {/* Completed Date */}
            {contract.completed && contract.completedDate && (
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
