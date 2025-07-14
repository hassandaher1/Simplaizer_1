
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingCart, MessageCircle, Zap } from 'lucide-react';

const ProductsPage = ({ products, onOpenChat }) => {
  return (
    <div className="py-24 md:py-32 space-y-24 md:space-y-32">
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

      <section className="py-20 section-bg">
        <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <Zap className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Un produit vous intéresse ? <span className="gradient-text">Parlons-en !</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Nos experts peuvent vous aider à choisir le produit le plus adapté à vos besoins et à l'intégrer parfaitement dans votre écosystème existant.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-lg pulse-glow text-base py-3 px-8"
              onClick={onOpenChat}
            >
              <MessageCircle className="w-5 h-5 mr-2.5" />
              Discuter avec un conseiller
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
