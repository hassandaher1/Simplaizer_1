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
        "https://images.unsplash.com/photo-1679085294689-815d11595819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWklMjBjb25jZXB0fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
    },
    {
      id: 2,
      title:
        "Automatisation Intelligente : 5 workflows Make/n8n indispensables pour PME",
      date: "10 Juin 2025",
      excerpt:
        "Gagnez des heures chaque semaine en automatisant ces 5 processus clés avec des outils no-code comme Make (Integromat) ou n8n. Cas concrets et templates inclus.",
      category: "Automatisation",
      image:
        "https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGF1dG9tYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
    },
    {
      id: 3,
      title: "Prompt Engineering pour les Nuls : Le Guide Complet pour Débuter",
      date: "05 Juin 2025",
      excerpt:
        "Maîtrisez l'art de 'parler' aux IA comme ChatGPT pour obtenir des résultats bluffants. Astuces, exemples et erreurs à éviter pour des prompts parfaits.",
      category: "Prompting",
      image:
        "https://images.unsplash.com/photo-1678054460990-399a19853962?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoYXRncHR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
    }
  ];

  return (
    <div className="py-24 md:py-32 space-y-24 md:space-y-32">
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="text-center mb-20"
        >
          <Rss className="w-20 h-20 text-orange-400 mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Notre <span className="gradient-text">Blog IA</span> & Automatisation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Articles, analyses, tutoriels : toutes les clés pour comprendre et exploiter l'IA au service de votre PME.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: 'circOut' }}
              className="glass-effect rounded-2xl flex flex-col shadow-xl hover:shadow-orange-500/30 overflow-hidden"
            >
              <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <span className="inline-block bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs font-semibold mb-3 self-start">
                  {post.category}
                </span>
                <h2 className="text-2xl font-semibold mb-3 text-gray-100 hover:text-orange-300 transition-colors">
                  <Link to={`/ressources/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-sm text-gray-400 mb-4">{post.date}</p>
                <p className="text-gray-300 leading-relaxed mb-6 flex-grow">{post.excerpt}</p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-auto border-orange-500 text-orange-400 hover:bg-orange-500/10 rounded-lg"
                >
                  <Link to={`/ressources/blog/${post.id}`}>
                    Lire l'article <ArrowRight className="w-4 h-4 ml-2" />
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
