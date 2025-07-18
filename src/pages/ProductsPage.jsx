import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingCart, Zap, Wrench, Crown } from 'lucide-react';

const ProductsPage = ({ products = [], onOpenChat }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      price: '$37',
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
      price: '$75',
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
      price: 'Custom',
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
      {/* Section Produits */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Nos <span className="gradient-text">Produits IA</span> Prêts à l'Emploi
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Accélérez votre transformation digitale avec nos solutions IA packagées, incluant des infrastructures IA personnalisées et des applications dédiées, conçues pour un impact immédiat et un retour sur investissement rapide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              id={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "circOut" }}
              className="glass-effect p-8 rounded-2xl hover:bg-slate-700/50 transition-all duration-300 group flex flex-col shadow-xl hover:shadow-purple-500/30"
            >
              <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>
              <div className="text-4xl font-bold gradient-text mb-8">{product.price}</div>
              <ul className="space-y-3 mb-10 flex-grow">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg shadow-md py-3 text-base"
                onClick={onOpenChat}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Commander ce Produit
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Pricing intégrée */}
      <section className="bg-black text-white font-sans px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              The Best <span className="gradient-text">AI Automation</span>,<br /> at the Right Price
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose a plan that fits your business needs and start automating with AI
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="text-sm">Monthly</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] after:top-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
              <span className="text-sm">Annually</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl border border-white/10 p-8 flex flex-col items-start justify-between ${plan.highlight ? 'bg-gradient-to-br from-purple-700 to-purple-500 shadow-lg' : 'bg-zinc-900'}`}
              >
                <div className="flex items-center mb-4">
                  {plan.icon}
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  {plan.highlight && (
                    <span className="ml-2 bg-white text-black text-xs px-2 py-1 rounded-full">Popular</span>
                  )}
                </div>
                <p className="text-4xl font-bold mb-2">{plan.price}<span className="text-base font-normal">/month</span></p>
                <p className="text-sm text-gray-400 mb-6">{plan.description}</p>
                <Button className={`w-full mb-6 ${plan.highlight ? 'bg-white text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
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
