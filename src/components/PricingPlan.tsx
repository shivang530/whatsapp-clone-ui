import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface PlanFeature {
  text: string;
  available: boolean;
}

interface PricingTier {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PlanFeature[];
  tag?: string;
  minUsers?: number;
  buttonText: string;
  isCurrentPlan?: boolean;
  billedAmount: number;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free Plan',
    monthlyPrice: 0.00,
    yearlyPrice: 0.00,
    billedAmount: 0,
    buttonText: 'Current Plan',
    isCurrentPlan: true,
    features: [
      { text: 'Upto 10 queries per day', available: true },
      { text: '10 queries for files based generations', available: true },
      { text: 'Add any datasource', available: true },
    ],
  },
  {
    name: 'Plus Plan',
    monthlyPrice: 39.99,
    yearlyPrice: 39.99,
    billedAmount: 20,
    buttonText: 'Choose Plan',
    tag: 'Most Popular',
    features: [
      { text: 'Unlimited queries', available: true },
      { text: 'Unlimited times files based generations', available: true },
      { text: 'Add any datasource', available: true },
    ],
  },
  {
    name: 'Enterprise Plan',
    monthlyPrice: 143.99,
    yearlyPrice: 143.99,
    billedAmount: 75,
    buttonText: 'Choose Plan',
    minUsers: 5,
    features: [
      { text: 'Unlimited queries', available: true },
      { text: 'Unlimited times files based generations', available: true },
      { text: 'Add any datasource', available: true },
    ],
  },
];

export const PricingPlan: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Uncover the best of <span className="text-teal-600">XAiLES</span>
        </h2>
        <p className="text-gray-600">
          Flexible Plans Designed to Drive Your Business Forward.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md bg-gray-100 p-0.5">
          <button
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              !isYearly
                ? 'bg-teal-600 text-white'
                : 'text-gray-700'
            }`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center ${
              isYearly
                ? 'bg-teal-600 text-white'
                : 'text-gray-700'
            }`}
            onClick={() => setIsYearly(true)}
          >
            Yearly
            <span className="ml-1.5 text-[10px] bg-pink-500 text-white px-1.5 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`bg-white rounded-lg shadow-md overflow-hidden ${
              tier.tag ? 'border border-teal-600' : ''
            }`}
          >
            {tier.tag && (
              <div className="bg-teal-600 text-white text-xs py-1 text-center">
                {tier.tag}
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{tier.name}</h3>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-sm text-gray-600 mr-1">USD</span>
                  <span className="text-3xl font-bold text-gray-900">
                    {tier.monthlyPrice.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {tier.minUsers 
                    ? `for ${tier.minUsers} users/month` 
                    : 'per user/month'}
                </div>
                <div className="text-sm text-gray-400">
                  billed as USD {tier.billedAmount}
                </div>
              </div>

              <button
                className={`w-full py-2 px-4 rounded text-sm font-medium mb-6 ${
                  tier.isCurrentPlan
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
                disabled={tier.isCurrentPlan}
              >
                {tier.buttonText}
              </button>

              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <Check className="h-4 w-4 text-teal-600 mr-2 flex-shrink-0" />
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};