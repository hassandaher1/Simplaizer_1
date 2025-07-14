
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <motion.div
      initial={false}
      className="glass-effect rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-500/30 transition-shadow duration-300"
    >
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full p-6 md:p-8 text-left hover:bg-slate-700/30 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-xl md:text-2xl font-semibold text-gray-100">{item.question}</span>
        {isOpen ? <ChevronUp className="w-6 h-6 text-blue-400 flex-shrink-0" /> : <ChevronDown className="w-6 h-6 text-blue-400 flex-shrink-0" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="p-6 md:p-8 pt-0">
              <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">{item.answer}</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FaqPage = ({ faqItems, onOpenChat, isHomePageSection = false }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const PageWrapper = isHomePageSection ? 'div' : motion.div;
  const headerIcon = isHomePageSection ? <HelpCircle className="w-16 h-16 text-blue-500 mx-auto mb-6" /> : <HelpCircle className="w-20 h-20 text-blue-400 mx-auto mb-8" />;


  return (
    <PageWrapper className={!isHomePageSection ? "py-24 md:py-32 space-y-24 md:space-y-32" : ""}>
      <section className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={isHomePageSection ? {opacity:0, y:50} : { opacity: 0, y: -50 }}
          whileInView={isHomePageSection ? {opacity:1, y:0} : undefined}
          animate={!isHomePageSection ? { opacity: 1, y: 0 } : undefined}
          viewport={isHomePageSection ? {once: true, amount:0.3} : undefined}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="text-center mb-16 md:mb-20"
        >
          {headerIcon}
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-6 ${!isHomePageSection && "lg:text-6xl"}`}>
            Questions <span className="gradient-text">Fréquentes</span> & Méthodologie
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Trouvez les réponses à vos interrogations sur nos services, notre processus de collaboration et l'impact de l'IA sur votre PME.
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {faqItems.map((item, index) => (
            <FaqItem 
              key={index} 
              item={item} 
              isOpen={openIndex === index} 
              onClick={() => handleClick(index)} 
            />
          ))}
        </div>
         {isHomePageSection && (
           <div className="text-center mt-16">
             <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg shadow-md py-3 px-8 text-base"
                onClick={onOpenChat}
              >
                <MessageCircle className="w-5 h-5 mr-2.5" />
                Une autre question ? Demandez à Nova !
              </Button>
          </div>
        )}
      </section>

      {!isHomePageSection && (
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
                Vous ne trouvez pas votre réponse ? <span className="gradient-text">Contactez-nous !</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Notre équipe est à votre disposition pour répondre à toutes vos questions spécifiques et discuter de vos besoins en IA.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-lg pulse-glow text-base py-3 px-8"
                onClick={onOpenChat}
              >
                <MessageCircle className="w-5 h-5 mr-2.5" />
                Poser une Question à notre IA
              </Button>
            </motion.div>
          </div>
        </section>
      )}
    </PageWrapper>
  );
};

export default FaqPage;
