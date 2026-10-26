import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { Language } from './data/portfolioData';
import { Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en'); // English default as requested
  const [chatOpen, setChatOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
        onOpenChat={() => setChatOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-full">
        <Hero
          language={language}
          onOpenChat={() => setChatOpen(true)}
        />
        <SkillsSection language={language} />
        <ProjectsSection language={language} />
        <ExperienceSection language={language} />
        <EducationSection language={language} />
        <ContactSection language={language} />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenChat={() => setChatOpen(true)}
      />

      {/* RAG Chatbot Drawer */}
      <ChatbotDrawer
        isOpen={chatOpen}
        language={language}
        onClose={() => setChatOpen(false)}
      />

      {/* Persistent Floating Chat Trigger (Bottom Right) */}
      {!chatOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
          <button
            onClick={() => setChatOpen(true)}
            className="group flex items-center gap-2.5 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-xl shadow-cyan-600/30 hover:scale-105 transition-all duration-200 cursor-pointer border border-cyan-400/40"
            aria-label="Open AI Assistant"
          >
            <div className="relative">
              <img
                src="/profil.jpg"
                alt="Mouad Bakhta"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover ring-2 ring-white/60"
              />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-cyan-700 animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] sm:text-xs font-bold leading-tight flex items-center gap-1">
                <span>{language === 'en' ? "Mouad's AI" : 'IA de Mouad'}</span>
                <Sparkles className="w-3 h-3 text-cyan-200" />
              </span>
              <span className="text-[9px] sm:text-[10px] text-cyan-100 leading-tight">
                {language === 'en' ? 'Ask anything' : 'Posez vos questions'}
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
