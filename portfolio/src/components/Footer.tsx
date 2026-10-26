import React from 'react';
import { PERSONAL_INFO, Language } from '../data/portfolioData';
import { Github, Linkedin, Mail, FileText, ArrowUp } from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenChat }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 sm:mb-10">
          
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-white tracking-tight">
                THE-<span className="text-cyan-400">MOUAD-BAKHTA</span>
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              {language === 'en'
                ? 'Software Engineering Student at ENSA Marrakech. Specialized in distributed Java / Spring Boot architectures, DevOps automation, and streaming data pipelines.'
                : 'Élève Ingénieur en Génie Logiciel à l’ENSA Marrakech. Spécialisé en architectures distribuées Java / Spring Boot, DevOps et pipelines de données streaming.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-cyan-400 border border-zinc-800 transition"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-1.5">
              <li><a href="#about" className="hover:text-cyan-400 transition">{language === 'en' ? 'About' : 'À Propos'}</a></li>
              <li><a href="#skills" className="hover:text-cyan-400 transition">{language === 'en' ? 'Skills' : 'Compétences'}</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition">{language === 'en' ? 'Projects' : 'Projets'}</a></li>
              <li><a href="#experience" className="hover:text-cyan-400 transition">{language === 'en' ? 'Experience' : 'Expérience'}</a></li>
              <li><a href="#education" className="hover:text-cyan-400 transition">{language === 'en' ? 'Education' : 'Formation'}</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition">{language === 'en' ? 'Contact' : 'Contact'}</a></li>
            </ul>
          </div>

          {/* Col 3: Resources & CV */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              {language === 'en' ? 'Curriculum Vitae' : 'Curriculum Vitae'}
            </h4>
            <div className="space-y-2">
              <a
                href={PERSONAL_INFO.cvJavaDevops}
                target="_blank"
                rel="noreferrer"
                download="Mouad_Bakhta_Java_DevOps.pdf"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-300 hover:text-white transition"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{language === 'en' ? 'Download CV (Java & DevOps)' : 'Télécharger CV (Java & DevOps)'}</span>
              </a>
              <a
                href="/portfolio-updated.zip"
                download="portfolio-updated.zip"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-300 hover:text-cyan-400 transition"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{language === 'en' ? 'Download Repo (.zip for Vercel)' : 'Télécharger Projet (.zip Vercel)'}</span>
              </a>
              <button
                onClick={onOpenChat}
                className="w-full text-left flex items-center justify-between p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 hover:bg-cyan-900/30 transition text-[11px] font-semibold cursor-pointer"
              >
                <span>{language === 'en' ? 'Ask AI Assistant (RAG)' : "Tester l'Assistant IA (RAG)"}</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <div>
            © {new Date().getFullYear()} Mouad Bakhta. {language === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition cursor-pointer"
          >
            <span>{language === 'en' ? 'Back to top' : 'Retour en haut'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
