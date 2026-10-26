import React from 'react';
import { EDUCATION, Language } from '../data/portfolioData';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

interface EducationSectionProps {
  language: Language;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ language }) => {
  return (
    <section id="education" className="py-16 sm:py-20 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Academic Background' : 'Formation Académique'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'en' ? 'Elite Engineering & Preparatory Classes' : 'Excellence Académique & Classes Préparatoires'}
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-xs sm:text-base">
            {language === 'en'
              ? 'Rigorous mathematical and physical science foundations from CPGE (MPSI/MP), followed by premier software engineering training at ENSA Marrakech.'
              : 'Une base scientifique et mathématique solide acquise en classes préparatoires MPSI/MP, suivie d’une formation d’ingénieur d’État de premier plan à l’ENSA Marrakech.'}
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION.map((edu, idx) => (
            <div
              key={edu.institution}
              className={`flex flex-col justify-between bg-zinc-900/50 border rounded-2xl p-5 sm:p-7 backdrop-blur-sm transition-all duration-200 ${
                idx === 0
                  ? 'border-cyan-500/40 shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/20'
                  : 'border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div>
                {/* Degree Badge & Date */}
                <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono">
                  <span className={`px-2.5 py-0.5 rounded-full ${
                    idx === 0 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {idx === 0
                      ? (language === 'en' ? 'Engineering Degree' : 'Cycle Ingénieur')
                      : idx === 1
                      ? 'CPGE MPSI/MP'
                      : (language === 'en' ? 'High School Diploma' : 'Baccalauréat')}
                  </span>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                {/* Degree Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
                  {edu.degree[language]}
                </h3>

                {/* Institution & Location */}
                <div className="text-xs font-semibold text-cyan-400 mb-4">
                  {edu.institution}
                  <div className="text-zinc-500 font-normal flex items-center gap-1 mt-0.5 font-mono">
                    <MapPin className="w-3 h-3" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {edu.description[language]}
                </p>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-1.5">
                {edu.highlights[language].map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-[11px] text-zinc-400">
                    <Award className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
