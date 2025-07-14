// ✅ HomePage.jsx complet avec services centrés
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FaqPage from '@/pages/FaqPage';
import ContactPageContent from '@/components/ContactPageContent';
import {
  MessageCircle,
  Calendar,
  Star,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  Brain,
  Settings,
  Lightbulb,
  Bot,
  Zap
} from 'lucide-react';

const HomePage = ({
  onOpenChat,
  partners,
  testimonials,
  services,
  faqItems,
  teamMembers,
  ourStory,
  robotImageUrl,
  renderPartner,
  renderTeam
}) => {
  const heroStats = [
    { value: "+25%", label: "de CA en moyenne", icon: <TrendingUp className="w-6 h-6 text-blue-400" /> },
    { value: "10h", label: "gagnées par semaine", icon: <Clock className="w-6 h-6 text-blue-400" /> },
    { value: "x3", label: "ROI en 6 mois", icon: <DollarSign className="w-6 h-6 text-blue-400" /> }
  ];

  const serviceIcons = {
    Brain: <Brain className="w-10 h-10" />,
    Settings: <Settings className="w-10 h-10" />,
    Lightbulb: <Lightbulb className="w-10 h-10" />,
    Bot: <Bot className="w-10 h-10" />,
    Zap: <Zap className="w-10 h-10" />
  };

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="pt-24 pb-16 hero-bg relative overflow-hidden min-h-[calc(100vh-5rem)] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-slate-900/50 to-purple-600/10"></div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
                Exploitez <span className="gradient-text">100% du potentiel de l'IA</span> pour votre PME
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                Intégration IA sur mesure, automatisations intelligentes, optimisation des processus et formations spécialisées.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                {heroStats.map(stat => (
                  <div key={stat.label} className="glass-effect p-4 rounded-xl text-center hover:bg-slate-700/50 transition-all duration-300">
                    <div className="flex justify-center items-center mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-lg pulse-glow text-base py-3 px-8" onClick={onOpenChat}>
                  <MessageCircle className="w-5 h-5 mr-2.5" />
                  Diagnostic IA Gratuit
                </Button>
                <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg shadow-md text-base py-3 px-8" onClick={() => window.open('https://calendly.com/votre-lien-calendly', '_blank')}>
                  <Calendar className="w-5 h-5 mr-2.5" />
                  Prendre RDV
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <img alt="Robot IA SimplAizer pour PME" className="rounded-2xl shadow-2xl object-contain w-full h-full floating-animation" src={robotImageUrl} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-slate-800/60 min-h-[200px] flex items-center">
        <div className="max-w-screen-xl mx-auto px-4 w-full">
          <p className="text-center text-xl text-gray-300 mb-10 font-medium">
            Nous travaillons avec les meilleurs outils du marché pour vous offrir la meilleure prestation.
          </p>
          <div className="overflow-hidden relative">
            <div className="flex space-x-12 scroll-animation">
              {[...partners, ...partners].map((partner, index) => renderPartner(partner, index))}
            </div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-800/80 to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-800/80 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Services Section avec 3 blocs centrés */}
      <section className="py-20 section-bg">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Des solutions IA <span className="gradient-text">sur mesure</span> pour votre succès
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              De la stratégie à l'implémentation, nous vous accompagnons à chaque étape pour transformer votre entreprise grâce à l'intelligence artificielle.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "circOut" }}
                className="glass-effect p-8 rounded-2xl transition-all duration-300 group flex flex-col shadow-lg hover:bg-slate-700/50 w-full max-w-sm"
              >
                <div className="text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300 self-start">
                  {serviceIcons[service.icon] || <Zap className="w-10 h-10" />}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6 flex-grow text-sm leading-relaxed">{service.description}</p>
                <Button
                  asChild
                  className="w-full mt-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-md"
                >
                  <Link to={`/solutions/prestations#${service.id}`}>
                    En savoir plus <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg shadow-md py-3 px-8 text-base"
            >
              <Link to="/solutions/prestations">
                Voir toutes nos prestations <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 section-bg">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-center mb-20"
          >
            <Star className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ce que nos <span className="gradient-text">clients</span> disent de nous
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Des résultats concrets et des partenariats durables.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "circOut" }}
                className="glass-effect p-8 rounded-2xl flex flex-col shadow-lg hover:bg-slate-700/50 transition-all duration-300"
              >
                <p className="text-gray-300 mb-6 italic text-lg leading-relaxed flex-grow">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center mt-auto">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-500" />
                  <div>
                    <div className="font-semibold text-lg text-gray-100">{testimonial.name}</div>
                    <div className="text-blue-400 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Notre <span className="gradient-text">équipe</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Une équipe passionnée par l'IA au service des PME ambitieuses.
          </p>
          {renderTeam?.()}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 section-bg">
        <FaqPage faqItems={faqItems} onOpenChat={onOpenChat} isHomePageSection={true} />
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <ContactPageContent onOpenChat={onOpenChat} isHomePageSection={true} />
      </section>
    </div>
  );
};

export default HomePage;
