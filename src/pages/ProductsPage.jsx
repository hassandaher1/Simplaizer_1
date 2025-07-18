import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Wrench, Crown } from 'lucide-react';

const ProductsPage = ({ products = [], onOpenChat }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      price: { monthly: '37', annually: '370' },
      description: 'Perfect for small businesses starting with AI automation.',
      features: [
        'Basic workflow automation',
        'AI-powered personal assistant',
        'Standard analytics & reporting',
        'Email & chat support',
        'Up to 3 AI integrations',
      ],
      icon: <Wrench className="w-5 h-5 mr-2" />,
      button: 'Choose this plan',
    },
    {
      name: 'Professional',
      price: { monthly: '75', annually: '750' },
      description: 'Perfect for small businesses starting with AI automation.',
      features: [
        'Advanced workflow automation',
        'AI-driven sales & marketing tools',
        'Enhanced data analytics & insights',
        'Priority customer support',
        'Up to 10 AI integrations',
      ],
      icon: <Zap className="w-5 h-5 mr-2" />,
      button: 'Choose this plan',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: { monthly: 'Custom', annually: 'Custom' },
      description: 'Perfect for small businesses starting with AI automation.',
      features: [
        'Fully customizable AI automation',
        'Dedicated AI business consultant',
        'Enterprise-grade compliance',
        '24/7 VIP support',
        'Unlimited AI integrations',
      ],
      icon: <Crown className="w-5 h-5 mr-2" />,
      button: 'Schedule a call',
    },
  ];

  return (
    <div className="py-24 md:py-32 space-y-24 md:space-y-32">
      <section className="text-white font-sans px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              The Best <span className="gradient-text">AI Automation</span>,<br /> at the Right Price
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose a plan that fits your business needs and start automating with AI
            </p>
          </motion.div>

          <div className="mt-6 flex items-center justify-center gap-4 mb-16">
            <span className="text-sm">Monthly</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isAnnual}
                onChange={() => setIsAnnual(!isAnnual)}
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] after:top-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-sm">Annually</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.02 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl border border-white/10 p-8 flex flex-col items-start justify-between backdrop-blur-md transition-all duration-300 hover:shadow-lg ${
                  plan.highlight ? 'bg-blue-600/90' : 'bg-white/5'
                }`}
              >
                <div className="flex items-center mb-4">
                  {plan.icon}
                  <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                  {plan.highlight && (
                    <span className="ml-2 bg-white text-black text-xs px-2 py-1 rounded-full">Popular</span>
                  )}
                </div>

                <p className="text-4xl font-bold mb-2 text-white">
                  {plan.price[isAnnual ? 'annually' : 'monthly'] === 'Custom'
                    ? 'Custom'
                    : `${plan.price[isAnnual ? 'annually' : 'monthly']}€`}
                  <span className="text-base font-normal">
                    {plan.price[isAnnual ? 'annually' : 'monthly'] === 'Custom'
                      ? ''
                      : isAnnual
                      ? '/year'
                      : '/month'}
                  </span>
                </p>

                <p className="text-sm text-gray-300 mb-6">{plan.description}</p>

                <Button className="w-full mb-6 rounded-full py-3 px-6 shadow-md hover:shadow-lg hover:scale-[1.015] transition-transform duration-200 bg-white text-black hover:bg-gray-100">
                  {plan.button}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
