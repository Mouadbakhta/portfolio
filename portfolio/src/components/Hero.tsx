import React from 'react';
import { ArrowRight, Bot, Code2, Database, Download, GitBranch, Github, Linkedin, Mail, MapPin, Server, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO, Language } from '../data/portfolioData';

interface HeroProps {
  language: Language;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onOpenChat }) => {
  return (
    <section id="about" className="relative pt-10 pb-16 md:pt-20 md:pb-28 overflow-hidden">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[300px] sm:h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-purple-600/15 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill - February 2026 */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>{PERSONAL_INFO.opportunityGoal[language]}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5">
              {language === 'en' ? (
                <>
                  Java Back-End &{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                    DevOps Engineer
                  </span>
                  <br />
                  <span className="text-xl sm:text-3xl lg:text-4xl font-semibold text-zinc-300">
                    Distributed Systems & Event-Driven Architecture
                  </span>
                </>
              ) : (
                <>
                  Ingénieur Back-End{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                    Java & DevOps
                  </span>
                  <br />
                  <span className="text-xl sm:text-3xl lg:text-4xl font-semibold text-zinc-300">
                    Systèmes Distribués & Architectures Événementielles
                  </span>
                </>
              )}
            </h1>

            {/* Subhead / Bio */}
            <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl leading-relaxed mb-8">
              {PERSONAL_INFO.bio[language]}
            </p>

            {/* Interactive Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <Server className="w-3.5 h-3.5 text-cyan-400" />
                Spring Boot & Cloud Microservices
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                Docker, CI/CD & Linux VPS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                <Database className="w-3.5 h-3.5 text-purple-400" />
                Kafka, Spark & XGBoost
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>{language === 'en' ? 'Explore Projects' : 'Explorer les Projets'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenChat}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-zinc-900/90 hover:bg-zinc-800 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-md cursor-pointer"
              >
                <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>{language === 'en' ? 'Ask AI Assistant (RAG)' : "Interroger l'Assistant IA"}</span>
              </button>

              <a
                href={PERSONAL_INFO.cvJavaDevops}
                download="CV_Mouad_Bakhta_Java_DevOps.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 transition"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>{language === 'en' ? 'Download CV' : 'Télécharger CV'}</span>
              </a>
            </div>

            {/* Contact quick strip */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                <a href="mailto:bakhtamouad1@gmail.com" className="hover:text-cyan-400 transition">
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition flex items-center gap-1 text-zinc-300"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition flex items-center gap-1 text-zinc-300"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Profile Card + Terminal Snippet */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <div className="relative w-full max-w-sm">
              {/* Outer Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30 blur-xl opacity-75" />

              {/* Profile Card Container */}
              <div className="relative bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Photo & Identity */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <img
                      src="/profil.jpg"
                      alt="Mouad Bakhta"
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-cyan-500/40 shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-zinc-900 rounded-full flex items-center justify-center" title="Ready for PFE Feb 2026">
                      <span className="w-1.5 h-1.5 bg-white rounded-full" />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Mouad Bakhta</h3>
                    <p className="text-xs text-cyan-400 font-mono">
                      {language === 'en' ? 'Java Back-End & DevOps' : 'Ingénieur Back-End & DevOps'}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">ENSA Marrakech (2024–Present)</p>
                  </div>
                </div>

                {/* Key Metrics / Highlights */}
                <div className="grid grid-cols-2 gap-2.5 mb-5 text-center">
                  <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-2.5 sm:p-3">
                    <div className="text-lg sm:text-xl font-bold text-white font-mono">Feb 2026</div>
                    <div className="text-[11px] text-zinc-400">{language === 'en' ? 'PFE Start Date' : 'Début Stage PFE'}</div>
                  </div>
                  <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-2.5 sm:p-3">
                    <div className="text-lg sm:text-xl font-bold text-cyan-400 font-mono">2 Stages</div>
                    <div className="text-[11px] text-zinc-400">Synertic & Marsa Maroc</div>
                  </div>
                  <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-2.5 sm:p-3">
                    <div className="text-lg sm:text-xl font-bold text-emerald-400 font-mono">MPSI / MP</div>
                    <div className="text-[11px] text-zinc-400">{language === 'en' ? 'Prep Classes' : 'Classes Prépa'}</div>
                  </div>
                  <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-2.5 sm:p-3">
                    <div className="text-lg sm:text-xl font-bold text-purple-400 font-mono">100% CI/CD</div>
                    <div className="text-[11px] text-zinc-400">{language === 'en' ? 'Automated Delivery' : 'Automatisé & Docker'}</div>
                  </div>
                </div>

                {/* Mini Dev Terminal */}
                <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/80 text-zinc-500">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-[10px]">bash - docker-compose</span>
                  </div>
                  <p className="text-cyan-400">$ git clone petclinic-devops</p>
                  <p className="text-zinc-400">$ docker compose up -d</p>
                  <p className="text-emerald-400">✔ config-server healthy</p>
                  <p className="text-emerald-400">✔ eureka-discovery healthy</p>
                  <p className="text-emerald-400">✔ 6 microservices running</p>
                </div>

                {/* Primary Focused CV Download */}
                <div className="mt-4 pt-3 border-t border-zinc-800/60">
                  <a
                    href={PERSONAL_INFO.cvJavaDevops}
                    download="Mouad_Bakhta_Java_DevOps.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition text-center shadow-md shadow-cyan-600/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Download Java & DevOps CV (PDF)' : 'Télécharger le CV Java & DevOps (PDF)'}</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
