// Vercel Serverless Function for /api/contact

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
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Please fill in all required fields (Name, Email, Message).",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const submissionId = `MB-${Date.now().toString(36).toUpperCase()}`;

    console.log(`[Contact Form Received] ID: ${submissionId} from ${name} (${email}) - Subject: ${subject}`);

    return res.status(200).json({
      success: true,
      submissionId,
      message: `Thank you ${name}! Your inquiry has been received. Mouad will get in touch with you at ${email} shortly.`,
    });
  } catch (err) {
    console.error("Vercel /api/contact error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error while recording your message.",
    });
  }
}
