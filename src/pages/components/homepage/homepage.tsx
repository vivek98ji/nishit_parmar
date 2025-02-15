"use client"
import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { FaSearch } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SearchBar from '../common/SearchBar';
import ProductData from '../../../data/ProductData';
import { useRouter } from 'next/navigation';

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

type MotionDivProps = HTMLMotionProps<"div">;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
} as const;

// Add these testimonials data near the top with other interfaces
const testimonials = [
  { id: 1, text: "Excellent service! Very professional team.", author: "Sarah M." },
  { id: 2, text: "Best home service I've ever experienced!", author: "John D." },
  { id: 3, text: "Quick response and great work quality.", author: "Michael R." },
  { id: 4, text: "Very reliable and trustworthy service.", author: "Emma W." },
  { id: 5, text: "Highly recommend their cleaning service!", author: "David L." },
  { id: 6, text: "Outstanding customer service!", author: "Lisa P." },
];

const HomeServices: React.FC = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const router = useRouter();

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

  // Filter services from ProductData
  const filteredProducts = searchQuery ? ProductData.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  // Filter local services
  const filteredServicesLocal = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchFocus = () => {
    setShowSearchResults(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSearchResults(false), 200);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = services.filter((service) =>
      service.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleProductClick = (productId: number) => {
    setShowSearchResults(false); // Hide search results
    setSearchQuery(''); // Clear search query
    router.push(`/components/Product/${productId}/page`); // Updated path to match your file structure
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
          style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', width: '33.333333%' }}
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

  // Add this CSS to create the continuous scrolling animation
  const marqueeStyles = `
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;

  return (
    <div className="max-w-7xl mx-auto p-6 mt-12">
      {/* Search Section */}
      <div className="mb-8 relative">
        <div className="max-w-2xl mx-auto">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={handleSearch}
            placeholder="Search for home services..."
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && searchQuery && (
          <div className="absolute w-full bg-white mt-3 rounded-2xl shadow-2xl z-50 max-h-[70vh] overflow-y-auto
                        border border-gray-100 backdrop-blur-sm backdrop-filter
                        transition-all duration-300 ease-in-out">
            {filteredProducts.length > 0 ? (
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-4 px-2">Available Services</h3>
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer rounded-xl
                                transition-all duration-200 ease-in-out group"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden group-hover:shadow-md
                                    transition-all duration-200">
                        <img 
                          src={product.imageUrl} 
                          alt={product.title}
                          className="w-full h-full object-cover transform group-hover:scale-105
                                   transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-gray-900 group-hover:text-black">{product.title}</h4>
                        <p className="text-sm text-gray-500">₹{product.discountedPrice}</p>
                      </div>
                      <span className="text-sm text-blue-600 group-hover:text-blue-700 font-medium
                                    opacity-0 group-hover:opacity-100 transform translate-x-2 
                                    group-hover:translate-x-0 transition-all duration-200">
                        View Details →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <FaSearch className="w-6 h-6 mx-auto mb-3 text-gray-300" />
                <p className="text-lg">No services found matching your search</p>
                <p className="text-sm text-gray-400 mt-1">Try searching with different keywords</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex space-x-24 mt-8">
        <div className='flex flex-col justify-center'>
          <h1 className="text-4xl font-bold mb-8 text-black">Home services at your doorstep</h1>
          <div className="w-4/5 bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-black">
            <h2 className="text-xl text-gray-100 mb-6">What are you looking for?</h2>
            <div className="grid grid-cols-3 gap-4">
              {filteredServicesLocal.map((service) => (
                <div
                  key={service.id}
                  className="bg-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
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
              {filteredServicesLocal.length === 0 && (
                <div className="col-span-3 text-center py-4">
                  <p className="text-gray-500">No services found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Showcase Section */}
        <div className="w-3/5 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <img
                src="/img/showcase/service1.jpg"
                alt="Pedicure Service"
                className="w-full h-[200px] rounded-lg object-cover"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <img
                src="/img/showcase/service2.jpg"
                alt="Massage Service"
                className="w-full h-[200px] rounded-lg object-cover"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <img
                src="/img/showcase/service3.jpg"
                alt="AC Service"
                className="w-full h-[200px] rounded-lg object-cover"
              />
            </motion.div>
          </div>
          
          {/* Single image in second column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            // className="h-full"
          >
            <img
              src="/img/showcase/service4.jpg"
              alt="Massage Service"
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

      {/* Popular Services Carousel */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">Popular Services</h2>
        <Carousel responsive={responsive} infinite autoPlay arrows={false}>
          {[
            { title: "Cleaning", desc: "Top-rated professionals available.", img: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734719804317-washing_machine_1702277226059_1702277226265.webp" },
            {
              title: "Plumbing", desc: "Expert plumbers at your service.",
              img: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734724488179-65ce57f83f48efe3c9ba6b20_AoIz5KCqLw88GZDa3lkcEH1mTa5tZEnYPaibiYi-Ur70UUVHzLg-y9b-8G67fZ53pov8cGxVNyCpImxyFoH5PpHbmabxUQaxbs4cYsPXXu9u00pIhjwzUhzdU-WyZC4jEp1J0WsA_djRYO47GeEjlXM.jpeg"
            },
            {
              title: "Electrical", desc: "Licensed electricians available.", img:
                "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734721775540-1_4gthwYkzwqGIBjRkYKBlCQ.webp"
            },
            {
              title: "Painting", desc: "Give your home a fresh look.",
              img: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734723540812-store_01JCYZKF09EKDA2HS3ZXYAX2G1_assets_1732002352724-AC_Repair_Cost_279259535-1.webp"
            },
            {
              title: "Pest Control", desc: "Keep your home pest-free.",
              img: "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=574,h=322,fit=crop,q=100/cdn-ecommerce/store_01JCYZKF09EKDA2HS3ZXYAX2G1%2Fassets%2F1734722591691-store_01JCYZKF09EKDA2HS3ZXYAX2G1_assets_1733056243258-1000s.webp"
            },
          ].map((service, index) => (
            <div key={index} className="p-6 bg-gray-200 shadow rounded-lg text-center mx-3">
              <img src={service.img} alt={service.title} className="w-[600px] h-[400px]object-cover rounded-lg mx-auto" />
              <h3 className="text-xl font-bold mt-4">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.desc}</p>
            </div>
          ))}
        </Carousel>
      </section>

      {/* steps */}
      <section className="py-16 text-center bg-gray-200">
        <h2 className="text-4xl font-bold mb-10 text-primary">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { step: "1", title: "Search", desc: "Find the service you need." },
            { step: "2", title: "Select", desc: "Choose from verified professionals." },
            { step: "3", title: "Book", desc: "Schedule at your convenience." },
            { step: "4", title: "Enjoy", desc: "Relax while we handle the rest!" },
          ].map(({ step, title, desc }) => (
            <div key={step} className="p-8 bg-white shadow-lg rounded-xl flex flex-col items-center">
              <FaCheckCircle className="text-black text-4xl mb-4" />
              <h3 className="text-2xl font-bold">Step {step}: {title}</h3>
              <p className="text-gray-600 mt-3 text-lg">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="mt-16 overflow-hidden bg-gray-200 py-10">
        <style>{marqueeStyles}</style>
        <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex space-x-8 whitespace-nowrap"
            style={{
              animation: 'scroll 30s linear infinite',
              display: 'flex',
              width: 'fit-content'
            }}
          >
            {/* Double the testimonials for seamless loop */}
            {[...testimonials, ...testimonials].map((review, index) => (
              <div
                key={index}
                className="w-[350px] inline-flex flex-none flex-col rounded-lg bg-black p-6 shadow-lg mx-4"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl" />
                  ))}
                </div>
                <p className="text-white italic mb-4">"{review.text}"</p>
                <p className="text-white font-semibold">- {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeServices;