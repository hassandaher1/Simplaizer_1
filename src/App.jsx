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

// ✅ Carrousel logos
const PartnerCarousel = ({ partners }) => {
  return (
    <div className="carousel-wrapper">
      <div className="carousel-track">
        {partners.map((partner, index) => (
          <a key={index} href={partner.link} target="_blank" rel="noopener noreferrer">
            <img src={partner.logoUrl} alt={partner.name} title={partner.name} />
          </a>
        ))}
        {partners.map((partner, index) => (
          <a key={`clone-${index}`} href={partner.link} target="_blank" rel="noopener noreferrer">
            <img src={partner.logoUrl} alt={`${partner.name} clone`} title={partner.name} />
          </a>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [session, setSession] = useState(null);

  const robotImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/3f0d21ad-d99e-4b58-baee-31a09e6cc087/54f48359ee7c9b1f11d6f717c4a56609.png";
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/3f0d21ad-d99e-4b58-baee-31a09e6cc087/5e79b037b1b6042515f13fc0038e0538.png";

  const partners = [
    { name: 'ChatGPT', logoUrl: 'https://example.com/logo-chatgpt.png', link: 'https://www.openai.com/chatgpt' },
    { name: 'OpenAI', logoUrl: 'https://example.com/logo-openai.png', link: 'https://www.openai.com' },
    { name: 'Anthropic', logoUrl: 'https://example.com/logo-anthropic.png', link: 'https://www.anthropic.com' },
    { name: 'Make', logoUrl: 'https://example.com/logo-make.png', link: 'https://www.make.com' },
    { name: 'n8n', logoUrl: 'https://example.com/logo-n8n.png', link: 'https://n8n.io' },
    { name: 'Zapier', logoUrl: 'https://example.com/logo-zapier.png', link: 'https://zapier.com' },
    { name: 'Google Sheets', logoUrl: 'https://example.com/logo-google-sheets.png', link: 'https://www.google.com/sheets' },
    { name: 'Salesforce', logoUrl: 'https://example.com/logo-salesforce.png', link: 'https://www.salesforce.com' },
    { name: 'Slack', logoUrl: 'https://example.com/logo-slack.png', link: 'https://slack.com' },
    { name: 'HubSpot', logoUrl: 'https://example.com/logo-hubspot.png', link: 'https://www.hubspot.com' },
    { name: 'Airtable', logoUrl: 'https://example.com/logo-airtable.png', link: 'https://airtable.com' },
    { name: 'Notion', logoUrl: 'https://example.com/logo-notion.png', link: 'https://www.notion.so' }
  ];

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
      image: "https://media.licdn.com/.../Hassan-image.jpg"
    },
    {
      name: "Nathan GOUTAGNY",
      role: "Expert Automatisation & Co-fondateur",
      bio: "Nathan est un magicien de l'automatisation, spécialisé dans la création de workflows complexes.",
      image: "https://media.licdn.com/.../Nathan-image.jpg"
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
        <Navbar onOpenChat={handleOpenChat} session={session} logoUrl={logoUrl} />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage partners={partners.map(p => p.name)} services={services} testimonials={testimonials} faqItems={faqItems} ourStory={ourStory} />} />
            <Route path="/solutions/prestations" element={<ServicesPage />} />
            <Route path="/solutions/produits" element={<ProductsPage />} />
            <Route path="/solutions" element={<Navigate to="/solutions/prestations" replace />} />
            <Route path="/ressources/blog" element={<BlogPage />} />
            <Route path="/ressources/ebook" element={<EbookPage />} />
            <Route path="/ressources" element={<Navigate to="/ressources/blog" replace />} />
            <Route path="/clients" element={<CaseStudiesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>

          {/* ✅ Carrousel */}
          <PartnerCarousel partners={partners} />
        </main>
        <Footer />
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
