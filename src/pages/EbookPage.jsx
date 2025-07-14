import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, Download, Zap } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const EbookPage = ({ onOpenChat }) => {

  const ebook = {
    title: "L'IA pour les PME : Le Guide Ultime 2025",
    subtitle: "Comment automatiser le plus possible pour atteindre votre plein potentiel avec l'IA quand on est une PME en 2025.",
    coverImage: "https://i.ibb.co/zT0hMqBb/e-book-cover.png",
    description: "Ce guide complet de plus de 200 pages vous dévoile les stratégies, outils et cas d'usage concrets pour intégrer l'IA dans votre PME. Apprenez à automatiser vos tâches, optimiser vos processus, améliorer votre relation client et prendre des décisions éclairées grâce à l'intelligence artificielle. Un indispensable pour tout dirigeant de PME souhaitant rester compétitif à l'ère de l'IA.",
    chapters: [
      "Introduction : L'IA, une révolution à la portée des PME",
      "Comprendre les différents types d'IA et leurs applications",
      "Identifier les opportunités d'automatisation dans votre entreprise",
      "Les meilleurs outils IA pour PME en 2025 (ChatGPT, Make, n8n, etc.)",
      "Cas pratiques : Marketing, Vente, Service Client, Opérations",
      "Prompt Engineering : L'art de dialoguer avec les IA",
      "Mettre en place une stratégie IA : étapes clés et budget",
      "Mesurer le ROI de vos investissements IA",
      "Anticiper les défis : éthique, sécurité et formation des équipes",
      "Conclusion : Préparez votre PME pour le futur de l'IA"
    ],
    downloadLink: "/SIMPLAIZER_EBOOK_PME_2025.pdf"
  };

  const handleDownload = () => {
    toast({
      title: "Téléchargement en cours...",
      description: `L'ebook "${ebook.title}" va bientôt être téléchargé.`,
    });
    window.open(ebook.downloadLink, '_blank');
  };

  return (
    <div className="py-24 md:py-32 space-y-24 md:space-y-32">
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="text-center mb-12"
        >
          <FileText className="w-20 h-20 text-indigo-400 mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            {ebook.title}
          </h1>
          <p className="text-xl md:text-2xl text-indigo-300 font-medium mb-10">
            {ebook.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
          >
            <img src={ebook.coverImage} alt={`Couverture de l'ebook ${ebook.title}`} className="rounded-2xl shadow-2xl w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-300"/>
          </motion.div>

          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-8">{ebook.description}</p>
            <h3 className="text-2xl font-semibold text-indigo-300 mb-4">Au sommaire de ce guide :</h3>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-10">
              {ebook.chapters.map((chapter, index) => (
                <li key={index} className="flex items-start">
                  <Zap className="w-5 h-5 text-indigo-400 mr-2 mt-1 flex-shrink-0"/>
                  <span className="text-gray-300">{chapter}</span>
                </li>
              ))}
            </ul>
            <Button 
              size="lg" 
              className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg shadow-lg text-lg py-4 px-10"
              onClick={handleDownload}
            >
              <Download className="w-5 h-5 mr-2.5" />
              Télécharger l'Ebook (PDF)
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EbookPage;
