import React from 'react';
import { X, Github, ExternalLink, Check, Copy, AlertCircle, Layers, Server, Code, Terminal, Clock, Rocket } from 'lucide-react';
import { Project, Language } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  language: Language;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, language, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.highlightCode) {
      navigator.clipboard.writeText(project.highlightCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800 bg-zinc-950/70 sticky top-0 z-20">
          <div className="flex flex-col gap-1 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {project.categoryLabel[language]}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                project.isDeployingSoon ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-zinc-800 text-zinc-300'
              }`}>
                {project.badge[language]}
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Deployment Announcement if flagged */}
          {project.isDeployingSoon && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/30 text-zinc-200">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm mb-1.5">
                <Rocket className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>{language === 'en' ? 'Cloud Deployment in Progress' : 'Déploiement Cloud en Cours'}</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {language === 'en'
                  ? 'This project is actively being prepared for live cloud hosting (Docker / VPS container pipeline). While the live public link is finishing setup, the full source code, architecture diagrams, and one-command Docker Compose local execution files are ready on GitHub below.'
                  : 'Ce projet fait partie des 4 réalisations en cours de déploiement cloud public. Pendant la finalisation de l’hébergement en ligne, l’ensemble du code source, la suite de tests et l’orchestration Docker Compose locale sont immédiatement consultables et reproductibles sur GitHub.'}
              </p>
            </div>
          )}

          {/* Problem Solved Callout */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-zinc-200">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs sm:text-sm mb-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{language === 'en' ? 'Real Problem Solved' : 'Problématique Métier & Besoin Résolu'}</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.problemSolved[language]}
            </p>
          </div>

          {/* Architecture & Engineering Decisions */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>{language === 'en' ? 'Architecture & Technical Decisions' : 'Architecture & Choix Techniques'}</span>
            </h4>
            <ul className="space-y-2.5">
              {project.architectureDetails[language].map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Metrics */}
          {project.stats && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {project.stats.map((st, sIdx) => (
                <div key={sIdx} className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-center">
                  <div className="text-sm sm:text-lg font-bold text-cyan-400 font-mono">{st.value}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{st.label[language]}</div>
                </div>
              ))}
            </div>
          )}

          {/* Code Highlight */}
          {project.highlightCode && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                  {project.highlightCode.filename}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">{language === 'en' ? 'Copied' : 'Copié'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{language === 'en' ? 'Copy' : 'Copier'}</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                <code>{project.highlightCode.code}</code>
              </pre>
            </div>
          )}

          {/* Technologies Stack */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              {language === 'en' ? 'Technologies & Tools Used' : 'Technologies & Outils Mobilisés'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deployment Status Callout */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-3 text-xs text-zinc-400">
            <Clock className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-zinc-200">
                {language === 'en' ? 'Deployment Status: ' : 'Statut de Déploiement : '}
              </span>
              <span>{project.demoNote[language]}</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-zinc-800 bg-zinc-950/80 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20">
          <a
            href={project.gitHubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition"
          >
            <Github className="w-4 h-4" />
            <span>{language === 'en' ? 'Inspect GitHub Code' : 'Voir le Code sur GitHub'}</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition cursor-pointer"
            >
              {language === 'en' ? 'Close' : 'Fermer'}
            </button>
            <a
              href={project.gitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition"
            >
              <span>{language === 'en' ? 'Open Repository' : 'Accéder au Dépôt'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
