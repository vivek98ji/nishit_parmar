import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

export function PromotePlans() {
  const plans = [
    {
      name: 'Basic',
      price: 29,
      period: 'month',
      description: 'Perfect for getting started',
      icon: Check,
      features: [
        'Featured in search results',
        'Basic analytics dashboard',
        '24/7 customer support',
        'Up to 5 active services',
        'Standard service badges'
      ],
      color: 'blue',
      popular: false
    },
    {
      name: 'Professional',
      price: 79,
      period: 'month',
      description: 'Best for growing businesses',
      icon: Star,
      features: [
        'All Basic features',
        'Priority search placement',
        'Advanced analytics',
        'Up to 15 active services',
        'Verified seller badge',
        'Custom service page',
        'Priority customer support'
      ],
      color: 'purple',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 199,
      period: 'month',
      description: 'For large scale operations',
      icon: Zap,
      features: [
        'All Professional features',
        'Top search placement',
        'Real-time analytics',
        'Unlimited active services',
        'Custom branding options',
        'API access',
        'Dedicated account manager',
        'Custom reporting'
      ],
      color: 'green',
      popular: false
    }
  ];

  const getColorClasses = (color: string, isPopular: boolean) => {
    const baseClasses = isPopular ? "border-2" : "border";
    const colorMap: Record<string, { button: string; border: string; icon: string }> = {
      blue: {
        button: "bg-blue-600 hover:bg-blue-700",
        border: `${baseClasses} border-blue-200`,
        icon: "bg-blue-100 text-blue-600",
      },
      purple: {
        button: "bg-purple-600 hover:bg-purple-700",
        border: `${baseClasses} border-purple-200`,
        icon: "bg-purple-100 text-purple-600",
      },
      green: {
        button: "bg-green-600 hover:bg-green-700",
        border: `${baseClasses} border-green-200`,
        icon: "bg-green-100 text-green-600",
      },
    };
  
    return colorMap[color] || colorMap.blue; // Default to 'blue' if color is invalid
  };
  

  return (
    <div className="p-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
          <p className="text-gray-600">Get more visibility and grow your business with our promotion plans</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const colorClasses = getColorClasses(plan.color, plan.popular);
            return (
              <div 
                key={plan.name}
                className={`rounded-lg ${colorClasses.border} p-6 relative hover:shadow-lg transition-shadow`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2">
                    <span className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`${colorClasses.icon} rounded-full p-3 inline-block`}>
                  <plan.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-4">{plan.name}</h3>
                <p className="text-gray-600 mt-2">{plan.description}</p>

                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full mt-8 ${colorClasses.button} text-white rounded-lg py-3 px-4 font-medium transition-colors duration-200`}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 text-gray-600">
          <p>All plans include 14-day free trial. No credit card required.</p>
        </div>
      </div>
    </div>
  );
}

export default PromotePlans;