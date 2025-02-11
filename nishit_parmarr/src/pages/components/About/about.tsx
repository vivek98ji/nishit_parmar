import React from 'react';
// app.use(express.static('public'));


const About = () => {
  return (
    <div className="bg-white">
      {/* Header Section */}
      

      {/* Flex Container for Text and Images */}
      <div className="flex flex-col md:flex-row p-4">
      <div className="flex flex-col items-center  pt-10">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-xl text-center max-w-2xl">
          HelperBuddy offers professional house, office, and AC cleaning services across India, delivering top-quality, eco-friendly solutions tailored to your needs. Our trusted team ensures your spaces are spotless, fresh, and well-maintained.
        </p>
        <button className="mt-4  bg-black text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none ">
          Learn More
        </button>
      
        {/* About Text Section */}
        
          <h2 className="text-4xl font-bold mb-4  items-center pt-6 pb-3">Our Commitment</h2>
          <p className="text-lg text-center max-w-2xl )">
            We are dedicated to providing the best cleaning services tailored to your needs. Our team is trained to ensure your satisfaction.Our trusted team ensures your spaces are spotless, fresh, and well-maintained.
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4 p-4">
          <img src="/logo.png" alt="Service 1" className="w-full h-56 rounded-lg" />
          <img src="/img/showcase/service1.jpg" alt="Service 1" className="w-full h-auto rounded-lg" />
          <img src="/img/showcase/service2.jpg" alt="Service 2" className="w-full h-auto rounded-lg" />
          <img src="/img/showcase/service3.jpg" alt="Service 3" className="w-full h-auto rounded-lg" />
          {/* <img src="/img/showcase/service4.jpg" alt="Service 4" className="w-auto h-56 rounded-lg" /> */}
        </div>
      </div>

      {/* Logo Section */}
      
    </div>
  );
};

export default About;
