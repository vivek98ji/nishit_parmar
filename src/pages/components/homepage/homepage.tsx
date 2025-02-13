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
    { 
      id: 1, 
      title: "Women's Salon & Spa", 
      icon: "https://cdn-icons-png.flaticon.com/512/1940/1940922.png", 
      category: "beauty" 
    },
    { 
      id: 2, 
      title: "Men's Salon & Massage", 
      icon: "https://cdn-icons-png.flaticon.com/512/2377/2377322.png", 
      category: "beauty" 
    },
    { 
      id: 3, 
      title: "AC & Appliance Repair", 
      icon: "https://cdn-icons-png.flaticon.com/512/3069/3069674.png", 
      category: "repair" 
    },
    { 
      id: 4, 
      title: "Cleaning & Pest Control", 
      icon: "https://cdn-icons-png.flaticon.com/512/2970/2970975.png", 
      category: "cleaning" 
    },
    { 
      id: 5, 
      title: "Electrician, Plumber & Carpenter", 
      icon: "https://cdn-icons-png.flaticon.com/512/4264/4264901.png", 
      category: "repair" 
    },
    { 
      id: 6, 
      title: "Native Water Purifier", 
      icon: "https://cdn-icons-png.flaticon.com/512/1175/1175277.png", 
      category: "appliances" 
    },
    { 
      id: 7, 
      title: "Rooms/walls painting", 
      icon: "https://cdn-icons-png.flaticon.com/512/1048/1048947.png", 
      category: "home" 
    },
    { 
      id: 8, 
      title: "Wall Panels", 
      icon: "https://cdn-icons-png.flaticon.com/512/3079/3079162.png", 
      category: "home" 
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const modalContent: Record<number, ModalContent> = {
    1: {
      title: "Women's Salon & Spa",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3055/3055897.png", 
          title: "Hair Styling" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2454/2454322.png", 
          title: "Facial & Cleanup" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/1940/1940911.png", 
          title: "Waxing" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3163/3163198.png", 
          title: "Manicure & Pedicure" 
        }
      ]
    },
    2: {
      title: "Men's Salon & Massage",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3532/3532033.png", 
          title: "Haircut & Styling" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/1087/1087188.png", 
          title: "Beard Trim & Shape" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2318/2318536.png", 
          title: "Body Massage" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/1807/1807578.png", 
          title: "Face Care" 
        }
      ]
    },
    3: {
      title: "AC & Appliance Repair",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3069/3069712.png", 
          title: "AC Service & Repair" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2943/2943407.png", 
          title: "Refrigerator Repair" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2386/2386855.png", 
          title: "Washing Machine" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/5741/5741326.png", 
          title: "Microwave Repair" 
        }
      ]
    },
    4: {
      title: "Cleaning & Pest Control",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/1940/1940877.png", 
          title: "Home Deep Cleaning" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2970/2970975.png", 
          title: "Bathroom Cleaning" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3343/3343641.png", 
          title: "Pest Control" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2452/2452227.png", 
          title: "Sanitization" 
        }
      ]
    },
    5: {
      title: "Electrician, Plumber & Carpenter",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/4264/4264901.png", 
          title: "Electrical Work" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/4635/4635163.png", 
          title: "Plumbing Services" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/1995/1995470.png", 
          title: "Carpentry Work" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3079/3079162.png", 
          title: "Installation" 
        }
      ]
    },
    6: {
      title: "Water Purifier",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3105/3105807.png", 
          title: "Installation" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/4147/4147126.png", 
          title: "Repair" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/1175/1175277.png", 
          title: "Service" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3002/3002772.png", 
          title: "Filter Change" 
        }
      ]
    },
    7: {
      title: "Painting Services",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/1048/1048947.png", 
          title: "Wall Painting" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3729/3729163.png", 
          title: "Texture Painting" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2091/2091665.png", 
          title: "Waterproofing" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2891/2891491.png", 
          title: "Wood Painting" 
        }
      ]
    },
    8: {
      title: "Wall Panels",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3079/3079136.png", 
          title: "PVC Panels" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/5661/5661731.png", 
          title: "Wooden Panels" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3659/3659899.png", 
          title: "3D Panels" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3137/3137197.png", 
          title: "Acoustic Panels" 
        }
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