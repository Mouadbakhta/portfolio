import React, { useState } from 'react';
import { Bot, FileText, Github, Linkedin, Menu, X, ArrowUpRight, Globe, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, Language } from '../data/portfolioData';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, onToggleLanguage, onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Single-word or concise labels that never wrap awkwardly
  const navLinks = language === 'en' ? [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ] : [
    { label: 'À Propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Projets', href: '#projects' },
    { label: 'Expérience', href: '#experience' },
    { label: 'Formation', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-zinc-950/90 border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo (Left) */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="relative">
            <img
              src="/profil.jpg"
              alt="Mouad Bakhta"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-cyan-500/50 group-hover:ring-cyan-400 transition"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition whitespace-nowrap">
              MOUAD BAKHTA
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-tight hidden sm:inline whitespace-nowrap">
              Java Backend & DevOps
            </span>
          </div>
        </a>

        {/* Desktop Nav Links (Center - only visible on xl to prevent overlapping) */}
        <nav className="hidden xl:flex items-center gap-6 text-xs lg:text-sm text-zinc-300 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Group */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Language Switcher Pill */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 transition cursor-pointer shrink-0"
            title={language === 'en' ? 'Passer en Français' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className={language === 'en' ? 'text-cyan-400 font-bold' : 'text-zinc-400'}>EN</span>
            <span className="text-zinc-600">/</span>
            <span className={language === 'fr' ? 'text-cyan-400 font-bold' : 'text-zinc-400'}>FR</span>
          </button>

          {/* AI Chatbot Button (Clean & Compact) */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/25 transition shadow-sm cursor-pointer shrink-0"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">
              {language === 'en' ? 'AI Assistant' : 'Assistant IA'}
            </span>
            <span className="sm:hidden">IA</span>
          </button>

          {/* Single Focused Java & DevOps CV */}
          <a
            href={PERSONAL_INFO.cvJavaDevops}
            download="CV_Mouad_Bakhta_Java_DevOps.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition shadow-sm shrink-0 whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>CV (PDF)</span>
          </a>

          {/* Social Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 pl-1 border-l border-zinc-800">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-400 hover:text-white transition"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-400 hover:text-cyan-400 transition"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile & Tablet Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:bg-zinc-900 hover:text-cyan-400 transition border border-zinc-850"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
            <a
              href={PERSONAL_INFO.cvJavaDevops}
              target="_blank"
              rel="noreferrer"
              download="CV_Mouad_Bakhta_Java_DevOps.pdf"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-950/40 text-cyan-300 border border-cyan-800/60 hover:bg-cyan-900/40 transition"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>{language === 'en' ? 'Download Java & DevOps CV (PDF)' : 'Télécharger le CV Java & DevOps (PDF)'}</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </a>

            <div className="flex items-center justify-around pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-cyan-400"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
