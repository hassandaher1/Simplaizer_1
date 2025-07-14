import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp, Users, MessageCircle, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CaseStudiesPage = ({ testimonials, onOpenChat }) => {
  // Duplicate testimonials for display purposes if less than 6
  const displayTestimonials = testimonials.length < 6 
    ? [...testimonials, ...testimonials, ...testimonials].slice(0,6) 
    : testimonials;


  return (
    <div className="py-24 md:py-32 space-y-24 md:space-y-32">
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="text-center mb-20"
        >
          <TrendingUp className="w-20 h-20 text-purple-400 mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Nos <span className="gradient-text">Succès Clients</span> en IA
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment nous avons aidé des PME comme la vôtre à se transformer, innover et croître grâce à des solutions d'intelligence artificielle sur mesure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "circOut" }}
              className="glass-effect p-8 rounded-2xl flex flex-col shadow-xl hover:shadow-purple-500/30"
            >
              <div className="flex mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic text-lg leading-relaxed flex-grow">"{testimonial.text}"</p>
              <div className="flex items-center mt-auto pt-6 border-t border-purple-500/20">
                <img  src={testimonial.image || `https://ui-avatars.com/api/?name=${testimonial.name.replace(' ','+')}&background=random`} alt={testimonial.name} className="w-14 h-14 rounded-full mr-5 object-cover border-2 border-purple-500"/>
                <div>
                  <div className="font-semibold text-xl text-gray-100">{testimonial.name}</div>
                  <div className="text-purple-400 text-md">{testimonial.company}</div>
                </div>
              </div>
               <Button 
                variant="outline" 
                className="w-full mt-8 border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-lg"
                onClick={() => alert("Affichage de l'avis complet bientôt disponible!")}
              >
                Lire l'étude de cas complète <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>
        
        {testimonials.length > 6 && (
          <div className="text-center mt-20">
            <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-lg shadow-md py-3 px-8 text-base">
                Voir plus d'études de cas <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

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
              Prêt à écrire <span className="gradient-text">votre propre success story</span> ?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Discutons de vos ambitions et voyons comment l'IA peut vous aider à les réaliser. Votre succès est notre priorité.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-lg pulse-glow text-base py-3 px-8"
              onClick={onOpenChat}
            >
              <MessageCircle className="w-5 h-5 mr-2.5" />
              Demander un Diagnostic Gratuit
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;