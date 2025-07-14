
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpen, Edit3, Download, MessageCircle, Zap, Rss, FileText, Users, LifeBuoy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const ResourceCard = ({ icon, title, description, linkText, linkTo, delay, isExternal = false, onOpenChat }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, delay, ease: "circOut" }}
    className="glass-effect p-8 rounded-2xl hover:bg-slate-700/50 transition-all duration-300 group flex flex-col shadow-xl hover:shadow-green-500/30"
  >
    <div className="text-green-400 mb-6 group-hover:scale-110 transition-transform duration-300 self-start">
      {icon}
    </div>
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <p className="text-gray-300 mb-6 flex-grow leading-relaxed">{description}</p>
    {isExternal ? (
      <Button 
        asChild
        className="w-full mt-auto bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-lg shadow-md py-3 text-base"
      >
        <a href={linkTo} target="_blank" rel="noopener noreferrer">
          {linkText} <Download className="w-4 h-4 ml-2" />
        </a>
      </Button>
    ) : (
      <Button 
        asChild
        className="w-full mt-auto bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-lg shadow-md py-3 text-base"
      >
        <Link to={linkTo}>{linkText}</Link>
      </Button>
    )}
  </motion.div>
);

const ResourcesPage = ({ onOpenChat }) => {
  const resources = [
    {
      icon: <Rss className="w-10 h-10" />,
      title: "Blog IA & Automatisation",
      description: "Restez à la pointe de l'innovation avec nos articles, analyses et tutoriels sur l'IA et l'automatisation pour PME.",
      linkText: "Explorer le Blog",
      linkTo: "/ressources/blog",
    },
    {
      icon: <LifeBuoy className="w-10 h-10" />,
      title: "Centre d'Aide",
      description: "Trouvez des réponses rapides à vos questions, consultez nos guides d'utilisation et astuces pour optimiser nos solutions.",
      linkText: "Visiter le Centre d'Aide",
      linkTo: "/ressources/centre-aide",
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Ebook: IA pour PME 2025",
      description: "Comment automatiser le plus possible pour atteindre votre plein potentiel avec l'IA quand on est une PME en 2025.",
      linkText: "Télécharger l'Ebook (PDF)",
      linkTo: "/SIMPLAIZER_EBOOK_PME_2025.pdf", // This will be generated
      isExternal: true,
    },
  ];

  return (
    <div className="py-24 md:py-32 space-y-24 md:space-y-32">
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="text-center mb-20"
        >
          <BookOpen className="w-20 h-20 text-green-400 mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Nos <span className="gradient-text">Ressources</span> pour Maîtriser l'IA
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Approfondissez vos connaissances, découvrez les dernières tendances et apprenez à exploiter pleinement le potentiel de l'IA pour votre PME grâce à nos contenus exclusifs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {resources.map((resource, index) => (
            <ResourceCard 
              key={index}
              icon={resource.icon}
              title={resource.title}
              description={resource.description}
              linkText={resource.linkText}
              linkTo={resource.linkTo}
              delay={index * 0.15}
              isExternal={resource.isExternal}
              onOpenChat={onOpenChat}
            />
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
              Besoin d'un conseil <span className="gradient-text">personnalisé</span> ?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Nos ressources sont un excellent point de départ, mais chaque entreprise est unique. Discutons de vos défis spécifiques pour trouver les meilleures solutions IA.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-lg pulse-glow text-base py-3 px-8"
              onClick={onOpenChat}
            >
              <MessageCircle className="w-5 h-5 mr-2.5" />
              Parler à un Expert IA
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
