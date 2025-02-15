'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminLayout from '@/pages/components/admin/AdminLayout';

interface Service {
    id: string;
    title: string;
    description: string;
    image: string;
    longDescription: string;
}

interface ApiService extends Omit<Service, 'id'> {
    _id: string;
    name: string;  // Changed from title to name
    description: string;
    image: string;
    longDescription: string;
    price: string;
    category: string; // Add category field
}

export default function ManageServices() {
    const [services, setServices] = useState<ApiService[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<ApiService | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',        // Changed from title to name
        description: '',
        image: '',
        price: '',
        longDescription: '',
        category: '' // Add category field
    });

    const handleOpenAddModal = () => {
        setFormData({
            name: '',    // Changed from title to name
            description: '',
            image: '',
            price: '',
            longDescription: '',
            category: '' // Add category field
        });
        setIsAddModalOpen(true);
    };

    // Fetch services
    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/services');
            const data = await response.json();
            if (data.success) {
                setServices(data.services);
            } else {
                setError('Failed to fetch services');
            }
        } catch (err) {
            setError('Error fetching services');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddService = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Adding service with data:', formData); // Log form data

        try {
            const response = await fetch('/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log('Response from server:', data); // Log server response

            if (data.success) {
                setServices([...services, data.service]);
                setIsAddModalOpen(false);
                setFormData({
                    name: '',
                    description: '',
                    image: '',
                    price: '',
                    longDescription: '',
                    category: '' // Reset category field
                });
            } else {
                setError(data.message || 'Error adding service');
            }
        } catch (err) {
            console.error('Error adding service:', err);
            setError('Error adding service');
        }
    };

    const handleEditService = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedService) return;

        try {
            const response = await fetch(`/api/services/${selectedService._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                setServices(services.map(service =>
                    service._id === selectedService._id ? data.service : service
                ));
                setIsEditModalOpen(false);
                setSelectedService(null);
            }
        } catch (err) {
            setError('Error updating service');
        }
    };

    const handleDeleteService = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
    
        try {
            const response = await fetch(`/api/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            
            // Add logging to debug
            console.log('Delete response:', data);
            
            if (data.success) {
                setServices(services.filter(service => service._id !== id));
            } else {
                // Handle error case
                setError(data.message || 'Error deleting service');
            }
        } catch (err) {
            console.error('Delete error:', err);
            setError('Error deleting service');
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

    // Rest of your JSX remains the same, just update the service.id references to service._id
    // ... (keep all the existing JSX for the table and modals)
    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
                        <button
                            onClick={handleOpenAddModal}
                            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Add New Service
                        </button>
                    </div>

                    {/* Services List */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {services.map((service) => (
                                    <tr key={service._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="relative w-20 h-20">
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{service.name}</td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-xs truncate">{service.description}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{service.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {/* <button
                                                onClick={() => {
                                                    setSelectedService(service);
                                                    setFormData(service);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4 "
                                            >
                                                Edit
                                            </button> */}
                                            <button
                                                onClick={() => {
                                                    setSelectedService(service);
                                                    setFormData(service);
                                                    setIsEditModalOpen(true);
                                                }}
                                                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors mr-[20px]"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteService(service._id)}
                                                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Service Modal */}
                    {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
                <form onSubmit={handleAddService}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                rows={3}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Add Service
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )}

                    {/* Edit Service Modal */}
                    {isEditModalOpen && selectedService && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                                <h2 className="text-2xl font-bold mb-4">Edit Service</h2>
                                <form onSubmit={handleEditService}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                rows={3}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                            <input
                                                type="text"
                                                name="image"
                                                value={formData.image}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Price</label>
                                            <input
                                                type="text"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditModalOpen(false)}
                                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}