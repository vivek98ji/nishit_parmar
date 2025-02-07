import React from 'react';

const HomeServices = () => {
  const services = [
    {
      id: 1,
      title: "Women's Salon & Spa",
      icon: "/img/icons/womens-salon.png",
      category: "beauty"
    },
    {
      id: 2,
      title: "Men's Salon & Massage",
      icon: "/img/icons/mens-salon.png",
      category: "beauty"
    },
    {
      id: 3,
      title: "AC & Appliance Repair",
      icon: "/img/icons/ac-repair.png",
      category: "repair"
    },
    {
      id: 4,
      title: "Cleaning & Pest Control",
      icon: "/img/icons/cleaning.png",
      category: "cleaning"
    },
    {
      id: 5,
      title: "Electrician, Plumber & Carpenter",
      icon: "/img/icons/electrician.png",
      category: "repair"
    },
    {
      id: 6,
      title: "Native Water Purifier",
      icon: "/img/icons/water-purifier.png",
      category: "appliances"
    },
    {
      id: 7,
      title: "Rooms/walls painting",
      icon: "/img/icons/painting.png",
      category: "home"
    },
    {
      id: 8,
      title: "Wall Panels",
      icon: "/img/icons/wall-panels.png",
      category: "home"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 mt-12">
      <h1 className="text-4xl font-bold mb-8 text-black">Home services at your doorstep</h1>
      
      <div className="flex space-x-20 mt-8">
        {/* Services Section */}
        <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl text-gray-600 mb-6">What are you looking for?</h2>
          
          <div className="grid grid-cols-3 gap-4">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-12 h-12 mb-2 object-contain"
                  />
                  <span className="text-sm">{service.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Showcase Section */}
        <div className="w-1/2 grid grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1 row-span-2">
            <img
              src="/img/showcase/service1.jpg"
              alt="Pedicure Service"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
          <div>
            <img
              src="/img/showcase/service2.jpg"
              alt="Massage Service"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
          <div>
            <img
              src="/img/showcase/service3.jpg"
              alt="AC Service"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HomeServices;