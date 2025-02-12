import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Define types for service and modal items
interface ServiceItem {
  id: number;
  title: string;
  icon: string;
  category: string;
}

interface ModalItem {
  icon: string;
  title: string;
}

interface ModalContent {
  title: string;
  items: ModalItem[];
}

const HomeServices: React.FC = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const services: ServiceItem[] = [
    { id: 1, title: "Women's Salon & Spa", icon: "/img/icons/womens-salon.png", category: "beauty" },
    { id: 2, title: "Men's Salon & Massage", icon: "/img/icons/mens-salon.png", category: "beauty" },
    { id: 3, title: "AC & Appliance Repair", icon: "/img/icons/ac-repair.png", category: "repair" },
    { id: 4, title: "Cleaning & Pest Control", icon: "/img/icons/cleaning.png", category: "cleaning" },
    { id: 5, title: "Electrician, Plumber & Carpenter", icon: "/img/icons/electrician.png", category: "repair" },
    { id: 6, title: "Native Water Purifier", icon: "/img/icons/water-purifier.png", category: "appliances" },
    { id: 7, title: "Rooms/walls painting", icon: "/img/icons/painting.png", category: "home" },
    { id: 8, title: "Wall Panels", icon: "/img/icons/wall-panels.png", category: "home" }
  ];

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const modalContent: Record<number, ModalContent> = {
    1: {
      title: "Women's Salon & Spa",
      items: [
        { icon: "/img/icons/salon.png", title: "Salon for Women" },
        { icon: "/img/icons/spa.png", title: "Spa for Women" },
        { icon: "/img/icons/hair-studio.png", title: "Hair Studio for Women" },
        { icon: "/img/icons/makeup.png", title: "Makeup & Styling Studio" }
      ]
    },
    2: {
      title: "Men's Salon & Massage",
      items: [
        { icon: "/img/icons/mens-haircut.png", title: "Men's Haircut" },
        { icon: "/img/icons/beard-trim.png", title: "Beard Styling" },
        { icon: "/img/icons/massage.png", title: "Body Massage" },
        { icon: "/img/icons/spa-men.png", title: "Male Grooming" }
      ]
    },
    3: {
      title: "AC & Appliance Repair",
      items: [
        { icon: "/img/icons/ac-service.png", title: "AC Servicing" },
        { icon: "/img/icons/refrigerator.png", title: "Refrigerator Repair" },
        { icon: "/img/icons/washing-machine.png", title: "Washing Machine Repair" },
        { icon: "/img/icons/microwave.png", title: "Microwave Repair" }
      ]
    },
    4: {
      title: "Cleaning & Pest Control",
      items: [
        { icon: "/img/icons/home-cleaning.png", title: "Home Cleaning" },
        { icon: "/img/icons/deep-cleaning.png", title: "Deep Cleaning" },
        { icon: "/img/icons/pest-control.png", title: "Pest Control" },
        { icon: "/img/icons/sanitization.png", title: "Sanitization" }
      ]
    },
    5: {
      title: "Electrician, Plumber & Carpenter",
      items: [
        { icon: "/img/icons/electrical-repair.png", title: "Electrical Repair" },
        { icon: "/img/icons/plumbing.png", title: "Plumbing Services" },
        { icon: "/img/icons/carpentry.png", title: "Carpentry Work" },
        { icon: "/img/icons/installation.png", title: "Installation Services" }
      ]
    }
  };

  interface ServiceModalProps {
    modalId: number;
    onClose: () => void;
  }

  const ServiceModal: React.FC<ServiceModalProps> = ({ modalId, onClose }) => {
    // Add a safety check to handle undefined modalId
    const content = modalContent[modalId];

    if (!content) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p>Service details not found</p>
            <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.3 }} 
          className="bg-white p-6 rounded-lg w-1/3"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{content.title}</h2>
            <button onClick={onClose} className="text-xl font-bold">&times;</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {content.items.map((item, index) => (
              <div key={index} className="text-center">
                <img 
                  src={item.icon} 
                  alt={item.title} 
                  className="w-12 h-12 mx-auto" 
                />
                <p className="text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6  mt-12">
      <div className="flex space-x-24 mt-8">
        <div className='flex flex-col justify-center'>
          <h1 className="text-4xl font-bold mb-8 text-black">Home services at your doorstep</h1>
          <div className="w-4/5 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl text-gray-600 mb-6">What are you looking for?</h2>
            <div className="grid grid-cols-3 gap-4">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setActiveModal(service.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-8 h-8 mb-2 object-contain"
                    />
                    <span className="text-sm">{service.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Showcase Section */}
        <div className="w-3/5 grid grid-cols-2 gap-6">
          <motion.div className="col-span-2 lg:col-span-1 row-span-2" initial="hidden" animate="visible" variants={fadeIn}>
            <img
              src="/img/showcase/service1.jpg"
              alt="Pedicure Service"
              className="w-full h-full rounded-lg object-cover"
            />
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <img
              src="/img/showcase/service2.jpg"
              alt="Massage Service"
              className="w-full h-full rounded-lg object-cover"
            />
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <img
              src="/img/showcase/service3.jpg"
              alt="AC Service"
              className="w-full h-full rounded-lg object-cover"
            />
          </motion.div>
        </div>
      </div>
      
      {activeModal !== null && (
        <ServiceModal 
          modalId={activeModal} 
          onClose={() => setActiveModal(null)} 
        />
      )}
    </div>
  );
};

export default HomeServices;