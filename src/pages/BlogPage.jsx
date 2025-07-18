import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Rss, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "L'IA générative va-t-elle transformer votre PME en 2025 ?",
      date: "15 Juin 2025",
      excerpt:
        "Découvrez comment l'IA générative, de ChatGPT aux outils de création d'images, peut révolutionner vos processus marketing, créatifs et opérationnels...",
      category: "Tendances IA",
      image:
        "https://images.unsplash.com/photo-1679085294689-815d11595819?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
    },
    {
      id: 2,
      title: "Automatisation Intelligente : 5 workflows Make/n8n indispensables pour PME",
      date: "10 Juin 2025",
      excerpt:
        "Gagnez des heures chaque semaine en automatisant ces 5 processus clés avec des outils no-code comme Make (Integromat) ou n8n. Cas concrets et templates inclus.",
      category: "Automatisation",
      image:
        "https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
    },
    {
      id: 3,
      title: "Prompt Engineering pour les Nuls : Le Guide Complet pour Débuter",
      date: "05 Juin 2025",
      excerpt:
        "Maîtrisez l'art de 'parler' aux IA comme ChatGPT pour obtenir des résultats bluffants. Astuces, exemples et erreurs à éviter pour des prompts parfaits.",
      category: "Prompting",
      image:
        "https://images.unsplash.com/photo-1678054460990-399a19853962?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
    }
  ];

  return (
    <div className="py-20 md:py-32 space-y-20 md:space-y-32">
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="text-center mb-16 md:mb-20"
        >
          <Rss className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-white">
            Notre <span className="gradient-text">Blog IA</span> & Automatisation
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Articles, analyses, tutoriels : toutes les clés pour comprendre et exploiter l'IA au service de votre PME.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: 'circOut' }}
              className="glass-effect rounded-xl flex flex-col shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium mb-2 w-fit">
                  {post.category}
                </span>
                <h2 className="text-xl font-semibold mb-2 text-white hover:text-blue-300 transition-colors">
                  <Link to={`/ressources/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-xs text-gray-500 mb-3">{post.date}</p>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed flex-grow">{post.excerpt}</p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-auto border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-md text-sm"
                >
                  <Link to={`/ressources/blog/${post.id}`}>
                    Lire l'article <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
