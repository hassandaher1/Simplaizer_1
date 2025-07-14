import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar, Zap, User, Briefcase, MessageSquare, Plus, Minus } from 'lucide-react';

const ContactPage = ({ onOpenChat }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    spamCheck: '',
  });
  const [num1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2] = useState(Math.floor(Math.random() * 10) + 1);
  const spamAnswer = num1 + num2;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formData.spamCheck) !== spamAnswer) {
      toast({
        title: "Erreur Anti-Spam",
        description: "La réponse à la question anti-spam est incorrecte.",
        variant: "destructive",
      });
      return;
    }
    // TODO: Implement actual form submission (e.g., to N8n/Make)
    console.log("Form data:", formData);
    toast({
      title: "Message Envoyé !",
      description: "Merci pour votre message. Nous vous recontacterons bientôt.",
    });
    setFormData({ name: '', company: '', email: '', phone: '', message: '', spamCheck: '' });
  };

  const contactInfos = [
    { icon: <Mail className="w-8 h-8 text-blue-400" />, title: "Email", value: "contact@simplaizer.com", href: "mailto:contact@simplaizer.com" },
    { icon: <Phone className="w-8 h-8 text-blue-400" />, title: "Téléphone", value: "+33 1 23 45 67 89", href: "tel:+33123456789" },
    { icon: <MapPin className="w-8 h-8 text-blue-400" />, title: "Adresse", value: "123 Rue de l'Innovation, 75000 Paris, France" },
  ];

  const inputFields = [
    { name: "name", placeholder: "Votre Nom Complet", icon: <User className="w-5 h-5 text-gray-400" />, type: "text" },
    { name: "company", placeholder: "Nom de votre Entreprise", icon: <Briefcase className="w-5 h-5 text-gray-400" />, type: "text" },
    { name: "email", placeholder: "Votre Adresse Email", icon: <Mail className="w-5 h-5 text-gray-400" />, type: "email" },
    { name: "phone", placeholder: "Votre Numéro de Téléphone (Optionnel)", icon: <Phone className="w-5 h-5 text-gray-400" />, type: "tel" },
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
          <MessageSquare className="w-20 h-20 text-blue-400 mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Contactez <span className="gradient-text">SimplAizer</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nous sommes là pour répondre à toutes vos questions, discuter de vos projets IA ou simplement échanger sur les opportunités. N'hésitez pas à nous joindre !
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="space-y-8"
          >
            {contactInfos.map((info, index) => (
              <div key={index} className="flex items-start space-x-6 glass-effect p-6 rounded-xl shadow-lg">
                <div className="flex-shrink-0 bg-blue-500/20 p-4 rounded-lg">{info.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-1">{info.title}</h3>
                  {info.href ? (
                    <a href={info.href} className="text-gray-300 hover:text-blue-300 transition-colors text-lg">{info.value}</a>
                  ) : (
                    <p className="text-gray-300 text-lg">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
             <div className="glass-effect p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">Prise de RDV rapide</h3>
                <p className="text-gray-300 mb-4">Planifiez directement un appel avec l'un de nos experts IA.</p>
                <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg shadow-md text-base py-3"
                    onClick={() => window.open('https://calendly.com/votre-lien-calendly', '_blank')}
                >
                    <Calendar className="w-5 h-5 mr-2.5" />
                    Accéder à Calendly
                </Button>
             </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
            onSubmit={handleSubmit}
            className="glass-effect p-8 md:p-10 rounded-2xl space-y-6 shadow-2xl"
          >
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-100">Envoyez-nous un message</h2>
            {inputFields.map(field => (
              <div key={field.name} className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {field.icon}
                </div>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.name !== 'phone' && field.name !== 'company'}
                  className="w-full p-4 pl-12 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                />
              </div>
            ))}
            <div className="relative">
              <div className="absolute top-4 left-0 pl-4 flex items-center pointer-events-none">
                <MessageSquare className="w-5 h-5 text-gray-400" />
              </div>
              <textarea
                name="message"
                placeholder="Votre Message..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow resize-none"
              ></textarea>
            </div>
            <div className="relative">
              <label htmlFor="spamCheck" className="block text-sm font-medium text-gray-300 mb-2">
                Anti-Spam : Combien font {num1} + {num2} ?
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none top-6">
                 <Plus className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="spamCheck"
                id="spamCheck"
                placeholder="Votre réponse"
                value={formData.spamCheck}
                onChange={handleChange}
                required
                className="w-full p-4 pl-12 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              />
            </div>
            <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-lg text-base py-3">
              <Send className="w-5 h-5 mr-2.5" />
              Envoyer le Message
            </Button>
          </motion.form>
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
              Une question rapide ? <span className="gradient-text">Utilisez notre IA !</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Pour une réponse instantanée à vos interrogations générales ou pour un premier diagnostic, notre agent IA est disponible 24/7.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-lg pulse-glow text-base py-3 px-8"
              onClick={onOpenChat}
            >
              <MessageCircle className="w-5 h-5 mr-2.5" />
              Démarrer une Conversation IA
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;