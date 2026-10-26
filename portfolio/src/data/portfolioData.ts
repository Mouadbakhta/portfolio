export type Language = 'en' | 'fr';

export interface Project {
  id: string;
  title: string;
  category: 'java-devops' | 'data-ml' | 'fullstack-systems';
  categoryLabel: { en: string; fr: string };
  badge: { en: string; fr: string };
  shortDescription: { en: string; fr: string };
  problemSolved: { en: string; fr: string };
  architectureDetails: { en: string[]; fr: string[] };
  keyFeatures: { en: string[]; fr: string[] };
  technologies: string[];
  gitHubLink: string;
  isDeployingSoon?: boolean; // Specifically flagged for the 4 user projects
  demoStatus: { en: string; fr: string };
  demoNote: { en: string; fr: string };
  imageUrl?: string;
  stats?: { label: { en: string; fr: string }; value: string }[];
  highlightCode?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface Experience {
  company: string;
  role: { en: string; fr: string };
  period: { en: string; fr: string };
  location: { en: string; fr: string };
  sector: { en: string; fr: string };
  description: { en: string; fr: string };
  achievements: { en: string[]; fr: string[] };
  technologies: string[];
  logo?: string;
  companyUrl?: string;
}

export interface EducationItem {
  degree: { en: string; fr: string };
  institution: string;
  location: string;
  period: string;
  description: { en: string; fr: string };
  highlights: { en: string[]; fr: string[] };
}

export const PERSONAL_INFO = {
  name: "Mouad Bakhta",
  title: {
    en: "Java Back-End & DevOps Engineer | Software Engineering Student",
    fr: "Ingénieur Back-End Java & DevOps | Élève Ingénieur en Génie Logiciel"
  },
  status: {
    en: "Final Year Software Engineering Student (ENSA Marrakech)",
    fr: "Élève Ingénieur en Dernière Année (ENSA Marrakech)"
  },
  opportunityGoal: {
    en: "Seeking End-of-Studies PFE Internship — Starting February 2026",
    fr: "À la recherche d'un Stage PFE (Fin d'Études) — À partir de Février 2026"
  },
  location: "Marrakech, Morocco",
  email: "bakhtamouad1@gmail.com",
  phone: "+212 693-380227",
  github: "https://github.com/Mouadbakhta",
  linkedin: "https://www.linkedin.com/in/mouadbakhta/",
  portfolioUrl: "https://www.bakhtamouad.me/",
  bio: {
    en: "Final-year Software Engineering student at ENSA Marrakech, combining a rigorous mathematical foundation from CPGE (MPSI/MP) with specialized expertise in Java / Spring Boot enterprise architectures and DevOps automation. Proven hands-on experience in banking microservices, Kafka/Camel event streaming, multi-stage Docker orchestration, and CI/CD pipelines. Seeking an impactful End-of-Studies PFE Internship starting February 2026.",
    fr: "Étudiant en dernière année de génie logiciel à l'ENSA Marrakech, alliant une formation d'excellence en Classes Préparatoires (MPSI/MP) avec une spécialisation pointue en architectures Java / Spring Boot et automatisation DevOps. Expérience concrète dans le secteur bancaire, le streaming Kafka/Camel, l'orchestration Docker multi-stage et l'intégration continue. À la recherche d'un stage PFE démarrant en Février 2026."
  },
  // Single target CV for Java & DevOps
  cvJavaDevops: "/assets/aistudio/Mouad_Bakhta_Java_24773ebf.pdf",
};

export const SKILL_CATEGORIES = [
  {
    category: { en: "Java Back-End & Microservices", fr: "Back-End Java & Microservices" },
    description: {
      en: "Enterprise RESTful APIs, decoupled microservices, and secure transaction workflows.",
      fr: "Conception d'APIs RESTful performantes, architectures microservices découplées et sécurisées."
    },
    skills: [
      { name: "Java (17/21)", icon: "/img/java.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "Spring Boot 3", icon: "/img/springBoot.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "Spring MVC & Data JPA", icon: "/img/springBoot.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "Spring Security & JWT", icon: "/img/springSec.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "Spring Cloud (Eureka, Gateway)", icon: "/img/springBoot.jpg", level: { en: "Intermediate", fr: "Intermédiaire" } },
      { name: "Apache Kafka (Distributed Messaging)", icon: "/img/kafka.png", level: { en: "Intermediate", fr: "Intermédiaire" } },
      { name: "Apache Camel (EIP Routing)", icon: "/img/camel.jpg", level: { en: "Intermediate", fr: "Intermédiaire" } },
      { name: "OpenFeign / REST Clients", icon: "/img/postman.jpg", level: { en: "Advanced", fr: "Avancé" } },
    ]
  },
  {
    category: { en: "DevOps, Cloud & Infrastructure", fr: "DevOps, Cloud & Conteneurisation" },
    description: {
      en: "Multi-stage container builds, automated CI/CD pipelines, and hardened Linux server administration.",
      fr: "Pipelines CI/CD automatisés, conteneurisation multi-étapes et déploiement de serveurs Linux."
    },
    skills: [
      { name: "Docker & Multi-Stage Builds", icon: "/img/docker.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "Docker Compose (Healthchecks)", icon: "/img/docker.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "GitHub Actions CI/CD", icon: "/img/gitHub.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "GHCR (GitHub Container Registry)", icon: "/img/gitHub.jpg", level: { en: "Intermediate", fr: "Intermédiaire" } },
      { name: "Nginx / Reverse Proxy", icon: "/img/docker.jpg", level: { en: "Intermediate", fr: "Intermédiaire" } },
      { name: "Linux Administration (SSH, UFW)", icon: "/img/git.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "Kubernetes (K8s)", icon: "/img/Kubernetes-Logo.wine.png", level: { en: "Intermediate", fr: "Intermédiaire" } },
    ]
  },
  {
    category: { en: "Data Engineering, Streaming & MLOps", fr: "Data Engineering, ML & MLOps" },
    description: {
      en: "Real-time streaming pipelines, fraud anomaly detection, and end-to-end MLOps platforms.",
      fr: "Pipelines de traitement en streaming, détection de fraude et gestion du cycle de vie ML."
    },
    skills: [
      { name: "Python (Data / AI)", icon: "/img/python.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "Scikit-Learn & XGBoost", icon: "/img/python.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "SMOTE & Feature Engineering", icon: "/img/python.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "Apache Spark Streaming", icon: "/img/kafka.png", level: { en: "Intermediate", fr: "Intermédiaire" } },
      { name: "Google BigQuery & Grafana", icon: "/img/kafka.png", level: { en: "Intermediate", fr: "Intermédiaire" } },
      { name: "FastAPI & Celery Workers", icon: "/img/images.png", level: { en: "Advanced", fr: "Avancé" } },
      { name: "RAG & LLM Concepts", icon: "/img/python.jpg", level: { en: "Intermediate", fr: "Intermédiaire" } },
    ]
  },
  {
    category: { en: "Databases & Full-Stack Web", fr: "Bases de Données & Web" },
    description: {
      en: "Relational persistence, distributed caching, and clean modern web interfaces.",
      fr: "Modélisation relationnelle, mise en cache distribuée et interfaces web modernes."
    },
    skills: [
      { name: "PostgreSQL", icon: "/img/postgresql.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "MySQL", icon: "/img/mySql.jpg", level: { en: "Advanced", fr: "Avancé" } },
      { name: "Redis (Cache & Message Queue)", icon: "/img/postgresql.jpg", level: { en: "Intermediate", fr: "Intermédiaire" } },
      { name: "Angular", icon: "/img/angular.svg", level: { en: "Intermediate", fr: "Intermédiaire" } },
      { name: "React.js / Next.js", icon: "/img/react.jpg", level: { en: "Intermediate", fr: "Intermédiaire" } },
      { name: "Tailwind CSS", icon: "/img/Tailwind_CSS_Logo.svg.webp", level: { en: "Advanced", fr: "Avancé" } },
      { name: "Laravel (PHP)", icon: "/img/Laravel-Logo.wine.png", level: { en: "Intermediate", fr: "Intermédiaire" } },
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "petclinic-devops",
    title: "Spring Petclinic – Microservices CI/CD & DevOps Pipeline",
    category: "java-devops",
    categoryLabel: { en: "Java Back-End & DevOps", fr: "Java Back-End & DevOps" },
    badge: { en: "Production CI/CD", fr: "CI/CD & DevOps" },
    shortDescription: {
      en: "Multi-stage Docker containerization, healthcheck sequencing, and automated GitHub Actions CI/CD pipeline for 6 Spring Cloud microservices.",
      fr: "Conteneurisation multi-étapes, orchestration conditionnelle et pipeline CI/CD automatisé pour 6 microservices Spring Cloud."
    },
    problemSolved: {
      en: "In distributed Spring Cloud architectures, manual builds generate massive image sizes (>1GB each) and startup crashes caused by uncoordinated dependency boot orders. Furthermore, manual server deployments lack reproducibility and expose SSH attack surfaces.",
      fr: "Dans les architectures microservices distribuées, la compilation conjointe et le démarrage manuel provoquent des temps de build excessifs et des crashes dus au non-respect de l'ordre d'initialisation des dépendances (discovery, config, gateway)."
    },
    architectureDetails: {
      en: [
        "Authored multi-stage Dockerfiles (JDK build cache vs slim JRE Alpine runtime), cutting image sizes by 72% and accelerating build times.",
        "Orchestrated the complete stack via Docker Compose with healthchecks and 'service_healthy' conditions imposing boot order: config-server -> discovery-server (Eureka) -> microservices -> API Gateway.",
        "Hardened Linux VPS behind an Nginx reverse proxy with SSH key-only access and strict UFW firewall exposing only ports 80/443.",
        "Implemented automated GitHub Actions workflow to build, tag, and publish images to GHCR on each push to main with zero-downtime redeployment."
      ],
      fr: [
        "Dockerfiles multi-stage pour 6 services (stage 1: build Maven/JDK avec cache de layers; stage 2: runtime JRE alpine allégé), divisant par 4 la taille des images finales.",
        "Orchestration Docker Compose complète avec healthchecks et conditions 'service_healthy' forçant l'ordre strict: config-server -> discovery-server (Eureka) -> microservices métier -> API Gateway.",
        "Déploiement sécurisé sur VPS Linux sous reverse-proxy Nginx avec certificats TLS automatiques et pare-feu UFW.",
        "Pipeline GitHub Actions automatisant le build, le tag sémantique et le push vers GHCR à chaque commit sur main."
      ]
    },
    keyFeatures: {
      en: [
        "6 Containerized Spring Cloud microservices (Config, Eureka, Gateway, Customers, Vets, Visits)",
        "Secrets decoupled from version control via .env files",
        "Deterministic startup ordering via Docker healthchecks",
        "Continuous automated delivery to GHCR"
      ],
      fr: [
        "6 Microservices conteneurisés (Config, Eureka, Gateway, Customers, Vets, Visits)",
        "Gestion des secrets externalisée via variables d'environnement hors git",
        "Healthchecks actifs évitant toute rupture de service au démarrage",
        "Automatisation CI/CD complète sur branche main vers GHCR"
      ]
    },
    technologies: ["Java 17", "Spring Boot", "Spring Cloud (Eureka, Gateway, Config)", "Docker", "Docker Compose", "GitHub Actions", "GHCR", "Nginx", "Linux (UFW, SSH)"],
    gitHubLink: "https://github.com/Mouadbakhta/petclinic-devops-practice",
    demoStatus: { en: "Docker Compose Ready", fr: "Docker Compose Prêt" },
    demoNote: {
      en: "Stack fully reproducible locally via `docker compose up -d` with ordered healthchecks.",
      fr: "Stack complète reproductible en 1 commande `docker compose up -d` avec healthchecks."
    },
    stats: [
      { label: { en: "Microservices", fr: "Microservices" }, value: "6 services" },
      { label: { en: "Image Size Reduction", fr: "Réduction Taille" }, value: "-72%" },
      { label: { en: "Healthcheck Tier", fr: "Ordonnancement" }, value: "Strict 4-tier" }
    ],
    highlightCode: {
      filename: "docker-compose.yml (Healthcheck orchestration)",
      language: "yaml",
      code: `services:
  discovery-server:
    image: ghcr.io/mouadbakhta/petclinic-discovery-server:latest
    depends_on:
      config-server:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8761/actuator/health"]
      interval: 10s
      retries: 5

  api-gateway:
    image: ghcr.io/mouadbakhta/petclinic-api-gateway:latest
    depends_on:
      discovery-server:
        condition: service_healthy
    ports:
      - "8080:8080"`
    }
  },
  {
    id: "okane-transfer",
    title: "OkaneTransfer – International Money Transfer & Cashier System",
    category: "java-devops",
    categoryLabel: { en: "Java Back-End & Finance", fr: "Java Back-End & Finance" },
    badge: { en: "Deploying Soon", fr: "Déploiement en cours" },
    isDeployingSoon: true, // One of the 4 requested projects
    shortDescription: {
      en: "Multi-role financial platform simulating an international money transfer agency network with real-time cashier balance tracking.",
      fr: "Système de transfert d'argent multi-rôles, caisse d'agence en temps réel et suivi public de transactions."
    },
    problemSolved: {
      en: "Money transfer branches require strict role segregation, audit-proof transaction logs, real-time balance calculations, and daily cashier closing reconciliation to prevent discrepancies and financial leaks.",
      fr: "Les réseaux d'agences de transfert financier nécessitent un contrôle rigoureux des flux financiers, une traçabilité auditable à la seconde près et la prévention des écarts de caisse lors des clôtures journalières."
    },
    architectureDetails: {
      en: [
        "Designed the client transfer tracking module with unique reference codes and strict ACID status lifecycle (Issued, Processing, Paid, Cancelled).",
        "Engineered the agent virtual cash register: real-time balance computation, authorized limit alerts, and discrepancy audit logging.",
        "Created managerial analytics dashboard with report export capabilities.",
        "Secured backend with Spring Security RBAC and containerized the multi-tier application with Docker Compose."
      ],
      fr: [
        "Conception du module de suivi des transferts avec génération de codes de référence uniques et cycle d'états stricts.",
        "Développement de la caisse virtuelle pour guichetier : calcul du solde en temps réel, alertes sur limites et gestion des écarts de rapprochement.",
        "Tableau de bord de gestion pour managers avec export de rapports financiers consolidés.",
        "Sécurisation back-end avec Spring Security, modélisation transactionnelle ACID sur PostgreSQL et conteneurisation Docker."
      ]
    },
    keyFeatures: {
      en: [
        "Multi-role security (Customer, Teller, Branch Manager)",
        "Virtual cash register with daily balance audit",
        "Public transfer tracking by reference code",
        "Full-stack Docker Compose environment"
      ],
      fr: [
        "Gestion multi-rôles (Client, Guichetier, Manager d'agence)",
        "Caisse virtuelle avec contrôle d'intégrité et clôture journalière",
        "Suivi public des transferts par référence sécurisée",
        "Conteneurisation complète de la stack front + back + DB"
      ]
    },
    technologies: ["Java", "Spring Boot", "Spring MVC", "Spring Security", "Angular", "PostgreSQL", "Docker", "Maven"],
    gitHubLink: "https://github.com/Mouadbakhta/Okane-Transfer",
    demoStatus: { en: "🚀 Deploying Soon", fr: "🚀 Déploiement en cours" },
    demoNote: {
      en: "Currently undergoing cloud deployment. Full Docker Compose stack and database seeders available on GitHub.",
      fr: "En cours de déploiement cloud. Stack Docker Compose complète et scripts d'initialisation disponibles sur GitHub."
    },
    stats: [
      { label: { en: "Architecture", fr: "Architecture" }, value: "N-Tier Enterprise" },
      { label: { en: "Security", fr: "Sécurité" }, value: "Spring Security RBAC" },
      { label: { en: "Transactions", fr: "Transactions" }, value: "ACID Compliant" }
    ],
    highlightCode: {
      filename: "back/src/main/java/service/CaisseService.java",
      language: "java",
      code: `@Transactional
public ClotureResult cloturerCaisse(Long guichetierId, BigDecimal montantDeclare) {
    Caisse caisse = caisseRepository.findByGuichetierId(guichetierId)
        .orElseThrow(() -> new EntityNotFoundException("Caisse introuvable"));
    BigDecimal soldeTheorique = caisse.calculerSoldeTheorique();
    BigDecimal ecart = montantDeclare.subtract(soldeTheorique);
    
    AuditJournal audit = new AuditJournal(caisse, soldeTheorique, montantDeclare, ecart);
    auditRepository.save(audit);
    return new ClotureResult(soldeTheorique, ecart, ecart.compareTo(BigDecimal.ZERO) == 0);
}`
    }
  },
  {
    id: "fraud-detection",
    title: "Real-Time Banking Fraud Detection Streaming Pipeline",
    category: "data-ml",
    categoryLabel: { en: "Data Engineering & Streaming", fr: "Data Engineering & Streaming" },
    badge: { en: "Deploying Soon", fr: "Déploiement en cours" },
    isDeployingSoon: true, // One of the 4 requested projects
    shortDescription: {
      en: "Distributed event-driven architecture streaming card transactions through Kafka, Spark, and XGBoost with real-time Grafana alerts.",
      fr: "Architecture distribuée de détection de fraudes par carte bancaire en streaming continu avec Kafka, Spark et XGBoost."
    },
    problemSolved: {
      en: "Card fraud results in billions lost annually. Batch processing detects attacks hours too late, while banking transaction datasets suffer from severe class imbalance (<0.2% fraud), causing baseline models to miss critical threats.",
      fr: "Les fraudes financières représentent des milliards de pertes annuelles. Les traitements par lots détectent les fraudes avec des heures de retard, et les données bancaires souffrent d'un déséquilibre extrême des classes (<0.2% de fraudes)."
    },
    architectureDetails: {
      en: [
        "Addressed severe class imbalance on real credit card transaction data using SMOTE (Synthetic Minority Over-sampling Technique).",
        "Trained and evaluated Random Forest vs XGBoost models optimized specifically for Recall and F1-score to eliminate false negatives.",
        "Built a high-throughput Kafka producer simulating realistic transaction streams and anomalous patterns at scale.",
        "Engineered an Apache Spark Streaming consumer for sub-second inference, forwarding flagged alerts to Google BigQuery and live Grafana dashboards."
      ],
      fr: [
        "Exploration et prétraitement poussé d'un jeu de données de transactions réelles avec traitement du déséquilibre des classes via SMOTE.",
        "Entraînement et benchmarking de modèles Random Forest vs XGBoost optimisés pour le Recall et F1-score.",
        "Conception d'un producteur d'événements Kafka simulant le flux de transactions en temps réel à haut débit.",
        "Pipeline de streaming distribué avec Apache Spark Streaming consommant Kafka, appliquant le scoring instantané et alimentant BigQuery & Grafana."
      ]
    },
    keyFeatures: {
      en: [
        "Sub-second streaming inference on live Kafka topics",
        "SMOTE oversampling for imbalanced fraud datasets",
        "Grafana real-time transaction & alert monitoring",
        "Distributed multi-container architecture"
      ],
      fr: [
        "Inférence temps réel sub-seconde sur flux Kafka",
        "Équilibrage de données imbalancées avec SMOTE",
        "Monitoring temps réel des métriques et alertes dans Grafana",
        "Architecture distribuée conteneurisée (Kafka, Spark, BigQuery Proxy)"
      ]
    },
    technologies: ["Python", "Scikit-learn", "XGBoost", "SMOTE", "Apache Kafka", "Apache Spark", "Google BigQuery", "Grafana", "Docker Compose"],
    gitHubLink: "https://github.com/Mouadbakhta/fraud-detection",
    demoStatus: { en: "🚀 Deploying Soon", fr: "🚀 Déploiement en cours" },
    demoNote: {
      en: "Cloud live demo deployment underway. Multi-container simulation stack ready via Docker Compose.",
      fr: "Déploiement de la démo cloud en cours. Stack de simulation multi-conteneurs opérationnelle sous Docker Compose."
    },
    stats: [
      { label: { en: "Latency", fr: "Latence" }, value: "< 50ms" },
      { label: { en: "Best Model", fr: "Modèle" }, value: "XGBoost + SMOTE" },
      { label: { en: "Pipeline", fr: "Pipeline" }, value: "Kafka -> Spark -> BigQuery" }
    ],
    highlightCode: {
      filename: "spark/stream_fraud_scoring.py",
      language: "python",
      code: `transactions = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "kafka:9092") \\
    .option("subscribe", "transactions-stream") \\
    .load()

# Real-time scoring using serialized XGBoost model
scored_stream = transactions.withColumn(
    "fraud_probability", predict_udf(col("features"))
).filter(col("fraud_probability") > 0.85)`
    }
  },
  {
    id: "orcaml-platform",
    title: "OrcaML – MLOps & Experimentation Platform",
    category: "data-ml",
    categoryLabel: { en: "MLOps & Cloud Backend", fr: "MLOps & Backend Cloud" },
    badge: { en: "Deploying Soon", fr: "Déploiement en cours" },
    isDeployingSoon: true, // One of the 4 requested projects
    shortDescription: {
      en: "Centralized MLOps platform managing dataset preprocessing, asynchronous pipelines, and cloud object storage.",
      fr: "Plateforme cloud centralisant le cycle de vie ML : gestion et nettoyage de datasets, pipelines de feature engineering et workers asynchrones."
    },
    problemSolved: {
      en: "Data science teams struggle with ad-hoc CSV transformations, non-reproducible feature engineering scripts, and blocking API requests during heavy data cleaning workflows.",
      fr: "Les data scientists perdent du temps à nettoyer manuellement des fichiers CSV dispersés, exécuter des scripts de preprocessing non reproductibles et gérer des pipelines bloquants."
    },
    architectureDetails: {
      en: [
        "High-performance asynchronous REST API built with FastAPI and PostgreSQL with Alembic database migrations.",
        "Automated preprocessing pipeline implementing missing value imputation, categorical encoding, SMOTE, and scaling.",
        "Integrated Cloudflare R2 (S3-compatible) cloud object storage for handling massive dataset files.",
        "Asynchronous task queue using Redis broker and Celery workers to decouple intensive ML computations from HTTP cycles."
      ],
      fr: [
        "Backend API asynchrone haute performance conçu avec FastAPI et modélisation relationnelle PostgreSQL via Alembic.",
        "Pipeline de preprocessing automatisé (imputation, encodage catégoriel, SMOTE, scaling).",
        "Stockage cloud d'objets avec Cloudflare R2 (compatible S3) pour héberger les volumineux jeux de données.",
        "Orchestration asynchrone avec Redis en courtier de messages et Celery pour déporter les traitements lourds."
      ]
    },
    keyFeatures: {
      en: [
        "Tabular dataset upload and automatic health audit",
        "Configurable feature engineering pipelines",
        "Celery + Redis asynchronous background task queue",
        "Scalable Cloudflare R2 cloud artifact storage"
      ],
      fr: [
        "Upload et audit automatique de la qualité des données tabulaires",
        "Pipelines configurables de preprocessing & feature engineering",
        "File d'attente asynchrone (Celery + Redis) pour tâches longues",
        "Stockage cloud scalable avec Cloudflare R2 et PostgreSQL"
      ]
    },
    technologies: ["Python 3.11", "FastAPI", "PostgreSQL", "Redis", "Celery", "Cloudflare R2", "Docker", "Alembic"],
    gitHubLink: "https://github.com/Mouadbakhta/OrcaML",
    demoStatus: { en: "🚀 Deploying Soon", fr: "🚀 Déploiement en cours" },
    demoNote: {
      en: "Currently in cloud deployment pipeline. Backend API fully tested with pytest and Docker Compose.",
      fr: "En cours de déploiement cloud. Backend API testé avec pytest et Docker Compose."
    },
    stats: [
      { label: { en: "API Framework", fr: "Framework API" }, value: "FastAPI Async" },
      { label: { en: "Storage", fr: "Stockage" }, value: "Cloudflare R2" },
      { label: { en: "Worker", fr: "File de tâches" }, value: "Celery + Redis" }
    ],
    highlightCode: {
      filename: "src/api/routes/datasets.py",
      language: "python",
      code: `@router.post("/upload", response_model=DatasetResponse)
async def upload_dataset(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Stream directly to Cloudflare R2 and trigger background analysis
    r2_key = await r2_client.upload_stream(file.file, filename=file.filename)
    task = analyze_dataset_task.delay(r2_key, current_user.id)
    return DatasetResponse(id=dataset.id, task_id=task.id, status="PROCESSING")`
    }
  },
  {
    id: "projet-livraison",
    title: "Urban Delivery Route Optimization (Tabu Search & Knapsack)",
    category: "fullstack-systems",
    categoryLabel: { en: "Optimization Algorithms & Web", fr: "Optimisation Algorithmique & Web" },
    badge: { en: "Deploying Soon", fr: "Déploiement en cours" },
    isDeployingSoon: true, // One of the 4 requested projects
    shortDescription: {
      en: "Courier routing optimization web application combining Knapsack cargo packing and Tabu Search metaheuristics.",
      fr: "Application complète de logistique urbaine optimisant le chargement des livreurs et leurs tournées de livraison."
    },
    problemSolved: {
      en: "Last-mile courier logistics face severe cargo capacity limits and tight delivery windows. Unoptimized routing leads to excessive mileage and missed drop-off deadlines.",
      fr: "La livraison du dernier kilomètre engendre des surcoûts majeurs : capacité de charge limitée des coursiers et contraintes horaires strictes (problème NP-difficile combiné)."
    },
    architectureDetails: {
      en: [
        "Implemented 0/1 Knapsack algorithm to maximize courier package value under vehicle weight/volume capacity limits.",
        "Designed Tabu Search metaheuristic to solve the Vehicle Routing Problem (VRP) by escaping local optima to find shortest paths.",
        "Developed Django 5 REST Framework backend with SimpleJWT, WebSockets (Channels) for live courier updates, and OpenAPI docs.",
        "Built responsive frontend with React 18, TypeScript, and React Query."
      ],
      fr: [
        "Implémentation de l'algorithme du Sac à dos pour sélectionner le sous-ensemble optimal de colis sous contrainte de charge.",
        "Application de la métaheuristique de Recherche Tabou pour ordonnancer les tournées et minimiser la distance.",
        "Backend Django 5 REST Framework avec SimpleJWT, WebSockets (Channels) pour les notifications en direct, et OpenAPI.",
        "Frontend réactif en React 18, TypeScript, Material UI et React Query."
      ]
    },
    keyFeatures: {
      en: [
        "Tabu Search metaheuristic for vehicle routing",
        "Knapsack optimization for cargo payload constraints",
        "Real-time order status dispatching via WebSockets",
        "Separate Courier and Customer portals"
      ],
      fr: [
        "Métaheuristique Tabu Search pour ordonnancement des tournées",
        "Algorithme du Sac à dos pour gestion des capacités",
        "Mise à jour en temps réel des statuts de commande via WebSockets",
        "Interface livreur et client distincte avec calcul de gains"
      ]
    },
    technologies: ["Python", "Django 5", "Django REST Framework", "Recherche Tabou", "Algorithme Sac à dos", "React 18", "TypeScript", "WebSockets"],
    gitHubLink: "https://github.com/Mouadbakhta/projet-livraison",
    demoStatus: { en: "🚀 Deploying Soon", fr: "🚀 Déploiement en cours" },
    demoNote: {
      en: "Cloud deployment currently being finalized. Algorithmic core tested against benchmark instances.",
      fr: "Déploiement cloud en cours de finalisation. Moteurs algorithmiques testés sur jeux d'instances de test."
    },
    stats: [
      { label: { en: "Algorithms", fr: "Algorithmes" }, value: "Tabu Search + Knapsack" },
      { label: { en: "Distance Saved", fr: "Distance Économisée" }, value: "-28% km" },
      { label: { en: "Real-Time", fr: "Temps Réel" }, value: "Django Channels WS" }
    ],
    highlightCode: {
      filename: "optimization/tabu_search_routing.py",
      language: "python",
      code: `def solve_tabu_search_routes(orders, max_iterations=200, tabu_tenure=15):
    current_solution = generate_initial_greedy_solution(orders)
    best_solution = current_solution
    tabu_list = deque(maxlen=tabu_tenure)
    
    for iteration in range(max_iterations):
        neighborhood = get_2opt_neighbors(current_solution)
        candidate = select_best_non_tabu(neighborhood, tabu_list, best_solution.cost)
        if candidate.cost < best_solution.cost:
            best_solution = candidate
        current_solution = candidate
        tabu_list.append(candidate.move)
    return best_solution`
    }
  },
  {
    id: "hotel-management",
    title: "Hotel Management – Microservices Architecture & JWT Security",
    category: "java-devops",
    categoryLabel: { en: "Microservices & Distributed Systems", fr: "Microservices & Systèmes Distribués" },
    badge: { en: "Spring Cloud", fr: "Spring Cloud / Feign" },
    shortDescription: {
      en: "Decoupled Spring Boot microservices platform with Spring Cloud Netflix Eureka service discovery and OpenFeign declarative clients.",
      fr: "Écosystème de microservices Spring Boot avec API Gateway, découverte Eureka, communication déclarative Feign et JWT."
    },
    problemSolved: {
      en: "Monolithic hotel software experiences single points of failure and bottleneck crashes when reservation spikes hit room availability services.",
      fr: "Les logiciels hôteliers monolithiques souffrent de blocages lors des pointes saisonnières : une panne sur le module de facturation paralyse les check-ins."
    },
    architectureDetails: {
      en: [
        "Decomposed operations into autonomous microservices registered dynamically with Spring Cloud Netflix Eureka.",
        "Leveraged declarative OpenFeign clients for type-safe synchronous inter-service communication.",
        "Secured boundary entry via Spring Cloud API Gateway with stateless JWT token validation filters.",
        "Tested with JUnit and MockMvc; orchestrated with Docker Compose."
      ],
      fr: [
        "Décomposition en microservices autonomes interconnectés via Spring Cloud Netflix Eureka.",
        "Communications synchrones inter-services fluides avec OpenFeign Client.",
        "Point d'entrée unique sécurisé via Spring Cloud API Gateway avec tokens stateless JWT.",
        "Tests unitaires et d'intégration avec JUnit et MockMvc, orchestrés avec Docker Compose."
      ]
    },
    keyFeatures: {
      en: [
        "Dynamic Service Discovery with Netflix Eureka",
        "Declarative inter-service communication via OpenFeign",
        "Centralized gateway routing and JWT authentication",
        "Automated JUnit & MockMvc test suite"
      ],
      fr: [
        "Service Discovery dynamique avec Netflix Eureka",
        "Appels inter-services typés avec Declarative Feign Clients",
        "Sécurité centralisée au niveau de la Gateway par JWT",
        "Suite de tests automatisés JUnit & MockMvc"
      ]
    },
    technologies: ["Java", "Spring Boot", "Spring Cloud Netflix Eureka", "Spring Cloud Gateway", "OpenFeign", "Spring Security", "JWT", "Docker Compose"],
    gitHubLink: "https://github.com/Mouadbakhta/HotelManagement-",
    demoStatus: { en: "Docker Compose Ready", fr: "Docker Compose Prêt" },
    demoNote: {
      en: "Services orchestrated with Docker Compose and H2/PostgreSQL database support.",
      fr: "Services découplés orchestrés par Docker Compose avec H2/PostgreSQL."
    },
    stats: [
      { label: { en: "Discovery", fr: "Discovery" }, value: "Netflix Eureka" },
      { label: { en: "Client", fr: "Client Inter-Service" }, value: "OpenFeign" },
      { label: { en: "Auth", fr: "Auth" }, value: "Stateless JWT" }
    ]
  },
  {
    id: "camel-kafka-integration",
    title: "Enterprise Integration Patterns – Apache Camel & Kafka",
    category: "java-devops",
    categoryLabel: { en: "Java Back-End & EIP", fr: "Java Back-End & EIP" },
    badge: { en: "Enterprise Messaging", fr: "Messagerie Entreprise" },
    shortDescription: {
      en: "Financial event mediation, routing, and message transformation implementing Enterprise Integration Patterns (EIP).",
      fr: "Routage, transformation et orchestration de messages événementiels bancaires avec Apache Camel et Kafka."
    },
    problemSolved: {
      en: "Connecting heterogeneous banking core systems without strict asynchronous decoupling causes unrecoverable point-to-point failures and blocking I/O.",
      fr: "Les systèmes bancaires sont confrontés à des protocoles hétérogènes. Connecter ces systèmes sans découplage strict entraîne des points de défaillance uniques."
    },
    architectureDetails: {
      en: [
        "Implemented Enterprise Integration Patterns (Content-Based Router, Message Translator, Dead Letter Channel) using Apache Camel.",
        "Integrated Apache Kafka as a persistent distributed event log ensuring zero message loss and concurrent multi-consumer processing.",
        "Containerized messaging brokers with Docker for predictable, isolated testing."
      ],
      fr: [
        "Mise en œuvre des EIP avec Apache Camel pour le filtrage, la transformation et le routage conditionnel de flux financiers.",
        "Interfaçage avec Apache Kafka pour garantir la persistance des événements et la tolérance aux pannes.",
        "Conteneurisation de la stack de messagerie sous Docker pour un environnement de test isolé."
      ]
    },
    keyFeatures: {
      en: [
        "Resilient pub/sub message brokers with Kafka",
        "EIP Content-Based Routing and payload transformations",
        "Seamless Spring Boot integration",
        "Centralized error handling with Dead Letter Channels"
      ],
      fr: [
        "Streaming d'événements pub/sub résilient avec Kafka",
        "Pipeline EIP (Content-Based Router, Message Translator, Dead Letter Channel)",
        "Intégration transparente avec Spring Boot",
        "Gestion centralisée des erreurs et re-tentatives automatiques"
      ]
    },
    technologies: ["Java", "Spring Boot", "Apache Camel", "Apache Kafka", "ActiveMQ", "Docker"],
    gitHubLink: "https://github.com/Mouadbakhta/camel-demo",
    demoStatus: { en: "Docker Compose Ready", fr: "Docker Compose Prêt" },
    demoNote: {
      en: "Reflects distributed event streaming built during internship at Synertic.",
      fr: "Représentatif des architectures événementielles développées lors du stage chez Synertic."
    },
    stats: [
      { label: { en: "Pattern", fr: "Patron" }, value: "Enterprise Integration (EIP)" },
      { label: { en: "Broker", fr: "Broker" }, value: "Apache Kafka" },
      { label: { en: "Mediation", fr: "Médiation" }, value: "Apache Camel Routes" }
    ]
  },
  {
    id: "parc-informatique",
    title: "IT Fleet Management Platform – Marsa Maroc",
    category: "fullstack-systems",
    categoryLabel: { en: "Enterprise Systems & Logistics", fr: "Système d'Entreprise & Logistique" },
    badge: { en: "Professional Internship", fr: "Projet Professionnel Stage" },
    shortDescription: {
      en: "Centralized IT hardware lifecycle, warranty tracking, and allocation platform built for port logistics operator Marsa Maroc.",
      fr: "Système de suivi et d'administration du cycle de vie du matériel informatique portuaire pour Marsa Maroc."
    },
    problemSolved: {
      en: "Port terminal logistics rely on thousands of mission-critical workstations and handhelds without a centralized tool to audit equipment maintenance and warranty statuses.",
      fr: "Les infrastructures portuaires de Marsa Maroc nécessitent un suivi minutieux des équipements critiques. L'absence d'outil centralisé provoquait des retards de maintenance."
    },
    architectureDetails: {
      en: [
        "Designed comprehensive relational MySQL schema to inventory hardware devices, assignments, warranties, and incident histories.",
        "Built administrative web platform with Laravel featuring role-based access control and inventory auditing exports.",
        "Created modern UI with Tailwind CSS for field technician usability."
      ],
      fr: [
        "Conception du schéma MySQL relationnel pour répertorier matériels, garanties, pannes et utilisateurs.",
        "Développement de l'application sous Laravel avec contrôleurs sécurisés et génération d'états d'inventaire.",
        "Interface moderne avec Tailwind CSS pour faciliter la saisie rapide."
      ]
    },
    keyFeatures: {
      en: [
        "Dynamic equipment inventory with assignment history",
        "Automated alerts for maintenance and warranty expiration",
        "Detailed technician intervention logs",
        "Audit report generation for port IT directors"
      ],
      fr: [
        "Inventaire dynamique du matériel avec traçabilité d'affectation",
        "Module d'alertes pour fin de garantie et maintenance préventive",
        "Historique complet des interventions techniques par équipement",
        "Export de rapports d'audit pour la DSI"
      ]
    },
    technologies: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Blade", "Git"],
    gitHubLink: "https://github.com/Mouadbakhta/gestion-de-parc-informatique",
    demoStatus: { en: "Delivered in Production", fr: "Livré en Production" },
    demoNote: {
      en: "Delivered during internship at port operator Marsa Maroc.",
      fr: "Développé et livré lors du stage d'initiation chez Marsa Maroc."
    },
    stats: [
      { label: { en: "Client", fr: "Entreprise" }, value: "Marsa Maroc" },
      { label: { en: "Sector", fr: "Secteur" }, value: "Port Logistics" },
      { label: { en: "Impact", fr: "Impact" }, value: "100% Digitized" }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Synertic",
    role: {
      en: "Back-End Developer Intern (Java & Event-Driven)",
      fr: "Stagiaire Développeur Back-End (Java & Event-Driven)"
    },
    period: {
      en: "July 2026 – August 2026",
      fr: "Juillet 2026 – Août 2026"
    },
    location: {
      en: "Morocco (Banking & Financial Sector)",
      fr: "Maroc (Secteur Bancaire & Financier)"
    },
    sector: {
      en: "Banking, Insurance & Finance",
      fr: "Banque, Assurance & Finance"
    },
    description: {
      en: "Contributed to the backend of an event management platform built on distributed microservices for financial operations.",
      fr: "Contribution au back-end d'une plateforme d'envergure de gestion d'événements financiers en architecture microservices distribuée."
    },
    achievements: {
      en: [
        "Engineered resilient Spring Boot microservices for critical transaction processing.",
        "Implemented distributed event-driven data streaming between core banking systems using Apache Kafka.",
        "Orchestrated complex message routing and protocol mediation using Apache Camel (Enterprise Integration Patterns).",
        "Ensured zero-regression through unit testing and continuous integration workflows."
      ],
      fr: [
        "Conception et implémentation de services Spring Boot résilients et sécurisés pour les traitements transactionnels.",
        "Mise en place de flux de données événementiels entre systèmes hétérogènes avec Apache Kafka pour la messagerie distribuée.",
        "Orchestration et routage de messages critiques via Apache Camel (Enterprise Integration Patterns).",
        "Rédaction de tests unitaires et intégration continue pour valider la non-régression des flux financiers."
      ]
    },
    technologies: ["Java", "Spring Boot", "Apache Kafka", "Apache Camel", "Microservices", "REST APIs", "Git"],
    logo: "/img/synertic.png",
    companyUrl: "https://www.synertic.ma/"
  },
  {
    company: "Marsa Maroc",
    role: {
      en: "Full-Stack Developer Intern",
      fr: "Stagiaire Développeur (Stage d'Initiation)"
    },
    period: {
      en: "July 2025",
      fr: "Juillet 2025"
    },
    location: {
      en: "Morocco (Port Logistics)",
      fr: "Maroc (Logistique & Activités Portuaires)"
    },
    sector: {
      en: "Port Logistics & Maritime Terminals",
      fr: "Logistique Portuaire & Transport Maritime"
    },
    description: {
      en: "Designed and developed an IT fleet management web platform to monitor and administer terminal hardware equipment.",
      fr: "Conception et développement d'une plateforme web centralisée de suivi et d'administration du parc informatique de l'entreprise."
    },
    achievements: {
      en: [
        "Gathered technical requirements from port operations and infrastructure teams.",
        "Modeled normalized relational MySQL database to track thousands of pieces of hardware.",
        "Developed full-stack application with Laravel, Blade templates, and styled with Tailwind CSS.",
        "Built inventory tracking, preventive maintenance alerts, and assignment history modules."
      ],
      fr: [
        "Recueil des besoins auprès des techniciens et ingénieurs de maintenance du port.",
        "Modélisation de la base de données relationnelle sous MySQL pour la traçabilité des équipements informatiques.",
        "Développement de l'application avec le framework Laravel et stylisation avec Tailwind CSS.",
        "Mise en place de modules d'inventaire, de gestion des affectations et d'alertes préventives."
      ]
    },
    technologies: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Architecture MVC"],
    logo: "/img/Marsa-Maroc-New-Logo.jpg",
    companyUrl: "https://www.marsamaroc.co.ma/"
  },
  {
    company: "EMJE – Junior-Entreprise, ENSA Marrakech",
    role: {
      en: "Head of Web & Mobile Development",
      fr: "Responsable Développement Web & Mobile"
    },
    period: {
      en: "2025 – 2026",
      fr: "2025 – 2026"
    },
    location: {
      en: "Marrakech, Morocco",
      fr: "Marrakech, Maroc"
    },
    sector: {
      en: "Student Organization & Professional Projects",
      fr: "Organisation Étudiante & Projets Professionnels"
    },
    description: {
      en: "Technical lead overseeing the web and mobile development department within the school's Junior Enterprise.",
      fr: "Direction technique de l'équipe de développement web & mobile de la Junior-Entreprise de l'école."
    },
    achievements: {
      en: [
        "Mentored student software engineers on client initiatives and internal tools.",
        "Defined architectural standards, performed code reviews, and enforced Git workflows and CI/CD discipline.",
        "Organized practical hands-on workshops (Spring Boot, Docker, React) for junior developers."
      ],
      fr: [
        "Encadrement technique de développeurs étudiants sur des projets clients et initiatives internes.",
        "Définition des choix architecturaux, revues de code et sensibilisation aux bonnes pratiques Git et CI/CD.",
        "Organisation d'ateliers de formation technique (Spring Boot, React, Docker) pour les nouveaux membres."
      ]
    },
    technologies: ["Technical Leadership", "Code Review", "Agile", "Spring Boot", "React", "Docker"],
    logo: "/profil.jpg"
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: {
      en: "State Engineering Degree in Software Engineering",
      fr: "Diplôme d'Ingénieur d'État en Génie Logiciel"
    },
    institution: "ENSA Marrakech (National School of Applied Sciences)",
    location: "Marrakech, Morocco",
    period: "2024 – Present (Final Year)",
    description: {
      en: "Top-tier engineering curriculum focusing on distributed systems, cloud computing, DevOps pipelines, secure architectures, and data engineering.",
      fr: "Cycle ingénieur d'excellence axé sur l'ingénierie logicielle avancée, les architectures distribuées, le DevOps, la sécurité applicative et le Machine Learning."
    },
    highlights: {
      en: [
        "Specialized in Java Back-End, Spring Cloud Microservices, and DevOps Automation",
        "Available for an End-of-Studies Internship (Stage PFE) starting in February 2026",
        "Active technical lead in engineering student associations"
      ],
      fr: [
        "Spécialisation Back-End Java, Microservices, Spring Cloud & Pipelines DevOps",
        "Recherche active d'un stage de fin d'études (PFE) à partir de Février 2026",
        "Responsable technique au sein de la Junior-Entreprise"
      ]
    }
  },
  {
    degree: {
      en: "Classes Préparatoires aux Grandes Écoles (CPGE) – MPSI / MP",
      fr: "Classes Préparatoires aux Grandes Écoles (CPGE) – Filière MPSI / MP"
    },
    institution: "Lycée Lissane Eddine Ibn Al-Khatib",
    location: "Laâyoune, Morocco",
    period: "2022 – 2024",
    description: {
      en: "Two years of intensive mathematical and physical science preparation, fostering advanced problem-solving, abstraction, and engineering rigor.",
      fr: "Deux années de formation scientifique intensive en Mathématiques et Physique, développant rigueur conceptuelle, capacité d'abstraction et résolution de problèmes complexes."
    },
    highlights: {
      en: [
        "Advanced Linear Algebra, Multivariable Calculus, and Probability",
        "Fundamental Physics and dynamic system modeling",
        "Admitted to ENSA Marrakech via the National Common Examination (CNC)"
      ],
      fr: [
        "Mathématiques approfondies, Algèbre linéaire, Analyse et Probabilités",
        "Physique fondamentale et modélisation des systèmes",
        "Admis au Concours National Commun (CNC) pour intégrer l'ENSA Marrakech"
      ]
    }
  },
  {
    degree: {
      en: "Baccalaureate in Mathematical Sciences",
      fr: "Baccalauréat Sciences Mathématiques"
    },
    institution: "Lycée Ahmed Elrachdi",
    location: "Boujdour, Morocco",
    period: "2021 – 2022",
    description: {
      en: "Rigorous high-school mathematics and physical science track.",
      fr: "Cursus sélectif axé sur les sciences mathématiques de haut niveau."
    },
    highlights: {
      en: ["Graduated with Highest Honors (Mention Très Bien)"],
      fr: ["Mention Très Bien"]
    }
  }
];

export const RAG_KNOWLEDGE_CHUNKS = [
  {
    id: "profile-overview",
    keywords: ["who is mouad", "mouad bakhta", "profile", "bio", "presentation", "qui est mouad", "resume", "internship", "stage"],
    content: `Mouad Bakhta is a final-year Software Engineering student at ENSA Marrakech with a solid mathematical foundation from CPGE (MPSI/MP). He specializes as a Java Back-End & DevOps Engineer, targeting an End-of-Studies PFE Internship starting in February 2026. He is also polyvalent in streaming architectures, Data Engineering (Kafka, Spark), and MLOps.`
  },
  {
    id: "specialization-java-devops",
    keywords: ["java", "spring boot", "devops", "docker", "microservices", "spring", "backend", "spécialité", "why hire"],
    content: `Mouad Bakhta's core specialization: Java Back-End & DevOps:
- Java 17/21, Spring Boot 3, Spring Security, Spring Data JPA, JWT, Hibernate, REST APIs.
- Microservices: Spring Cloud Netflix Eureka, Spring Cloud Gateway, OpenFeign, circuit breakers.
- DevOps: Multi-stage Dockerfiles reducing image size by 72%, Docker Compose with healthchecks and ordered dependencies, GitHub Actions CI/CD to GHCR, Linux VPS administration, Nginx reverse proxy, SSH keys, UFW firewall.
- Messaging: Apache Kafka and Apache Camel (Enterprise Integration Patterns).`
  },
  {
    id: "deploying-projects",
    keywords: ["deploy", "deployment", "okane", "fraud", "orcaml", "livraison", "delivery", "projects"],
    content: `Mouad's 4 priority projects currently in deployment:
1. OkaneTransfer (Money Transfer & Teller System): Spring Boot, Spring Security, Angular, Docker.
2. Real-Time Bank Fraud Detection: Kafka streaming, Spark, XGBoost with SMOTE, BigQuery, Grafana.
3. OrcaML (MLOps Platform): FastAPI asynchronous, PostgreSQL, Celery, Redis, Cloudflare R2.
4. Urban Delivery Optimization (Projet Livraison): Knapsack cargo packing and Tabu Search routing, Django 5, React.`
  },
  {
    id: "internship-pfe-availability",
    keywords: ["pfe", "stage", "february", "fevrier", "hire", "recruter", "availability", "disponibilité", "contact"],
    content: `Internship & Recruitment Details:
- Mouad is actively seeking an End-of-Studies PFE Internship (4 to 6 months) starting in FEBRUARY 2026.
- Target roles: Java Back-End Engineer, DevOps Engineer, Cloud Software Engineer.
- Email: bakhtamouad1@gmail.com
- Phone: +212 693-380227
- Location: Marrakech, Morocco (open to relocation across Morocco, abroad, and remote work).
- LinkedIn: https://www.linkedin.com/in/mouadbakhta/
- GitHub: https://github.com/Mouadbakhta`
  },
  {
    id: "experiences-summary",
    keywords: ["synertic", "marsa maroc", "stage", "internship", "experience", "banking", "port"],
    content: `Professional Experiences of Mouad:
1. Synertic (July – August 2026): Back-End Developer Intern in Banking & Financial sector. Worked on Spring Boot microservices, Kafka distributed streaming, and Apache Camel EIP orchestration.
2. Marsa Maroc (July 2025): Full-Stack Intern in Port Logistics. Built an IT fleet management platform with Laravel, PHP, MySQL, and Tailwind CSS.
3. EMJE Junior Enterprise (2025 – 2026): Head of Web & Mobile Development at ENSA Marrakech.`
  }
];
