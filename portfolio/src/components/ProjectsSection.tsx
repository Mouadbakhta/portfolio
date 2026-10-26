import React, { useState } from 'react';
import { PROJECTS, Project, Language } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { ExternalLink, Github, Layers, ArrowUpRight, CheckCircle2, AlertCircle, Clock, Server, Cpu, Rocket } from 'lucide-react';

interface ProjectsSectionProps {
  language: Language;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ language }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'java-devops' | 'data-ml' | 'fullstack-systems'>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedFilter);

  const filterTabs = [
    {
      key: 'all',
      label: language === 'en' ? 'All Projects' : 'Tous les Projets',
      count: PROJECTS.length
    },
    {
      key: 'java-devops',
      label: language === 'en' ? 'Java Back-End & DevOps' : 'Java Back-End & DevOps',
      count: PROJECTS.filter(p => p.category === 'java-devops').length
    },
    {
      key: 'data-ml',
      label: language === 'en' ? 'Data & MLOps' : 'Data & MLOps',
      count: PROJECTS.filter(p => p.category === 'data-ml').length
    },
    {
      key: 'fullstack-systems',
      label: language === 'en' ? 'Systems & Enterprise' : 'Systèmes & Entreprise',
      count: PROJECTS.filter(p => p.category === 'fullstack-systems').length
    },
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Featured Real-World Implementations' : 'Réalisations & Projets à Fort Impact'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'en' ? 'Engineering Projects & System Architecture' : "Projets d'Ingénierie & Architecture"}
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-xs sm:text-base">
            {language === 'en'
              ? 'Real-world problem solvers: resilient microservices, automated CI/CD pipelines, and high-throughput streaming systems.'
              : 'Sélection de projets répondant à des besoins réels en production : architectures microservices sécurisées, pipelines CI/CD résilients et systèmes de streaming Big Data.'}
          </p>

          {/* User Flagged Deployment Note */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Rocket className="w-3.5 h-3.5 animate-pulse" />
            <span>
              {language === 'en'
                ? '4 Projects in Cloud Deployment Pipeline: OkaneTransfer, Fraud Detection, OrcaML, Delivery Optimization'
                : '4 Projets en Déploiement Cloud : OkaneTransfer, Détection Fraude, OrcaML, Optimisation Livraison'}
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedFilter(tab.key as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                selectedFilter === tab.key
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                selectedFilter === tab.key ? 'bg-cyan-400 text-black font-bold' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group flex flex-col justify-between bg-zinc-900/60 border rounded-2xl p-5 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 relative overflow-hidden backdrop-blur-sm ${
                project.isDeployingSoon
                  ? 'border-amber-500/30 hover:border-amber-500/60'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {/* Top ambient shine */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-2xl rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition" />

              <div>
                {/* Meta Badges */}
                <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-zinc-800 text-cyan-400 border border-cyan-500/20">
                    {project.categoryLabel[language]}
                  </span>
                  
                  {/* Deployment Status Pill */}
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono ${
                    project.isDeployingSoon
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                      : 'bg-zinc-950 text-zinc-300 border border-zinc-800'
                  }`}>
                    {project.isDeployingSoon ? (
                      <Rocket className="w-3 h-3 text-amber-400" />
                    ) : (
                      <Clock className="w-3 h-3 text-cyan-400" />
                    )}
                    <span>{project.demoStatus[language]}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition tracking-tight mb-2">
                  {project.title}
                </h3>

                {/* Short Overview */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                  {project.shortDescription[language]}
                </p>

                {/* Problem Solved Box */}
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/30 mb-5">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-xs mb-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{language === 'en' ? 'Problem Solved:' : 'Besoin Résolu :'}</span>
                  </div>
                  <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
                    {project.problemSolved[language]}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-950/80 text-zinc-400 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-zinc-950/80 text-zinc-500 border border-zinc-800">
                      +{project.technologies.length - 6}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition group/btn cursor-pointer"
                >
                  <span>{language === 'en' ? 'Architecture Deep-Dive' : "Étude d'Architecture & Code"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.gitHubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition"
                    title={language === 'en' ? 'Source code on GitHub' : 'Code source sur GitHub'}
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  {/* Deployment Status Button */}
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                      project.isDeployingSoon
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                    title={project.demoNote[language]}
                  >
                    {project.isDeployingSoon ? (
                      <Rocket className="w-3 h-3 text-amber-400" />
                    ) : (
                      <Clock className="w-3 h-3 text-cyan-400" />
                    )}
                    <span>{language === 'en' ? 'Deployment' : 'Déploiement'}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modal Dialog */}
      <ProjectModal
        project={activeModalProject}
        language={language}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
