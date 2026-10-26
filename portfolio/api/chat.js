// Vercel Serverless Function for /api/chat
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const KNOWLEDGE_CONTEXT = `
Mouad Bakhta - Official Portfolio Knowledge Base:
- State Engineering Student in Final Year at ENSA Marrakech (admitted via CPGE MPSI/MP preparatory classes).
- Core Specialization: Java Back-End & DevOps Engineer.
- Polyvalent Skills: Data Engineering, Big Data Streaming (Kafka, Spark), and MLOps.
- Internship Availability: End-of-Studies PFE Internship (4-6 months) starting in FEBRUARY 2026.
- Contact: Email: bakhtamouad1@gmail.com | Phone: +212 693-380227 | LinkedIn: linkedin.com/in/mouadbakhta/ | GitHub: github.com/Mouadbakhta

Professional Experiences:
1. Synertic (July – August 2026): Back-End Developer Intern in Banking & Financial sector. Event-driven architecture with Spring Boot, Apache Kafka messaging, and Apache Camel routing/EIP.
2. Marsa Maroc (July 2025): IT Fleet Management platform with Laravel, PHP, MySQL, and Tailwind CSS.
3. EMJE Junior Enterprise (2025 – 2026): Head of Web & Mobile Development at ENSA Marrakech.

Top 4 Projects in Cloud Deployment:
1. OkaneTransfer: International Money Transfer & Branch Cashier System (Spring Boot, Spring Security RBAC, PostgreSQL, Angular, Docker).
2. Real-Time Bank Fraud Detection: Distributed streaming card fraud scoring with Apache Kafka, Apache Spark Streaming, XGBoost with SMOTE, Google BigQuery, and Grafana dashboards.
3. OrcaML: MLOps & ML Experimentation Platform (FastAPI asynchronous API, PostgreSQL, Redis cache & Celery worker tasks, Cloudflare R2 object storage).
4. Urban Delivery Optimization: Vehicle routing optimization with Knapsack algorithm and Tabu Search metaheuristics, Django 5 REST Framework, WebSockets, React.

DevOps Flagship Project:
- Spring Petclinic DevOps Pipeline: Multi-stage Dockerfiles (-72% image size), Docker Compose with healthcheck order (config-server -> eureka -> microservices -> gateway), GitHub Actions CI/CD to GHCR, Linux VPS reverse proxy with Nginx and UFW firewall.
`;

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history, language } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "A query message is required." });
    }

    const lang = language === "fr" ? "French" : "English";

    const systemPrompt = `You are the official AI Portfolio Representative for Mouad Bakhta, an aspiring Software Engineer graduating from ENSA Marrakech (CPGE MPSI/MP background).
Mouad is specializing as a Java Back-End & DevOps Engineer, seeking an End-of-Studies PFE Internship starting in FEBRUARY 2026.

GROUNDING FACTS FROM MOUAD'S CV & GITHUB REPOSITORIES:
${KNOWLEDGE_CONTEXT}

INSTRUCTIONS:
- Respond in ${lang}.
- Be precise, technical, articulate, and confident.
- Always highlight real problem-solving, architecture choices, and code quality.
- Highlight his availability for February 2026.
- Format with neat Markdown (bullet points, bold text, code blocks).`;

    const groqMessages = [
      { role: "system", content: systemPrompt },
      ...(Array.isArray(history)
        ? history.slice(-4).map((h) => ({
            role: h.role === "model" ? "assistant" : "user",
            content: h.parts?.[0]?.text || "",
          }))
        : []),
      { role: "user", content: message },
    ];

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: groqMessages,
        temperature: 0.3,
        max_tokens: 1024,
      }),
    });

    if (groqRes.ok) {
      const data = await groqRes.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) {
        return res.status(200).json({
          reply,
          modelUsed: "Groq (openai/gpt-oss-120b)",
        });
      }
    }

    // Fallback if Groq API has an issue
    return res.status(200).json({
      reply: lang === "French"
        ? `Bonjour ! Je suis l'assistant officiel de Mouad Bakhta. Mouad est élève ingénieur à l'ENSA Marrakech (CPGE MPSI/MP), spécialisé en Java Back-End & DevOps, et disponible pour son stage PFE dès Février 2026.\n\nSes 4 projets en cours de déploiement sont :\n1. **OkaneTransfer** (Transfert d'argent Spring Boot & Angular)\n2. **Détection de Fraude Bancaire** (Kafka, Spark & XGBoost)\n3. **OrcaML** (Plateforme MLOps FastAPI & Celery)\n4. **Optimisation de Livraison** (Recherche Tabou & Sac à dos)\n\nContact : **bakhtamouad1@gmail.com** | **+212 693-380227**.`
        : `Hello! I am Mouad Bakhta's official AI assistant. Mouad is a final-year Software Engineer at ENSA Marrakech (CPGE MPSI/MP background) specializing in Java Back-End & DevOps, available for an End-of-Studies PFE Internship starting in February 2026.\n\nHis 4 projects in deployment are:\n1. **OkaneTransfer** (Money Transfer & Teller System - Spring Boot & Angular)\n2. **Real-Time Fraud Detection** (Kafka, Spark Streaming & XGBoost)\n3. **OrcaML** (MLOps Platform with FastAPI & Celery)\n4. **Urban Delivery Optimization** (Tabu Search & Knapsack)\n\nContact: **bakhtamouad1@gmail.com** | **+212 693-380227**.`,
      modelUsed: "Fallback Knowledge Synthesizer",
    });
  } catch (err) {
    console.error("Vercel /api/chat error:", err);
    return res.status(500).json({
      reply: "An internal server error occurred. Please contact Mouad directly at bakhtamouad1@gmail.com.",
    });
  }
}
