import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const logoUrl = "/LOGO.png"; // Logo placé dans /public/LOGO.png

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="py-16 bg-slate-800/70 border-t border-blue-500/20 section-bg">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <motion.img
                src={logoUrl}
                alt="SimplAizer Logo"
                className="h-10 w-auto"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <span className="text-2xl font-bold gradient-text">SimplAizer</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre partenaire expert en IA et automatisation pour PME. Transformons ensemble votre entreprise.
            </p>
          </div>

          <div>
            <span className="font-semibold text-lg text-gray-200 mb-4 block">Solutions</span>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/solutions/prestations#consulting" className="hover:text-blue-400 transition-colors">Consulting IA Stratégique</Link></li>
              <li><Link to="/solutions/prestations#automation" className="hover:text-blue-400 transition-colors">Automatisations Sur Mesure</Link></li>
              <li><Link to="/solutions/prestations#training" className="hover:text-blue-400 transition-colors">Formation IA & Prompting</Link></li>
              <li><Link to="/solutions/prestations#agents" className="hover:text-blue-400 transition-colors">Agents IA Conversationnels</Link></li>
              <li><Link to="/solutions/produits#custom-ia-app" className="hover:text-blue-400 transition-colors">Application IA Personnalisée</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-semibold text-lg text-gray-200 mb-4 block">Ressources</span>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/ressources/blog" className="hover:text-blue-400 transition-colors">Blog & Actualités IA</Link></li>
              <li><Link to="/clients" className="hover:text-blue-400 transition-colors">Études de Cas Clients</Link></li>
              <li><Link to="/ressources/ebook" className="hover:text-blue-400 transition-colors">E-book IA pour PME</Link></li>
              <li><Link to="/ressources/centre-aide" className="hover:text-blue-400 transition-colors">Centre d'Aide</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-semibold text-lg text-gray-200 mb-4 block">Contactez-nous</span>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="mailto:contact@simplaizer.com" className="hover:text-blue-400 transition-colors">contact@simplaizer.com</a></li>
              <li><a href="tel:+33123456789" className="hover:text-blue-400 transition-colors">+33 1 23 45 67 89</a></li>
              <li>Paris, France</li>
              <li className="pt-2">
                <div className="flex space-x-3">
                  {socialLinks.map(link => (
                    <a key={link.label} href={link.href} aria-label={link.label} className="text-gray-400 hover:text-blue-400 transition-colors p-1.5 rounded-full hover:bg-blue-500/10">
                      {link.icon}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500/20 mt-12 pt-10 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} SimplAizer. Tous droits réservés. Conçu avec ❤️ et IA.</p>
          <p className="mt-1">
            <Link to="/mentions-legales" className="hover:text-blue-400 transition-colors">Mentions Légales</Link> | <Link to="/politique-confidentialite" className="hover:text-blue-400 transition-colors">Politique de Confidentialité</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
