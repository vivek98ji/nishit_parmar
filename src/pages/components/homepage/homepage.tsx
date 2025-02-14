import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaStar, FaCheckCircle } from "react-icons/fa";

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

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

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

  // Add search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = services.filter(service => 
      service.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const modalContent: Record<number, ModalContent> = {
    1: {
      title: "Women's Salon & Spa",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/8028/8028145.png", 
          title: "Hair Styling" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3685/3685633.png", 
          title: "Facial & Cleanup" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/9397/9397090.png", 
          title: "Waxing" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/1005/1005768.png", 
          title: "Manicure & Pedicure" 
        }
      ]
    },
    2: {
      title: "Men's Salon & Massage",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/4867/4867608.png", 
          title: "Haircut & Styling" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/7640/7640931.png", 
          title: "Beard Trim & Shape" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/5262/5262327.png", 
          title: "Body Massage" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3531/3531990.png", 
          title: "Face Care" 
        }
      ]
    },
    3: {
      title: "AC & Appliance Repair",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/9457/9457452.png", 
          title: "AC Service & Repair" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2272/2272219.png", 
          title: "Refrigerator Repair" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2503/2503513.png", 
          title: "Washing Machine" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/8002/8002163.png", 
          title: "Microwave Repair" 
        }
      ]
    },
    4: {
      title: "Cleaning & Pest Control",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2865/2865775.png", 
          title: "Home Deep Cleaning" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/995/995053.png", 
          title: "Bathroom Cleaning" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/8342/8342542.png", 
          title: "Pest Control" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2927/2927347.png", 
          title: "Sanitization" 
        }
      ]
    },
    5: {
      title: "Electrician, Plumber & Carpenter",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/1983/1983275.png", 
          title: "Electrical Work" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/4635/4635163.png", 
          title: "Plumbing Services" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2829/2829964.png", 
          title: "Carpentry Work" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/4544/4544322.png", 
          title: "Installation" 
        }
      ]
    },
    6: {
      title: "Water Purifier",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/4147/4147164.png", 
          title: "Installation" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/4147/4147126.png", 
          title: "Repair" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/4147/4147176.png", 
          title: "Service" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/4147/4147138.png", 
          title: "Filter Change" 
        }
      ]
    },
    7: {
      title: "Painting Services",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/3095/3095221.png", 
          title: "Wall Painting" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2913/2913136.png", 
          title: "Texture Painting" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/4880/4880636.png", 
          title: "Waterproofing" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/1048/1048947.png", 
          title: "Wood Painting" 
        }
      ]
    },
    8: {
      title: "Wall Panels",
      items: [
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/8068/8068項.png", 
          title: "PVC Panels" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/2432/2432592.png", 
          title: "Wooden Panels" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/5229/5229380.png", 
          title: "3D Panels" 
        },
        { 
          icon: "https://cdn-icons-png.flaticon.com/512/4356/4356011.png", 
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
    <div className="max-w-7xl mx-auto p-6 mt-12">
      {/* Add search bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for services..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-4 pl-12 rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="flex space-x-24 mt-8">
        <div className='flex flex-col justify-center'>
          <h1 className="text-4xl font-bold mb-8 text-black">Home services at your doorstep</h1>
          <div className="w-4/5 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl text-gray-600 mb-6">What are you looking for?</h2>
            <div className="grid grid-cols-3 gap-4">
              {filteredServices.map((service) => (
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

      {/* Keep your existing Popular Services Carousel */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">Popular Services</h2>
        {/* <Carousel responsive={responsive} infinite autoPlay arrows={false}> */}
          {/* Your carousel items */}
        {/* </Carousel> */}
      </section>

      {/* Keep your existing How It Works section */}
      <section className="py-16 text-center bg-gray-100">
        {/* ... your existing steps section ... */}
      </section>

      {/* Keep your existing Testimonials section */}
      <div className="mt-16 bg-gray-50 p-10 rounded-lg shadow-lg text-center">
        {/* ... your existing testimonials code ... */}
      </div>

      {/* Add a CTA section */}
      <section className="py-16 text-center bg-black text-white mt-16 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-8">Book your service today and experience the difference!</p>
        <button className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
          Book Now
        </button>
      </section>
    </div>
  );
};

export default HomeServices;