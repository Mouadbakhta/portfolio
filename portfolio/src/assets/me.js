import React from "react";
import profilImg from "../assets/profil.png"; // TODO: still not your face. Replace the file.
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export const assets = {
  profilImg,
};

export const navMenu = [
  "Home",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Activities",
  "About",
  "Contact",
];

// ============================================================
// SKILLS  — all icons below now point at files that exist,
// except TypeScript (see TODO).
// ============================================================
export const skillsData = [
  { icon: "/img/java.jpg", title: "Java" },
  { icon: "/img/springBoot.jpg", title: "Spring Boot" },
  { icon: "/img/springBoot.jpg", title: "Spring MVC" },
  { icon: "/img/springSec.jpg", title: "Spring Security" },
  { icon: "/img/jwt.png", title: "JWT" },
  { icon: "/img/kafka.png", title: "Apache Kafka" },
  { icon: "/img/camel.jpg", title: "Apache Camel" },
  { icon: "/img/python.jpg", title: "Python" },
  { icon: "/img/images.png", title: "FastAPI" }, // rename this file to fastapi.png one day
  { icon: "/img/typescript.svg", title: "TypeScript" }, // TODO: this file is still MISSING
  { icon: "/img/javascript.jpg", title: "JavaScript" },
  { icon: "/img/angular.svg", title: "Angular" },
  { icon: "/img/react.jpg", title: "React.js" },
  { icon: "/img/next-js.svg", title: "Next.js" },
  { icon: "/img/html.jpg", title: "HTML" },
  { icon: "/img/css.jpg", title: "CSS" },
  { icon: "/img/Tailwind_CSS_Logo.svg.webp", title: "Tailwind CSS" },
  { icon: "/img/Laravel-Logo.wine.png", title: "Laravel" },
  { icon: "/img/postgresql.jpg", title: "PostgreSQL" },
  { icon: "/img/mySql.jpg", title: "MySQL" },
  { icon: "/img/docker.jpg", title: "Docker" },
  { icon: "/img/Kubernetes-Logo.wine.png", title: "Kubernetes" },
  { icon: "/img/git.jpg", title: "Git" },
  { icon: "/img/gitHub.jpg", title: "GitHub Actions" },
  { icon: "/img/5968875.png", title: "JIRA" }, // rename to jira.png one day
  { icon: "/img/postman.jpg", title: "Postman" },
];

// ============================================================
// PROJECTS
// ============================================================
export const projectsData = [
  {
    title: "OrcaML – MLOps Platform",
    description:
      "Platform that centralises the machine-learning lifecycle: dataset management, model registry and ML pipelines in a single place. Multi-user application with account creation, authentication and per-user workspaces. I worked on the backend: REST API, data and model storage, pipeline execution and job tracking.",
    // ^^ READ THIS: written from your signup screenshot only. Rewrite the second
    //    sentence yourself with what OrcaML actually does (training runs? model
    //    versioning? deployment/serving? monitoring?). Don't ship my guess.
    imageUrl: "/img/OrcaMl.png",
    technologies: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      // TODO: cut what you didn't use, add what you did (MLflow? Celery? MinIO? Tailwind?)
    ],
    gitHubLink: "https://github.com/Mouadbakhta/OrcaML",
    post: "Backend Developer",
    linkDeploy: "#", // deploy this one — it's your only AI/MLOps proof
  },
  {
    title: "OkaneTransfer – Money Transfer Platform",
    description:
      "Academic team project (6 people) simulating an international money transfer network. I owned client transfer tracking (statuses, filters, public tracking by reference number), the agent virtual cash register (real-time balance, daily closing, discrepancy handling) and the manager dashboard with report exports.",
    imageUrl: "/img/okane.png", // TODO: MISSING — screenshot the agent cash register or the manager dashboard
    technologies: [
      "Java",
      "Spring MVC",
      "Spring Security",
      "PostgreSQL",
      "Angular",
      "Docker",
    ],
    gitHubLink: "https://github.com/Mouadbakhta/Okane-Transfer",
    post: "Backend Developer",
    linkDeploy: "#",
  },
  {
    title: "Hotel Management Platform",
    description:
      "Microservices platform for hotel operations: API Gateway, Eureka service discovery and inter-service calls via Feign Client. React/Redux/Material UI frontend secured with JWT, deployed with Docker Compose. Unit and integration tests with JUnit and MockMvc.",
    imageUrl: "/img/Hotel.png",
    technologies: [
      "Spring Boot",
      "Microservices",
      "Eureka",
      "Feign",
      "React",
      "Redux",
      "JWT",
      "Docker",
      "JUnit",
    ],
    gitHubLink: "https://github.com/Mouadbakhta/HotelManagement-",
    post: "Full-Stack Developer",
    linkDeploy: "#",
  },
  {
    title: "Car Rental Management – Desktop Application",
    description:
      "JavaFX desktop application for a rental agency: clients, contracts, vehicles and payments. MySQL persistence through JDBC with transaction management and integrity constraints.",
    imageUrl: "/img/carrental.png", // TODO: MISSING — or delete this project entirely
    technologies: ["Java", "JavaFX", "MySQL", "JDBC"],
    gitHubLink: "",
    post: "Developer",
    linkDeploy: "#",
  },
];

