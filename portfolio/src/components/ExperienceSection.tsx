import React from 'react';
import { EXPERIENCES, Language } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, ExternalLink, CheckCircle } from 'lucide-react';

interface ExperienceSectionProps {
  language: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ language }) => {
  return (
    <section id="experience" className="py-16 sm:py-20 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Professional Experience' : 'Parcours Professionnel'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'en' ? 'Enterprise & Internship Track Record' : 'Expériences en Entreprise'}
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-xs sm:text-base">
            {language === 'en'
              ? 'Real-world impact in the banking and port logistics sectors, centering on microservices, event-driven data streaming, and IT infrastructure.'
              : 'Expériences concrètes dans les secteurs bancaire et logistique portuaire, axées sur les architectures distribuées, le routage de données et les outils métier.'}
          </p>
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.company}
              className="relative bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-5 sm:p-8 backdrop-blur-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                
                {/* Company & Role */}
                <div className="flex items-start gap-3.5">
                  {exp.logo && (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-zinc-700 shadow-md overflow-hidden">
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-xl font-bold text-white">
                        {exp.role[language]}
                      </h3>
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-cyan-400 transition"
                          title="Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-cyan-400 flex items-center gap-2 mt-0.5">
                      <span>{exp.company}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-xs text-zinc-400">{exp.sector[language]}</span>
                    </div>
                  </div>
                </div>

                {/* Date & Location Badges */}
                <div className="flex flex-row sm:flex-col sm:items-end justify-between sm:justify-start gap-1 text-xs text-zinc-400 font-mono">
                  <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-800">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>{exp.period[language]}</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-500">
                    <MapPin className="w-3 h-3" />
                    <span>{exp.location[language]}</span>
                  </div>
                </div>

              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {exp.description[language]}
              </p>

              {/* Achievements */}
              <div className="space-y-2 mb-5">
                {exp.achievements[language].map((ach, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Strip */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded text-[11px] font-mono bg-zinc-950 text-zinc-300 border border-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
