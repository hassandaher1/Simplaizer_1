import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import ProductsPage from '@/pages/ProductsPage';
import ResourcesPage from '@/pages/ResourcesPage';
import BlogPage from '@/pages/BlogPage';
import EbookPage from '@/pages/EbookPage';
import ContactPage from '@/pages/ContactPage';
import CaseStudiesPage from '@/pages/CaseStudiesPage';
import ChatWidget from '@/components/ChatWidget';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [session, setSession] = useState(null);

  const robotImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/3f0d21ad-d99e-4b58-baee-31a09e6cc087/54f48359ee7c9b1f11d6f717c4a56609.png";
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/3f0d21ad-d99e-4b58-baee-31a09e6cc087/5e79b037b1b6042515f13fc0038e0538.png";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_IN') {
        toast({ title: "Connexion réussie!", description: "Bienvenue sur SimplAizer." });
      }
      if (_event === 'SIGNED_OUT') {
        toast({ title: "Déconnexion réussie.", description: "À bientôt!" });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const partners = [
    'ChatGPT', 'OpenAI', 'Anthropic', 'Make', 'n8n', 'Zapier',
    'Google Sheets', 'Salesforce', 'Slack', 'HubSpot', 'Airtable', 'Notion'
  ];

  const testimonials = [
    {
      name: "Catherine Fasang",
      company: "Restaurant Chromosome",
      text: "Bravo à vous deux, cela colle parfaitement à ce que nous voulons, du sur mesure !",
      rating: 5,
      image: "https://images.app.goo.gl/sXDgfpnrF3ouPigm9"
    },
    {
      name: "MVDP",
      company: "Consulting Plus",
      text: "L'équipe SimplAizer a transformé nos processus. Nous gagnons 15h par semaine !",
      rating: 5,
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
    },
    {
      name: "Sophie Laurent",
      company: "Tech Solutions",
      text: "ROI exceptionnel ! L'investissement s'est amorti en 3 mois.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    }
  ];

  const services = [
    {
      id: "consulting",
      icon: "Brain",
      title: "Consulting IA Stratégique",
      description: "Audit complet et feuille de route IA personnalisée pour maximiser votre ROI.",
    },
    {
      id: "automation",
      icon: "Settings",
      title: "Automatisations et agent IA Sur Mesure",
      description: "Développement d'automatisations intelligentes avec Make/n8n pour optimiser vos workflows.",
    },
    {
      id: "custom-",
      icon: "Zap",
      title: " Infrastructures Personnalisées",
      description: "Développement d'une infrastructure IA sur mesure pour une application métier unique.",
    }
  ];

  const faqItems = [
    {
      question: "Quel est votre processus de collaboration type ?",
      answer: "Notre méthode éprouvée en 5 étapes garantit votre succès : ..."
    },
    {
      question: "En combien de temps puis-je espérer voir des résultats concrets ?",
      answer: "Les premiers gains sont souvent visibles dès les 2-4 semaines..."
    },
    {
      question: "Proposez-vous un accompagnement une fois le projet livré ?",
      answer: "Absolument ! Nous incluons 3 mois de support gratuit..."
    }
  ];

  const teamMembers = [
    {
      name: "Hassan DAHER",
      role: "Expert IA & Co-fondateur",
      bio: "Hassan est passionné par la transformation digitale des PME grâce à l'IA et automatisation.",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFqLxUz7hqG6A/profile-displayphoto-shrink_800_800/B4EZTgoo5SGwAg-/0/1738935538403?e=1757548800&v=beta&t=1HdrPjMmfG5HNDy7NeA7sa5FefQ5ol0V0VrRiVsTFK0"
    },
    {
      name: "Nathan GOUTAGNY",
      role: "Expert Automatisation & Co-fondateur",
      bio: "Nathan est un magicienne d'IA, spécialisé dans la création d'automatisations complexes.",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQElyIBHAZAmYg/profile-displayphoto-shrink_400_400/B4EZTkzGn4HgAg-/0/1739005393705?e=1757548800&v=beta&t=-oYRmngUiz4ADcsz_wph0GvXluUoQngE0XuKc9OZ5mQ"
    }
  ];

  const ourStory = "Fondée en 2023 par Hassan DAHER & Nathan GOUTAGNY, SimplAizer est née d'une conviction profonde : ...";

  const handleOpenChat = () => {
    setIsChatOpen(true);
    toast({ title: "Agent IA Activé!", description: "Bonjour! Comment puis-je vous aider à exploiter l'IA aujourd'hui?" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('chatOpened')) {
        handleOpenChat();
        localStorage.setItem('chatOpened', 'true');
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const getLogoUrl = (partner) => `https://via.placeholder.com/100x40?text=${encodeURIComponent(partner)}`;

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden relative">
        <motion.div
          className="pointer-events-none fixed inset-0 z-[999] transition duration-300"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
          }}
        />
        <Toaster />
        <Navbar onOpenChat={handleOpenChat} logoUrl={logoUrl} session={session} />
        <main className="pt-20">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onOpenChat={handleOpenChat}
                  partners={partners}
                  testimonials={testimonials}
                  services={services}
                  faqItems={faqItems}
                  ourStory={ourStory}
                  robotImageUrl={robotImageUrl}
                  renderPartner={(partner, index) => (
                    <div key={index} className="p-2 border border-white/20 rounded-xl backdrop-blur-sm whitespace-nowrap">
                      <img src={getLogoUrl(partner)} alt={partner} className="h-12 w-auto inline-block" />
                    </div>
                  )}
                  renderTeam={() => (
                    <div className="flex justify-center flex-wrap gap-12 mt-12">
                      {teamMembers.map((member, index) => (
                        <div key={index} className="max-w-xs text-center bg-slate-800/40 p-6 rounded-2xl shadow-lg">
                          <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 mb-4 object-cover" />
                          <h3 className="text-xl font-bold">{member.name}</h3>
                          <p className="text-blue-400 mb-2">{member.role}</p>
                          <p className="text-gray-300 mb-4">{member.bio}</p>
                          <a href="#" className="inline-block border border-blue-500 px-4 py-2 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition">
                            Profil LinkedIn
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                />
              }
            />
            <Route path="/solutions/prestations" element={<ServicesPage services={services} onOpenChat={handleOpenChat} />} />
            <Route path="/solutions/produits" element={<ProductsPage products={[]} onOpenChat={handleOpenChat} />} />
            <Route path="/solutions" element={<Navigate to="/solutions/prestations" replace />} />
            <Route path="/ressources/blog" element={<BlogPage onOpenChat={handleOpenChat} />} />
            <Route path="/ressources/ebook" element={<EbookPage onOpenChat={handleOpenChat} />} />
            <Route path="/ressources" element={<Navigate to="/ressources/blog" replace />} />
            <Route path="/clients" element={<CaseStudiesPage testimonials={testimonials} onOpenChat={handleOpenChat} />} />
            <Route path="/contact" element={<ContactPage onOpenChat={handleOpenChat} />} />
            <Route path="/services" element={<Navigate to="/solutions/prestations" replace />} />
            <Route path="/produits" element={<Navigate to="/solutions/produits" replace />} />
            <Route path="/equipe" element={<Navigate to="/" replace />} />
            <Route path="/faq" element={<Navigate to="/" replace />} />
            <Route path="/cas-clients" element={<Navigate to="/clients" replace />} />
          </Routes>
        </main>
        <Footer logoUrl={logoUrl} />
        <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} agentAvatar={robotImageUrl} />
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 50 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpenChat}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl pulse-glow z-40"
            aria-label="Ouvrir le chat IA"
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </motion.button>
        )}
      </div>
    </Router>
  );
};

export default App;