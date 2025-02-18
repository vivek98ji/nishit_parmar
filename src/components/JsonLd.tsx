interface JsonLdProps {
  data: Record<string, any>;
}

const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default JsonLd;

// Usage example in a service page:
const ServicePage = () => {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Home Cleaning Service',
    description: 'Professional home cleaning services',
    provider: {
      '@type': 'Organization',
      name: 'Your Brand Name',
    },
    // Add more structured data
  };

  return (
    <>
      <JsonLd data={serviceData} />
      {/* Page content */}
    </>
  );
}; 