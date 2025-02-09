'use client';

import { useState } from 'react';
import { services as initialServices } from '../data/serviceData';
import Image from 'next/image';
import type { Service as BaseService } from '../data/serviceData';

interface Service extends BaseService {
    price: string;
}

export default function ManageServices() {
    // Replace services with local state
    const [services, setServices] = useState(initialServices.map(service => ({
        ...service,
        price: '$0.00'
    })));
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        image: '',
        price: '',
        longDescription: ''
    });

    // Reset form data when opening add modal
    const handleOpenAddModal = () => {
        setFormData({
            id: '',
            title: '',
            description: '',
            image: '',
            price: '',
            longDescription: ''
        });
        setIsAddModalOpen(true);
    };

    const handleAddService = (e: React.FormEvent) => {
        e.preventDefault();

        // Create new service with unique ID
        const newService = {
            ...formData,
            id: Date.now().toString(), // Generate unique ID
        };

        // Add to services array
        setServices([...services, newService]);
        setIsAddModalOpen(false);
    };

    const handleEditService = (e: React.FormEvent) => {
        e.preventDefault();

        // Update services array with edited service
        setServices(services.map(service =>
            service.id === formData.id ? { ...formData, price: formData.price || "$0.00" } : service
        ));


        setIsEditModalOpen(false);
        setSelectedService(null);
    };

    const handleDeleteService = (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            // Filter out the deleted service
            setServices(services.filter(service => service.id !== id));
        }
    };

    // Add form input handler
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
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
                                <tr key={service.id}>
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
                                    <td className="px-6 py-4 whitespace-nowrap">{service.title}</td>
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
                                            onClick={() => handleDeleteService(service.id)}
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
                                            name="title"
                                            value={formData.title}
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
                                            value={formData.title}
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
    );
} 