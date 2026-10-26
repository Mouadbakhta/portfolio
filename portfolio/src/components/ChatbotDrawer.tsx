import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCw, Key, ShieldCheck, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO, Language } from '../data/portfolioData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface ChatbotDrawerProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({ isOpen, language, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [customKey, setCustomKey] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or update welcome message based on language
  useEffect(() => {
    const welcomeText = language === 'en'
      ? `Hello! I am the official AI Assistant for **Mouad Bakhta**, powered by RAG (Retrieval-Augmented Generation) and connected to verified data from his CV, internships, and GitHub repositories.

I can provide detailed answers about:
- **Java Back-End Mastery:** Spring Boot 3, Spring Security, JWT, Microservices, Netflix Eureka, OpenFeign, Kafka, Camel.
- **DevOps & Cloud Automation:** Multi-stage Dockerfiles, Docker Compose healthchecks, GitHub Actions CI/CD to GHCR, Linux VPS.
- **Key Deployment Projects:** OkaneTransfer, Real-Time Fraud Detection (Kafka/Spark/XGBoost), OrcaML (FastAPI/Celery), and Urban Delivery Routing.
- **Internship Availability:** Ready for an **End-of-Studies PFE Internship starting in February 2026**.

What would you like to know about Mouad?`
      : `Bonjour ! Je suis l'assistant IA officiel de **Mouad Bakhta**, propulsé par RAG (Retrieval-Augmented Generation) et connecté aux données vérifiées de ses CVs, stages et dépôts GitHub.

Je peux répondre à toutes vos questions :
- **Expertise Back-End Java :** Spring Boot 3, Spring Security, JWT, Microservices, Netflix Eureka, OpenFeign, Kafka, Camel.
- **DevOps & Cloud :** Dockerfiles multi-stage, Docker Compose avec healthchecks ordonnés, GitHub Actions CI/CD vers GHCR, VPS Linux.
- **Projets en Déploiement :** OkaneTransfer, Détection de Fraude Bancaire (Kafka/Spark/XGBoost), OrcaML (FastAPI/Celery) et Optimisation de Livraison.
- **Disponibilité Stage :** Disponible pour un **Stage de Fin d'Études (PFE) dès Février 2026**.

Que souhaitez-vous savoir sur Mouad ?`;

    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [language]);

  const suggestedQuestions = language === 'en' ? [
    "What is Mouad's Java & Spring Boot experience?",
    "Explain the Petclinic DevOps CI/CD architecture",
    "What problem does the Fraud Detection project solve?",
    "Tell me about his internship at Synertic (banking)",
    "How to hire Mouad for a PFE internship in February 2026?",
  ] : [
    "Quelles sont ses compétences en Spring Boot & Microservices ?",
    "Explique l'architecture DevOps du projet Petclinic",
    "Quel problème résout la Détection de Fraude en streaming ?",
    "Qu'a-t-il réalisé en stage chez Synertic (banque) ?",
    "Comment contacter Mouad pour son stage PFE en Février 2026 ?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language,
          customApiKey: customKey.trim() || undefined,
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error.');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || (language === 'en' ? 'Unable to generate response. Please try again.' : "Désolé, je n'ai pas pu générer une réponse. Veuillez réessayer."),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: language === 'en'
          ? "A temporary network issue occurred. You can contact Mouad directly at **bakhtamouad1@gmail.com** or **+212 693-380227**."
          : "Une erreur temporaire est survenue. N'hésitez pas à contacter directement Mouad à **bakhtamouad1@gmail.com** ou au **+212 693-380227**.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: language === 'en'
          ? "Conversation reset. Feel free to ask any question regarding Mouad Bakhta's skills, projects, or PFE availability!"
          : "Conversation réinitialisée. Posez-moi une question sur le profil, les projets ou les compétences de Mouad Bakhta !",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Simple Markdown formatter
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-xs sm:text-sm text-cyan-300 mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="font-bold text-sm sm:text-base text-white mt-2 mb-1">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const content = line.trim().substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
            <span className="text-zinc-200" dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p
          key={idx}
          className="text-zinc-200 leading-relaxed my-0.5"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    });
  };

  const formatInline = (str: string) => {
    let res = str.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
    res = res.replace(/`(.*?)`/g, '<code class="bg-zinc-800 text-cyan-300 px-1 py-0.5 rounded text-[11px] font-mono">$1</code>');
    res = res.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-cyan-400 underline hover:text-cyan-300">$1</a>');
    return res;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full sm:max-w-md md:max-w-lg bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="p-3.5 sm:p-5 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/profil.jpg"
                alt="Mouad Bakhta"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/50 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white">
                  {language === 'en' ? "Mouad's AI Assistant" : "Assistant IA de Mouad"}
                </h3>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Groq 120B & Gemini
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                {language === 'en' ? 'Grounded on CV, GitHub & Stages' : 'Grounded sur CV, GitHub & Expériences'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className="p-2 text-zinc-400 hover:text-cyan-400 rounded-lg hover:bg-zinc-800 transition"
              title="API Key Settings / Configuration"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Custom API Key Drawer Panel */}
        {showKeyConfig && (
          <div className="p-3 bg-zinc-900 border-b border-zinc-800 text-xs space-y-2 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'en' ? 'AI Key Status: Active' : 'Statut Clé IA : Actif'}</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              {language === 'en'
                ? 'Server environment key is loaded automatically. You can also supply a custom Gemini API key below:'
                : 'La clé Gemini du serveur est active par défaut. Vous pouvez également saisir une clé personnalisée :'}
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                placeholder="AIzaSy... (Optionnel)"
                className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white"
              />
              <button
                onClick={() => setShowKeyConfig(false)}
                className="px-3 py-1 bg-cyan-600 text-white rounded-lg font-medium text-xs"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 sm:gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-xs'
                    : 'bg-zinc-900 border border-zinc-800/90 text-zinc-200 rounded-bl-xs'
                }`}
              >
                {msg.sender === 'assistant' ? (
                  <div className="space-y-1">{renderFormattedText(msg.text)}</div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                )}
                <div
                  className={`text-[10px] mt-2 font-mono ${
                    msg.sender === 'user' ? 'text-cyan-100 text-right' : 'text-zinc-500 text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-300" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-xs text-zinc-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>{language === 'en' ? 'Retrieving profile facts & generating response...' : 'Recherche dans les projets et génération de la réponse...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Strip */}
        <div className="p-2.5 sm:p-3 border-t border-zinc-900 bg-zinc-950">
          <div className="text-[10px] sm:text-[11px] font-semibold text-zinc-500 mb-1.5 px-1 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{language === 'en' ? 'Frequently Asked by Recruiters' : 'Questions Fréquentes des Recruteurs'}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={loading}
                className="shrink-0 px-2.5 py-1.5 rounded-lg text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-cyan-300 border border-zinc-800 transition cursor-pointer text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Bar */}
        <div className="p-3 sm:p-4 border-t border-zinc-800 bg-zinc-900/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'en' ? 'Ask about Mouad (e.g. Spring Boot, Kafka, PFE date)...' : 'Posez une question sur Mouad (ex: Spring Boot, Kafka, stage PFE)...'}
              disabled={loading}
              className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:hover:bg-cyan-600 text-white font-medium transition cursor-pointer shrink-0 shadow-md"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-zinc-500 mt-2 text-center">
            {language === 'en' ? 'Powered by Google Gemini 3.1 Flash Lite & Grounded RAG Architecture.' : 'Propulsé par Google Gemini 3.1 Flash Lite & Architecture RAG.'}
          </div>
        </div>

      </div>
    </div>
  );
};
