
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Zap, Linkedin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const TeamPage = ({ members, story, onOpenChat, isHomePageSection = false }) => {
  const PageWrapper = isHomePageSection ? 'div' : motion.div;
  const sectionProps = isHomePageSection ? {} : {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "circOut" }
  };
  
  const headerIcon = isHomePageSection ? <Users className="w-16 h-16 text-blue-500 mx-auto mb-6" /> : <Users className="w-20 h-20 text-blue-400 mx-auto mb-8" />;


  return (
    <PageWrapper className={!isHomePageSection ? "py-24 md:py-32 space-y-24 md:space-y-32" : ""}>
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Notre <span className="gradient-text">Équipe d'Experts</span> Passionnés
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez les visages derrière SimplAizer : des professionnels dévoués à rendre l'IA accessible et performante pour votre PME.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mb-16 md:mb-24">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "circOut" }}
              className="glass-effect p-8 rounded-2xl text-center flex flex-col items-center shadow-xl hover:shadow-blue-500/30"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-8 object-cover border-4 border-blue-500 shadow-lg"
              />
              <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>
              <p className="text-blue-400 mb-4 text-lg">{member.role}</p>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm flex-grow">{member.bio}</p>
              <Button variant="outline" className="mt-auto border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg">
                <Linkedin className="w-4 h-4 mr-2" /> Profil LinkedIn
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="glass-effect p-8 md:p-12 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center gradient-text">Notre Histoire</h2>
          <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
            {story}
          </p>
        </motion.div>
        {isHomePageSection && (
           <div className="text-center mt-16">
             <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg shadow-md py-3 px-8 text-base"
                onClick={onOpenChat}
              >
                <MessageCircle className="w-5 h-5 mr-2.5" />
                Discuter avec notre équipe
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
                Envie de <span className="gradient-text">rejoindre l'aventure</span> ou de collaborer ?
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Nous sommes toujours à la recherche de talents et de partenaires passionnés par l'IA. Contactez-nous pour explorer les opportunités.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-lg pulse-glow text-base py-3 px-8"
                onClick={onOpenChat}
              >
                <MessageCircle className="w-5 h-5 mr-2.5" />
                Discuter avec Notre Équipe
              </Button>
            </motion.div>
          </div>
        </section>
      )}
    </PageWrapper>
  );
};

export default TeamPage;
