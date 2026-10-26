import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { RAG_KNOWLEDGE_CHUNKS, PERSONAL_INFO, PROJECTS } from './src/data/portfolioData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// User's provided Groq API key
const GROQ_API_KEY = process.env.GROQ_API_KEY;
// Initialize Google Gen AI client as backup/alternative
const defaultApiKey = process.env.GEMINI_API_KEY;
let defaultAi: GoogleGenAI | null = null;

if (defaultApiKey) {
  try {
    defaultAi = new GoogleGenAI({
      apiKey: defaultApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('[AI Setup] Gemini SDK initialized.');
  } catch (err) {
    console.error('[AI Setup] Gemini initialization notice:', err);
  }
}

// In-memory store for contact inquiries
const contactSubmissions: Array<{
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}> = [];

// Contact form endpoint
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields (Name, Email, Message).',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    const submissionId = `MB-${Date.now().toString(36).toUpperCase()}`;
    contactSubmissions.push({
      id: submissionId,
      name,
      email,
      subject: subject || 'Portfolio Inquiry',
      message,
      timestamp: new Date().toISOString(),
    });

    console.log(`[Contact Submission] ${submissionId} from ${name} (${email}) - "${subject}"`);

    return res.json({
      success: true,
      submissionId,
      message: `Thank you ${name}! Your inquiry has been received. Mouad has been notified and will reach out to ${email} promptly.`,
    });
  } catch (error: any) {
    console.error('Error handling contact form:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your message.',
    });
  }
});

// Semantic RAG retrieval
function retrieveKnowledgeChunks(query: string, maxChunks = 4): string[] {
  const normalizedQuery = query.toLowerCase();
  const scoredChunks = RAG_KNOWLEDGE_CHUNKS.map((chunk) => {
    let score = 0;
    for (const kw of chunk.keywords) {
      if (normalizedQuery.includes(kw.toLowerCase())) {
        score += 3;
      }
    }
    const words = normalizedQuery.split(/\s+/);
    for (const word of words) {
      if (word.length > 2 && chunk.content.toLowerCase().includes(word)) {
        score += 1;
      }
    }
    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);
  const selected = scoredChunks.filter((item) => item.score > 0).slice(0, maxChunks);

  if (selected.length === 0) {
    return [RAG_KNOWLEDGE_CHUNKS[0].content, RAG_KNOWLEDGE_CHUNKS[1].content];
  }

  return selected.map((item) => item.chunk.content);
}

// Groq API caller using the provided key
async function callGroqAPI(messages: Array<{ role: string; content: string }>): Promise<string | null> {
  if (!GROQ_API_KEY) return null;

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages,
        temperature: 0.3,
        max_tokens: 1024,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.choices?.[0]?.message?.content || null;
    } else {
      console.error('[Groq API Error]', res.status, await res.text());
      return null;
    }
  } catch (err) {
    console.error('[Groq Fetch Exception]', err);
    return null;
  }
}

