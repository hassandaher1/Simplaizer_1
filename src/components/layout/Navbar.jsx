import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle, ChevronDown, BookOpen, Users, FileText } from 'lucide-react';

const NavItem = ({ to, label, children, onClick, closeMenu }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (children && children.some(child => location.pathname === child.to));
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const subMenuRef = useRef(null);

  const handleMouseEnter = () => {
    if (children) setIsSubMenuOpen(true);
  };
  const handleMouseLeave = () => {
    if (children) setIsSubMenuOpen(false);
  };

  const handleLinkClick = () => {
    if (onClick) onClick();
    if (closeMenu) closeMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        setIsSubMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [subMenuRef]);

  if (children) {
    return (
      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={subMenuRef}
      >
        <button
          className={`flex items-center text-base font-medium transition-colors duration-300 hover:text-blue-400 ${isActive ? 'text-blue-400' : 'text-gray-300'}`}
          onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
        >
          {label}
          <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isSubMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-2xl border border-blue-500/20 py-2 z-20"
            >
              {children.map(child => (
                <NavLink
                  key={child.to}
                  to={child.to}
                  onClick={handleLinkClick}
                  className={({ isActive: childIsActive }) =>
                    `block px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-blue-500/20 ${childIsActive ? 'text-blue-300' : 'text-gray-300'}`
                  }
                >
                  <div className="flex items-center">
                    {child.icon && <child.icon className="w-4 h-4 mr-2.5 text-blue-400" />}
                    {child.label}
                  </div>
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <NavLink 
      to={to} 
      onClick={handleLinkClick}
      className={({ isActive: navIsActive }) => 
        `text-base font-medium transition-colors duration-300 hover:text-blue-400 ${navIsActive ? 'text-blue-400' : 'text-gray-300'}`
      }
    >
      {label}
    </NavLink>
  );
};

const Navbar = ({ onOpenChat, logoUrl }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/solutions/produits", label: "Produits IA", icon: BookOpen },
    {
      label: "Ressources",
      children: [
        { to: "/ressources/blog", label: "Blog", icon: Users },
        { to: "/ressources/ebook", label: "Ebook IA pour PME", icon: FileText },
      ]
    },
    { to: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed w-full z-[900] bg-blue-900 shadow-lg transition-all duration-300 ${showNavbar ? 'top-0' : '-top-24'}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3" onClick={handleLinkClick}>
            <motion.img
              src={logoUrl}
              alt="SimplAizer Logo"
              className="h-10 w-auto" 
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span className="text-2xl font-bold gradient-text">SimplAizer</span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link, index) => (
              <NavItem key={index} {...link} closeMenu={handleLinkClick} />
            ))}
            <Button 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-md"
              onClick={() => window.open('https://calendly.com/votre-lien-calendly', '_blank')}
            >
              Prendre RDV
            </Button>
          </div>

          <div className="lg:hidden flex items-center">
            <Button variant="ghost" onClick={onOpenChat} className="mr-2 p-2 text-blue-400 hover:text-blue-300">
              <MessageCircle size={24} />
            </Button>
            <Button variant="ghost" onClick={toggleMenu} className="p-2 text-blue-400 hover:text-blue-300">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-blue-900 border-t border-blue-500/20 shadow-xl"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, index) => (
                link.children ? (
                  <div key={index} className="py-1">
                    <span className="block px-2 py-2 text-sm font-medium text-gray-400">{link.label}</span>
                    {link.children.map(childLink => (
                      <NavLink 
                        key={childLink.to} 
                        to={childLink.to} 
                        onClick={handleLinkClick}
                        className={({ isActive }) => 
                          `flex items-center rounded-md px-3 py-2.5 text-base font-medium transition-colors duration-300 hover:bg-blue-500/10 hover:text-blue-300 ${isActive ? 'bg-blue-500/10 text-blue-300' : 'text-gray-200'}`
                        }
                      >
                        {childLink.icon && <childLink.icon className="w-5 h-5 mr-3 text-blue-400" />}
                        {childLink.label}
                      </NavLink>
                    ))}
                  </div>
                ) : (
                  <NavLink 
                    key={link.to} 
                    to={link.to} 
                    onClick={handleLinkClick}
                    className={({ isActive }) => 
                      `block rounded-md px-3 py-2.5 text-base font-medium transition-colors duration-300 hover:bg-blue-500/10 hover:text-blue-300 ${isActive ? 'bg-blue-500/10 text-blue-300' : 'text-gray-200'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              ))}
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-md py-3 text-base"
                onClick={() => {
                  window.open('https://calendly.com/votre-lien-calendly', '_blank');
                  handleLinkClick();
                }}
              >
                Prendre RDV
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
