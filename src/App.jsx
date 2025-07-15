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

  const partners = [
    { name: 'ChatGPT', logoUrl: 'https://i.ibb.co/Rpy1VfcT/Chat-GPT-Image-Jul-14-2025-07-11-40-PM.png', link: 'https://www.openai.com/chatgpt' },
    { name: 'airtable', logoUrl: 'https://i.ibb.co/jkVBLW9V/Chat-GPT-Image-Jul-14-2025-07-27-15-PM-removebg-preview.png', link: 'https://www.airtable.com' },
    { name: 'Figma', logoUrl: 'https://i.ibb.co/gZ3t79vp/Chat-GPT-Image-Jul-14-2025-07-25-58-PM-removebg-preview.png', link: 'https://www.Figma.com' },
    { name: 'Drive', logoUrl: 'https://i.ibb.co/fdGY7WW8/Chat-GPT-Image-Jul-14-2025-07-20-59-PM-removebg-preview.png', link: 'https://www.drive.google.com' },
    { name: 'n8n', logoUrl: 'https://i.ibb.co/zHjpBsFN/n8n.png', link: 'https://n8n.io' },
    { name: 'click up', logoUrl: 'https://i.ibb.co/Lhv3bVcC/Chat-GPT-Image-Jul-14-2025-07-26-38-PM-removebg-preview.png', link: 'https://clickup.com' },
    { name: 'Google Sheets', logoUrl: 'https://i.ibb.co/nqMPFSJg/Chat-GPT-Image-Jul-14-2025-07-21-42-PM-removebg-preview.png', link: 'https://www.google.com/sheets' },
    { name: 'Salesforce', logoUrl: 'https://i.ibb.co/pjp1nGMv/Chat-GPT-Image-Jul-15-2025-10-37-28-PM.png', link: 'https://www.salesforce.com' },
    { name: 'Slack', logoUrl: 'https://i.ibb.co/h1yJLmnX/Chat-GPT-Image-Jul-14-2025-07-15-38-PM-removebg-preview.png', link: 'https://slack.com' },
    { name: 'HubSpot', logoUrl: 'https://i.ibb.co/gFhzXNpY/Chat-GPT-Image-Jul-15-2025-08-58-04-PM.png', link: 'https://www.hubspot.com' },
    { name: 'Gmail', logoUrl: 'https://i.ibb.co/wN68zL1B/Chat-GPT-Image-Jul-14-2025-07-28-00-PM-removebg-preview.png', link: 'https://mail.google.com' },
    { name: 'Notion', logoUrl: 'https://i.ibb.co/C3TSHXt2/Chat-GPT-Image-Jul-14-2025-07-25-13-PM-removebg-preview.png', link: 'https://www.notion.so' }
  ];

  const testimonials = [
    {
      name: "Catherine Fasang",
      company: "Restaurant Chromosome",
      text: "Bravo à vous deux, cela colle parfaitement à ce que nous voulons, du sur mesure !",
      rating: 5,
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
    },
    {
      name: "MVDP",
      company: "Consulting Plus",
      text: "L'équipe SimplAizer a transformé nos processus. Nous gagnons 15h par semaine !",
      rating: 5,
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce"
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
      description: "Audit complet et feuille de route IA personnalisée pour maximiser votre ROI."
    },
    {
      id: "automation",
      icon: "Settings",
      title: "Automatisations et agent IA Sur Mesure",
      description: "Développement d'automatisations intelligentes avec Make/n8n pour optimiser vos workflows."
    },
    {
      id: "custom-",
      icon: "Zap",
      title: "Infrastructures Personnalisées",
      description: "Développement d'une infrastructure IA sur mesure pour une application métier unique."
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
      image: "https://media.licdn.com/dms/image/v2/D4E03AQFqLxUz7hqG6A/profile-displayphoto"
    },
    {
      name: "Nathan GOUTAGNY",
      role: "Expert Automatisation & Co-fondateur",
      bio: "Nathan est un magicien de l'automatisation, spécialisé dans les workflows complexes.",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQElyIBHAZAmYg/profile-displayphoto"
    }
  ];

  const ourStory = "Fondée en 2023 par Hassan DAHER & Nathan GOUTAGNY, SimplAizer est née d'une conviction profonde : ...";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_IN') toast({ title: "Connexion réussie!", description: "Bienvenue sur SimplAizer." });
      if (_event === 'SIGNED_OUT') toast({ title: "Déconnexion réussie.", description: "À bientôt!" });
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const renderPartner = (partner, index) => (
    <a key={index} href={partner.link} target="_blank" rel="noopener noreferrer">
      <img src={partner.logoUrl} alt={partner.name} title={partner.name} className="h-16 object-contain" />
    </a>
  );

  const renderTeam = () => (
    <div className="grid md:grid-cols-2 gap-12">
      {teamMembers.map((member, index) => (
        <div key={index} className="text-center">
          <img src={member.image} alt={member.name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover" />
          <h3 className="text-xl font-semibold text-white">{member.name}</h3>
          <p className="text-blue-400 text-sm mb-2">{member.role}</p>
          <p className="text-gray-300 text-sm max-w-xs mx-auto">{member.bio}</p>
        </div>
      ))}
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden relative">
        <motion.div
          className="pointer-events-none fixed inset-0 z-[999] transition duration-300"
          style={{ background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)` }}
        />
        <Toaster />
        <Navbar onOpenChat={handleOpenChat} />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={
              <HomePage
                onOpenChat={handleOpenChat}
                partners={partners}
                testimonials={testimonials}
                services={services}
                faqItems={faqItems}
                teamMembers={teamMembers}
                ourStory={ourStory}
                robotImageUrl="https://cdn.midjourney.com/123456.jpg"
                renderPartner={renderPartner}
                renderTeam={renderTeam}
              />
            } />
            <Route path="/solutions/prestations" element={<ServicesPage />} />
            <Route path="/solutions/produits" element={<ProductsPage />} />
            <Route path="/solutions" element={<Navigate to="/solutions/prestations" replace />} />
            <Route path="/ressources/blog" element={<BlogPage />} />
            <Route path="/ressources/ebook" element={<EbookPage />} />
            <Route path="/ressources" element={<Navigate to="/ressources/blog" replace />} />
            <Route path="/clients" element={<CaseStudiesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
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