// Multilingual deterministic fallback generator
function generateFallbackResponse(query: string, lang: 'en' | 'fr' = 'en'): string {
  const q = query.toLowerCase();

  if (q.includes('devops') || q.includes('petclinic') || q.includes('docker') || q.includes('ci/cd')) {
    if (lang === 'fr') {
      return `### Pipeline DevOps Microservices (Spring Petclinic)
Mouad a conçu une architecture DevOps complète pour 6 microservices Spring Cloud :
- **Dockerfiles multi-stage** (build JDK avec cache de layers, runtime JRE Alpine léger) réduisant la taille des images de 72%.
- **Docker Compose avec healthchecks** garantissant un ordre de démarrage strict : \`config-server\` → \`discovery-server (Eureka)\` → \`microservices\` → \`api-gateway\`.
- **Pipeline CI/CD GitHub Actions** automatisant le build, le tag et le push vers **GHCR** à chaque push sur la branche \`main\`.
- **Déploiement VPS Linux sécurisé** sous reverse proxy Nginx (ports 80/443 uniquement, SSH par clé).

Code source : [github.com/Mouadbakhta/petclinic-devops-practice](https://github.com/Mouadbakhta/petclinic-devops-practice)`;
    }
    return `### Spring Petclinic – Microservices CI/CD & DevOps Pipeline
Mouad built a production-grade DevOps workflow for 6 Spring Cloud microservices:
- **Multi-stage Dockerfiles** (JDK build cache vs slim JRE Alpine runtime), cutting image size by 72%.
- **Docker Compose with healthchecks** imposing strict startup dependency order: \`config-server\` → \`discovery-server (Eureka)\` → \`microservices\` → \`api-gateway\`.
- **GitHub Actions CI/CD** pipeline automatically building, tagging, and publishing images to **GHCR** on every push to \`main\`.
- **Hardened Linux VPS** running behind an Nginx reverse proxy with SSH key-only access and strict UFW firewall.

Repository: [github.com/Mouadbakhta/petclinic-devops-practice](https://github.com/Mouadbakhta/petclinic-devops-practice)`;
  }

  if (q.includes('fraud') || q.includes('fraude') || q.includes('spark') || q.includes('xgboost')) {
    if (lang === 'fr') {
      return `### Détection de Fraude Bancaire en Temps Réel (En cours de déploiement 🚀)
- **Problème résolu :** Traiter le fort déséquilibre des fraudes (<0.2%) et scorer les transactions par carte en sub-seconde.
- **Approche ML :** Rééquilibrage par **SMOTE**, modèles **Random Forest** et **XGBoost** calibrés pour le Recall et F1-score.
- **Pipeline Streaming :** Producteur de flux **Kafka**, scoring continu avec **Apache Spark Streaming**, export vers **Google BigQuery** et tableaux de bord d'alertes en temps réel sur **Grafana**.

Code source : [github.com/Mouadbakhta/fraud-detection](https://github.com/Mouadbakhta/fraud-detection)`;
    }
    return `### Real-Time Banking Fraud Detection Streaming Pipeline (Deploying Soon 🚀)
- **Problem Solved:** Overcoming severe fraud class imbalance (<0.2%) and scoring card transactions in sub-second streaming latency.
- **ML Approach:** Addressed imbalance via **SMOTE**, trained **Random Forest** and **XGBoost** models tuned for Recall and F1-score to avoid missed fraud alerts.
- **Streaming Pipeline:** High-throughput **Kafka** producer, distributed processing via **Apache Spark Streaming**, forwarding to **Google BigQuery** and real-time **Grafana** alert dashboards.

Repository: [github.com/Mouadbakhta/fraud-detection](https://github.com/Mouadbakhta/fraud-detection)`;
  }

  if (q.includes('okane') || q.includes('transfer') || q.includes('argent') || q.includes('caisse')) {
    if (lang === 'fr') {
      return `### OkaneTransfer – Plateforme Internationale de Transfert d'Argent (En cours de déploiement 🚀)
- **Problème résolu :** Sécurisation des flux financiers internationaux, intégrité transactionnelle ACID et élimination des écarts de caisse en agence.
- **Architecture :** Backend Spring Boot / Spring MVC avec sécurité RBAC (Spring Security), caisse virtuelle pour guichetiers avec calcul en temps réel et clôture journalière, front Angular et conteneurisation Docker.

Code source : [github.com/Mouadbakhta/Okane-Transfer](https://github.com/Mouadbakhta/Okane-Transfer)`;
    }
    return `### OkaneTransfer – International Money Transfer & Cashier System (Deploying Soon 🚀)
- **Problem Solved:** Audit-proof transaction tracking, strict ACID integrity, and eliminating cash register discrepancies during daily branch teller closings.
- **Architecture:** Spring Boot & Spring MVC backend with Spring Security RBAC, virtual cash register with real-time balance reconciliation, Angular client interface, and full Docker Compose containerization.

Repository: [github.com/Mouadbakhta/Okane-Transfer](https://github.com/Mouadbakhta/Okane-Transfer)`;
  }

  if (q.includes('stage') || q.includes('internship') || q.includes('pfe') || q.includes('february') || q.includes('fevrier') || q.includes('hire') || q.includes('contact')) {
    if (lang === 'fr') {
      return `### Disponibilité & Recrutement de Mouad Bakhta
- **Objectif :** Stage de Fin d'Études (PFE) de 4 à 6 mois débutant en **Février 2026**.
- **Profil ciblé :** Ingénieur Back-End Java / Spring Boot & Ingénieur DevOps.
- **Coordonnées :**
  - Email : **bakhtamouad1@gmail.com**
  - Téléphone : **+212 693-380227**
  - LinkedIn : [linkedin.com/in/mouadbakhta](https://www.linkedin.com/in/mouadbakhta/)
  - GitHub : [github.com/Mouadbakhta](https://github.com/Mouadbakhta)`;
    }
    return `### Availability & Recruitment Details
- **Goal:** End-of-Studies PFE Internship (4 to 6 months) starting in **February 2026**.
- **Target Roles:** Java Back-End Engineer, DevOps Engineer, Cloud Software Engineer.
- **Direct Contacts:**
  - Email: **bakhtamouad1@gmail.com**
  - Phone: **+212 693-380227**
  - LinkedIn: [linkedin.com/in/mouadbakhta](https://www.linkedin.com/in/mouadbakhta/)
  - GitHub: [github.com/Mouadbakhta](https://github.com/Mouadbakhta)`;
  }

  if (lang === 'fr') {
    return `Bonjour ! Je suis l'assistant IA officiel de Mouad Bakhta. 
Mouad est un futur ingénieur diplômé de l'**ENSA Marrakech** (issu de Classes Préparatoires MPSI/MP), spécialisé en **Back-End Java & DevOps** et disponible pour son **Stage PFE dès Février 2026**.

Ses 4 projets en cours de déploiement sont :
1. **OkaneTransfer** (Plateforme de transfert d'argent Spring Boot & Angular)
2. **Détection de Fraude Bancaire** (Pipeline streaming Kafka, Spark & XGBoost)
3. **OrcaML** (Plateforme MLOps avec FastAPI & Celery)
4. **Optimisation de Livraison Urbaine** (Tabu Search & Sac à dos)

N'hésitez pas à me poser une question technique sur son code, son architecture ou sa disponibilité !`;
  }

  return `Hello! I am the official AI assistant for Mouad Bakhta.
Mouad is a final-year Software Engineer at **ENSA Marrakech** (CPGE MPSI/MP background) specializing in **Java Back-End & DevOps**, available for a **PFE Internship starting February 2026**.

His 4 key projects currently in cloud deployment:
1. **OkaneTransfer** (Money Transfer & Teller System - Spring Boot & Angular)
2. **Real-Time Fraud Detection** (Kafka, Spark Streaming & XGBoost)
3. **OrcaML** (MLOps Platform with FastAPI & Celery)
4. **Urban Delivery Optimization** (Tabu Search & Knapsack)

Feel free to ask any question regarding his architecture, tech stack, or recruitment!`;
}