export const reseauData = [
  {
    icon: FaGithub,
    link: "https://github.com/Mouadbakhta",
    title: "GitHub",
  },
  {
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/mouadbakhta/",
    title: "LinkedIn",
  },
  {
    icon: FaInstagram,
    link: "https://www.instagram.com/mouadbakhta/",
    title: "Instagram",
  },
];

export const formationData = [
  {
    diploma: "Software Engineering (Engineering Cycle)",
    institution: "ENSA Marrakech (National School of Applied Sciences)",
    period: "2024 – Present",
    last: true,
  },
  {
    diploma: "MP CPGE (Preparatory Classes)",
    institution: "Lycée Lissane Eddine Ibn Al-Khatib, Laâyoune",
    period: "2022 – 2024",
    last: false,
  },
  {
    diploma: "Baccalaureate — Mathematical Sciences",
    institution: "Ahmed Elrachdi High School, Boujdour",
    period: "2021 – 2022",
    last: false,
  },
];

export const certificationsData = [];

export const experienceData = [
  {
    role: "Backend Developer (Internship)",
    company: "Synertic",
    period: "Jul 2026 – Aug 2026",
    description:
      "Backend development of an event management platform built on a microservices architecture, in the banking and financial sector. Worked with distributed messaging and integration/orchestration tooling.",
    technologies: [
      "Java",
      "Spring Boot",
      "Microservices",
      "Apache Kafka",
      "Apache Camel",
      "REST API",
      "Git",
    ],
    last: true,
    imageUrl: "/img/synertic.png",
    companyUrl: "https://www.synertic.ma/",
  },
  {
    role: "Initiation Internship – Full-Stack Developer",
    company: "Marsa Maroc",
    period: "Jul 2025",
    description:
      "Designed and developed an IT fleet management platform to orchestrate the company's IT equipment (inventory, assignment and tracking).",
    technologies: ["Laravel", "PHP", "Tailwind CSS", "MySQL"], // TODO: confirm PHP/MySQL
    last: true,
    imageUrl: "/img/Marsa-Maroc-New-Logo.jpg",
    companyUrl: "https://www.marsamaroc.co.ma/",
  },
];

// ============================================================
// EXTRACURRICULAR / PARASCOLAIRE
// Rendered by src/components/Extracurricular.jsx
// ============================================================
export const extracurricularData = [
  {
    role: "Head of Web & Mobile Development",
    organization: "EMJE – Junior Enterprise of ENSA Marrakech",
    period: "2025 – 2026",
    description:
      "Lead the web and mobile development team of the junior enterprise: technical choices, task distribution, code review and follow-up of client projects delivered by student teams.",
    // ^ TODO: keep only what is true. If you just led the team without client
    //   projects, cut the second half — an interviewer will ask for details.
    technologies: [], // e.g. ["React", "Next.js", "Flutter"] — the stack your team used
    imageUrl: "", // TODO: EMJE logo in /public/img, or leave "" to hide it
    link: "", // EMJE LinkedIn / website if it has one
  },
  // Add anything else here: clubs, hackathons, competitions, volunteering.
];