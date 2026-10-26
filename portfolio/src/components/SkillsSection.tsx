import React, { useState } from 'react';
import { SKILL_CATEGORIES, Language } from '../data/portfolioData';
import { Cpu, Server, Database, Cloud, Terminal, CheckCircle2 } from 'lucide-react';

interface SkillsSectionProps {
  language: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Server className="w-5 h-5 text-cyan-400" />;
      case 1:
        return <Cloud className="w-5 h-5 text-emerald-400" />;
      case 2:
        return <Cpu className="w-5 h-5 text-purple-400" />;
      default:
        return <Database className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Core Technical Stack' : 'Stack & Compétences Techniques'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'en' ? 'Java Back-End, DevOps & Data Mastery' : 'Maîtrise Back-End, DevOps & Data'}
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-xs sm:text-base">
            {language === 'en'
              ? 'Specialized in the Java / Spring Boot enterprise ecosystem and DevOps automation, complemented by streaming data architectures and MLOps.'
              : 'Une spécialisation pointue en écosystème Java / Spring Boot et automatisation DevOps, complétée par une solide capacité en streaming et modèles MLOps.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                activeCategory === idx
                  ? 'bg-zinc-800 text-white border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-zinc-800'
              }`}
            >
              {getCategoryIcon(idx)}
              <span>{cat.category[language]}</span>
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 sm:p-8 backdrop-blur-sm">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-zinc-800/80">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                {getCategoryIcon(activeCategory)}
                {SKILL_CATEGORIES[activeCategory].category[language]}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                {SKILL_CATEGORIES[activeCategory].description[language]}
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500 bg-zinc-950 px-3 py-1 rounded-md border border-zinc-800 w-fit">
              {SKILL_CATEGORIES[activeCategory].skills.length} {language === 'en' ? 'Core Technologies' : 'Technologies Clés'}
            </span>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {SKILL_CATEGORIES[activeCategory].skills.map((skill) => (
              <div
                key={skill.name}
                className="group flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-zinc-950/70 hover:bg-zinc-800/70 border border-zinc-800/80 hover:border-cyan-500/40 transition-all duration-200"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-zinc-900 p-1.5 flex items-center justify-center shrink-0 border border-zinc-800 overflow-hidden group-hover:scale-105 transition">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-xs sm:text-sm text-zinc-200 group-hover:text-white truncate">
                    {skill.name}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-400 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{skill.level[language]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Core Concepts Callout */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
            <h4 className="text-sm font-semibold text-cyan-300 mb-1">
              {language === 'en' ? 'Architecture & Security' : 'Architecture & Sécurité'}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {language === 'en'
                ? 'Design patterns, clean code, Spring Security RBAC with stateless JWT tokens, input validation, and auditability.'
                : 'Design patterns, Clean Architecture, Spring Security avec RBAC & tokens JWT stateless, validation stricte et auditabilité.'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
            <h4 className="text-sm font-semibold text-emerald-300 mb-1">
              {language === 'en' ? 'Automation & Reliability' : 'Automatisation & Fiabilité'}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {language === 'en'
                ? 'Reproducible builds with multi-stage Dockerfiles, Docker Compose healthcheck sequencing, and GitHub Actions CI/CD.'
                : 'Builds reproductibles avec Dockerfiles multi-stage, orchestration Docker Compose avec healthchecks et tests de charge.'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
            <h4 className="text-sm font-semibold text-purple-300 mb-1">
              {language === 'en' ? 'Distributed Event Streaming' : 'Data & Streaming Événementiel'}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {language === 'en'
                ? 'Kafka messaging, Apache Camel EIP mediation, Spark Streaming ingestion, and SMOTE handling for imbalanced data.'
                : 'Messagerie Kafka, médiation Camel EIP, ingestion continue Spark Streaming et traitement des déséquilibres avec SMOTE.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