// Chat endpoint powered primarily by Groq (openai/gpt-oss-120b) + Gemini fallback
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history, language } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A query message is required.' });
    }

    const lang: 'en' | 'fr' = language === 'fr' ? 'fr' : 'en';
    const retrievedChunks = retrieveKnowledgeChunks(message);
    const knowledgeContext = retrievedChunks.join('\n\n---\n\n');

    const systemPrompt = `You are the official AI Portfolio Representative for Mouad Bakhta, an aspiring Software Engineer graduating from ENSA Marrakech (admitted via prestigious CPGE MPSI/MP preparatory classes).

CORE IDENTITY & TARGET:
- Specialty: Java Back-End & DevOps Engineer (Spring Boot, Spring Security, JWT, Microservices, Spring Cloud Netflix Eureka, OpenFeign, Docker multi-stage builds, Docker Compose with healthchecks, GitHub Actions CI/CD, GHCR, Linux VPS, Nginx, Apache Kafka, Apache Camel).
- Secondary Polyvalent Skills: Data Engineering & MLOps (Python, Scikit-learn, XGBoost, SMOTE, Spark Streaming, BigQuery, Grafana, FastAPI, Redis, Celery).
- Current Objective: Mouad is actively seeking an End-of-Studies PFE Internship starting in FEBRUARY 2026 for 4 to 6 months.
- 4 Key Projects Currently in Deployment:
  1. OkaneTransfer (Money Transfer & Branch Cashier System) - Spring Boot, Spring Security, Angular, Docker
  2. Real-Time Banking Fraud Detection - Kafka, Spark Streaming, XGBoost with SMOTE, BigQuery, Grafana
  3. OrcaML (MLOps Platform) - FastAPI, Celery, Redis, Cloudflare R2
  4. Urban Delivery Optimization - Tabu Search, Knapsack, Django 5, React

KNOWLEDGE GROUNDING FROM MOUAD'S CV & GITHUB REPOS:
===================
${knowledgeContext}

CONTACT FACTS:
- Email: ${PERSONAL_INFO.email}
- Phone: ${PERSONAL_INFO.phone}
- LinkedIn: ${PERSONAL_INFO.linkedin}
- GitHub: ${PERSONAL_INFO.github}
- Location: ${PERSONAL_INFO.location}
===================

BEHAVIORAL RULES:
- Respond in the requested language: ${lang === 'fr' ? 'French' : 'English'}.
- Be precise, technical, confident, and professional.
- Highlight the real problems solved and architecture choices (multi-stage Docker, Eureka discovery, Kafka streaming, Tabu Search).
- Highlight his availability for FEBRUARY 2026 for Java Back-End & DevOps roles.
- Format using neat markdown (bullet points, bold text, code blocks, tables).`;

    // 1. Try Groq API first with the user's provided key
    const groqMessages = [
      { role: 'system', content: systemPrompt },
      ...(Array.isArray(history)
        ? history.slice(-4).map((h: any) => ({
            role: h.role === 'model' ? 'assistant' : 'user',
            content: h.parts?.[0]?.text || '',
          }))
        : []),
      { role: 'user', content: message },
    ];

    const groqReply = await callGroqAPI(groqMessages);
    if (groqReply) {
      return res.json({
        reply: groqReply,
        modelUsed: 'Groq (openai/gpt-oss-120b)',
        retrievedContextCount: retrievedChunks.length,
      });
    }

    // 2. Fallback to Gemini if Groq fails or times out
    if (defaultAi) {
      const response = await defaultAi.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nVisitor question: "${message}"` }],
          },
        ],
        config: { temperature: 0.3 },
      });

      const replyText = response.text || generateFallbackResponse(message, lang);
      return res.json({
        reply: replyText,
        modelUsed: 'gemini-3.1-flash-lite',
        retrievedContextCount: retrievedChunks.length,
      });
    }

    // 3. Fallback to deterministic synthesizer
    const fallbackReply = generateFallbackResponse(message, lang);
    return res.json({
      reply: fallbackReply,
      fallback: true,
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const lang: 'en' | 'fr' = req.body?.language === 'fr' ? 'fr' : 'en';
    const fallbackReply = generateFallbackResponse(req.body?.message || '', lang);
    return res.json({
      reply: fallbackReply,
      fallback: true,
    });
  }
});

// App launcher
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Portfolio Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
