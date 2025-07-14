
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { X, Send, Bot, User, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const ChatWidget = ({ isOpen, setIsOpen, agentAvatar: propAgentAvatar }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const chatEndRef = useRef(null);

  const agentName = "Nova";
  const defaultAgentAvatar = "https://ibb.co/4w3LNXQW";
  const agentAvatar = propAgentAvatar || defaultAgentAvatar;        


  const initialGreeting = `Bonjour ! Je suis ${agentName}, votre expert IA SimplAizer. Pour mieux vous conseiller, j'ai quelques questions. Quel est votre objectif principal aujourd'hui ?`;
  const chatFlow = [
    {
      id: 'goal',
      question: initialGreeting,
      options: [
        'Augmenter mon chiffre d\'affaires',
        'Gagner du temps et optimiser mes processus',
        'Réduire mes coûts opérationnels',
        'Améliorer l\'expérience client',
        'Explorer le potentiel de l\'IA pour mon entreprise'
      ]
    },
    {
      id: 'sector',
      question: 'Très bien. Dans quel secteur d\'activité évoluez-vous principalement ?',
      options: ['E-commerce', 'Services B2B', 'Services B2C', 'Industrie / Production', 'Consulting / Formation', 'Autre']
    },
    {
      id: 'employees',
      question: 'Compris. Quelle est la taille de votre entreprise en nombre d\'employés ?',
      options: ['Moi uniquement (Indépendant)', '1-10 employés', '11-50 employés', '51-200 employés', 'Plus de 200 employés']
    },
    {
      id: 'biggestChallenge',
      question: 'Quel est votre plus grand défi ou point de douleur actuel dans votre entreprise ?',
      inputType: 'text',
      placeholder: 'Ex: Perte de temps sur les tâches manuelles...'
    },
    {
      id: 'repetitiveTasks',
      question: 'Identifiez-vous des tâches répétitives et chronophages dans votre quotidien ou celui de vos équipes ? Si oui, lesquelles ?',
      inputType: 'text',
      placeholder: 'Ex: Saisie de données, réponses aux emails fréquents...'
    },
    {
      id: 'iaUsage',
      question: 'Utilisez-vous déjà des outils d\'IA ou d\'automatisation ? Si oui, lesquels ?',
      options: ['Oui, quelques outils (ChatGPT, etc.)', 'Oui, des solutions plus avancées', 'Non, pas encore', 'Je ne suis pas sûr']
    },
    {
      id: 'budget',
      question: 'Pourriez-vous me donner une idée de votre budget mensuel envisagé pour des solutions IA/automatisation ?',
      options: ['Moins de 500€', '500€ - 1500€', '1500€ - 5000€', 'Plus de 5000€', 'Je préfère en discuter']
    }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{ type: 'bot', text: chatFlow[0].question, options: chatFlow[0].options }]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleOptionSelect = (option, questionId) => {
    setMessages(prev => [...prev, { type: 'user', text: option }]);
    setUserResponses(prev => ({ ...prev, [questionId]: option }));
    
    setIsTyping(true);
    setTimeout(() => {
      const nextStep = currentStep + 1;
      if (nextStep < chatFlow.length) {
        setCurrentStep(nextStep);
        setMessages(prev => [...prev, { type: 'bot', text: chatFlow[nextStep].question, options: chatFlow[nextStep].options, inputType: chatFlow[nextStep].inputType, placeholder: chatFlow[nextStep].placeholder }]);
      } else {
        setMessages(prev => [...prev, { type: 'bot', text: 'Excellent ! Pour vous fournir un diagnostic IA ultra-personnalisé et des recommandations adaptées, veuillez me communiquer votre prénom et votre adresse email.' }]);
        setShowEmailForm(true);
      }
      setIsTyping(false);
    }, 1500);
  };

  const handleTextInput = (text, questionId) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { type: 'user', text: text }]);
    setUserResponses(prev => ({ ...prev, [questionId]: text }));
    
    setIsTyping(true);
    setTimeout(() => {
      const nextStep = currentStep + 1;
      if (nextStep < chatFlow.length) {
        setCurrentStep(nextStep);
        setMessages(prev => [...prev, { type: 'bot', text: chatFlow[nextStep].question, options: chatFlow[nextStep].options, inputType: chatFlow[nextStep].inputType, placeholder: chatFlow[nextStep].placeholder }]);
      } else {
        setMessages(prev => [...prev, { type: 'bot', text: 'Excellent ! Pour vous fournir un diagnostic IA ultra-personnalisé et des recommandations adaptées, veuillez me communiquer votre prénom et votre adresse email.' }]);
        setShowEmailForm(true);
      }
      setIsTyping(false);
    }, 1500);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail || !userName) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez renseigner votre prénom et email pour continuer.",
        variant: "destructive"
      });
      return;
    }
    
    // Save to localStorage (can be removed if Supabase is primary storage)
    localStorage.setItem('simplAizerUser', JSON.stringify({ name: userName, email: userEmail }));

    // Save to Supabase
    try {
      const { data, error } = await supabase
        .from('leads') // Assuming you have a 'leads' table
        .insert([{ name: userName, email: userEmail, responses: userResponses, created_at: new Date() }]);

      if (error) {
        console.error('Error saving lead to Supabase:', error);
        toast({
          title: "Erreur d'enregistrement",
          description: "Nous n'avons pas pu enregistrer vos informations. Veuillez réessayer.",
          variant: "destructive"
        });
      } else {
        console.log('Lead saved to Supabase:', data);
         toast({
          title: "Informations enregistrées!",
          description: "Vos informations ont été sauvegardées avec succès.",
        });
      }
    } catch (err) {
      console.error('Supabase client error:', err);
       toast({
          title: "Erreur technique",
          description: "Une erreur technique est survenue. Veuillez réessayer.",
          variant: "destructive"
        });
    }


    setIsTyping(true);
    setMessages(prev => [...prev, { type: 'user', text: `Prénom: ${userName}, Email: ${userEmail}` }]);
    setShowEmailForm(false);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `Merci ${userName} ! Votre diagnostic personnalisé est en cours de préparation... Un instant s'il vous plaît.`
      }]);
      setIsTyping(false);
    }, 1000);

    setTimeout(() => {
      setIsTyping(true);
      const diagnosticSummary = {
        automatisable: Math.floor(Math.random() * 40) + 50, 
        tempsGagne: Math.floor(Math.random() * 15) + 5, 
        roiEstime: Math.floor(Math.random() * 35) + 15, 
      };
      
      const diagnosticMessage = {
        type: 'bot',
        text: `Voici un aperçu de votre potentiel IA avec SimplAizer :\n\n- **Potentiel d'automatisation :** ${diagnosticSummary.automatisable}%\n- **Gain de temps hebdomadaire estimé :** ${diagnosticSummary.tempsGagne} heures\n- **ROI potentiel (1ère année) :** +${diagnosticSummary.roiEstime}%\n\nNous avons identifié plusieurs solutions adaptées à votre situation. Souhaitez-vous explorer nos recommandations ?`,
        isDiagnostic: true,
        diagnosticData: diagnosticSummary,
        recommendations: [
          { label: "Consulting IA Stratégique", action: "/solutions/prestations#consulting" },
          { label: "Développement d'Automatisations", action: "/solutions/prestations#automation" },
          { label: "Formation IA pour vos équipes", action: "/solutions/prestations#training" },
          { label: "Prendre un RDV gratuit", action: "appointment" }
        ]
      };
      setMessages(prev => [...prev, diagnosticMessage]);
      setShowDiagnostic(true);
      setIsTyping(false);
      toast({
        title: "Diagnostic Prêt !",
        description: "Votre diagnostic IA personnalisé est disponible dans le chat.",
      });
    }, 3000);
  };

  const handleRecommendationClick = (action) => {
    if (action === "appointment") {
      window.open('https://calendly.com/votre-lien-calendly', '_blank');
      toast({
        title: "Redirection vers Calendly",
        description: "Vous allez être redirigé pour prendre rendez-vous.",
      });
    } else {
      setIsOpen(false); 
      window.location.hash = action; 
      toast({
        title: "Navigation...",
        description: `Vous êtes redirigé vers la section appropriée.`,
      });
    }
  };

  const MessageInput = ({ onSend, placeholder }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (inputValue.trim()) {
        onSend(inputValue.trim(), chatFlow[currentStep].id);
        setInputValue('');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-1">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder || "Écrivez votre message..."}
          className="flex-1 p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
        />
        <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700 rounded-lg">
          <Send className="w-5 h-5" />
        </Button>
      </form>
    );
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="fixed bottom-4 right-4 w-full max-w-md h-[calc(100vh-4rem)] max-h-[700px] glass-effect rounded-xl shadow-2xl z-[1000] flex flex-col overflow-hidden border border-blue-500/30"
          style={{
            '@media (min-width: 768px)': {
              bottom: '2rem',
              right: '2rem',
            }
          }}
        >
          <header className="flex items-center justify-between p-4 border-b border-blue-500/20 bg-slate-800/50">
            <div className="flex items-center space-x-3">
              <img src={agentAvatar} alt={`${agentName} avatar`} className="w-10 h-10 rounded-full object-cover border-2 border-blue-500" />
              <div>
                <div className="font-semibold text-lg">{agentName}</div>
                <div className="text-sm text-blue-400 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
                  En ligne
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white hover:bg-slate-700/50">
              <X className="w-6 h-6" />
            </Button>
          </header>

          <main className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                {msg.type === 'bot' && <img src={agentAvatar} alt="bot avatar" className="w-8 h-8 rounded-full mr-2 self-end flex-shrink-0 object-cover" />}
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm md:text-base ${msg.type === 'bot' ? 'bg-blue-600 text-white rounded-bl-none' : 'bg-slate-700 text-gray-200 rounded-br-none'}`}>
                  <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  {msg.options && !showEmailForm && !showDiagnostic && (
                    <div className="mt-3 grid grid-cols-1 gap-2">
                      {msg.options.map((opt, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          onClick={() => handleOptionSelect(opt, chatFlow[currentStep].id)}
                          className="w-full justify-start text-left bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30 text-white"
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                  )}
                  {msg.isDiagnostic && msg.recommendations && (
                    <div className="mt-4 pt-3 border-t border-blue-400/50">
                      <h4 className="font-semibold mb-2 text-blue-300">Nos recommandations pour vous :</h4>
                      <div className="space-y-2">
                        {msg.recommendations.map((rec, i) => (
                          <Button
                            key={i}
                            variant="default"
                            onClick={() => handleRecommendationClick(rec.action)}
                            className="w-full justify-start bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-md"
                          >
                            <ArrowRight className="w-4 h-4 mr-2" /> {rec.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {msg.type === 'user' && <User className="w-8 h-8 rounded-full ml-2 p-1.5 bg-slate-600 text-slate-300 self-end flex-shrink-0" />}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start items-end space-x-1 p-2"
              >
                <img src={agentAvatar} alt="bot avatar" className="w-8 h-8 rounded-full mr-1 flex-shrink-0 object-cover" />
                <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-bl-none flex space-x-1">
                  <span className="typing-indicator w-1.5 h-1.5 bg-white rounded-full animation-delay-0"></span>
                  <span className="typing-indicator w-1.5 h-1.5 bg-white rounded-full animation-delay-200"></span>
                  <span className="typing-indicator w-1.5 h-1.5 bg-white rounded-full animation-delay-400"></span>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </main>

          <footer className="p-3 border-t border-blue-500/20 bg-slate-800/50">
            {showEmailForm ? (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Votre prénom"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  required
                />
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  required
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-md py-3">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Débloquer mon Diagnostic IA
                </Button>
              </form>
            ) : messages.length > 0 && chatFlow[currentStep]?.inputType === 'text' && !showDiagnostic ? (
              <MessageInput onSend={handleTextInput} placeholder={chatFlow[currentStep].placeholder} />
            ) : !showDiagnostic && messages.length > 0 && !chatFlow[currentStep]?.options && !isTyping && !showEmailForm ? (
               <p className="text-center text-sm text-gray-400">Le diagnostic est prêt. Entrez vos informations pour le recevoir ou fermez cette fenêtre.</p>
            ) : null}
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWidget;
