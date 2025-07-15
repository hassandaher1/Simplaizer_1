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

// Carrousel de Logos
const PartnerCarousel = ({ partners }) => (
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

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [session, setSession] = useState(null);

  const partners = [
    { name: 'ChatGPT', logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/chatgpt-3-10262703.png', link: 'https://openai.com/chatgpt' },
    { name: 'OpenAI', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/OpenAI_Logo.svg', link: 'https://openai.com' },
    { name: 'Anthropic', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Anthropic_logo.svg', link: 'https://www.anthropic.com' },
    { name: 'Make', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Make-logo.png', link: 'https://www.make.com' },
    { name: 'n8n', logoUrl: 'https://n8n.io/images/logo.svg', link: 'https://n8n.io' },
    { name: 'Zapier', logoUrl: 'https://cdn.worldvectorlogo.com/logos/zapier.svg', link: 'https://zapier.com' },
    { name: 'Google Sheets', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Google_Sheets_logo_%282014-2020%29.svg', link: 'https://www.google.com/sheets' },
    { name: 'Salesforce', logoUrl: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg', link: 'https://www.salesforce.com' },
    { name: 'Slack', logoUrl: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg', link: 'https://slack.com' },
    { name: 'HubSpot', logoUrl: 'https://cdn.worldvectorlogo.com/logos/hubspot-1.svg', link: 'https://www.hubspot.com' },
    { name: 'Airtable', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Airtable_Logo.svg/512px-Airtable_Logo.svg.png', link: 'https://airtable.com' },
    { name: 'Notion', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png', link: 'https://www.notion.so' }
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('chatOpened')) {
        handleOpenChat();
        localStorage.setItem('chatOpened', 'true');
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    toast({ title: "Agent IA Activé!", description: "Bonjour! Comment puis-je vous aider à exploiter l'IA aujourd'hui?" });
  };

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
        <Navbar onOpenChat={handleOpenChat} />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions/prestations" element={<ServicesPage />} />
            <Route path="/solutions/produits" element={<ProductsPage />} />
            <Route path="/solutions" element={<Navigate to="/solutions/prestations" replace />} />
            <Route path="/ressources/blog" element={<BlogPage />} />
            <Route path="/ressources/ebook" element={<EbookPage />} />
            <Route path="/ressources" element={<Navigate to="/ressources/blog" replace />} />
            <Route path="/clients" element={<CaseStudiesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>

          <PartnerCarousel partners={partners} />
        </main>
        <Footer />
        <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
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
