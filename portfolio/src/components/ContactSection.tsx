import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, Copy, AlertCircle, ArrowRight, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, Language } from '../data/portfolioData';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ submissionId: string; message: string } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) {
      errs.name = language === 'en' ? 'Please enter your name.' : 'Veuillez saisir votre nom.';
    }
    if (!form.email.trim()) {
      errs.email = language === 'en' ? 'Please enter your email.' : 'Veuillez saisir votre adresse email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = language === 'en' ? 'Invalid email format.' : 'Format d’email invalide.';
    }
    if (!form.subject.trim()) {
      errs.subject = language === 'en' ? 'Please provide a subject.' : 'Veuillez renseigner un objet.';
    }
    if (!form.message.trim()) {
      errs.message = language === 'en' ? 'Please enter your message.' : 'Veuillez rédiger votre message.';
    } else if (form.message.trim().length < 10) {
      errs.message = language === 'en' ? 'Message must be at least 10 characters.' : 'Le message doit contenir au moins 10 caractères.';
    }
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSuccessData({
          submissionId: data.submissionId,
          message: data.message,
        });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrors({ submit: data.error || (language === 'en' ? 'Failed to send message.' : "Impossible d'envoyer le message.") });
      }
    } catch (err: any) {
      console.error('Contact form error:', err);
      setErrors({
        submit: language === 'en'
          ? 'Network notice. You can also send directly to bakhtamouad1@gmail.com using the Gmail button below.'
          : 'Notice réseau. Vous pouvez également envoyer directement à bakhtamouad1@gmail.com via le bouton Gmail ci-dessous.',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // Gmail Web Composer URL (works 100% on any browser without SMTP secrets!)
  const gmailWebComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}&su=${encodeURIComponent(form.subject || (language === 'en' ? 'PFE Internship Interview Opportunity' : 'Entretien Stage PFE'))}&body=${encodeURIComponent(form.message || '')}`;

  return (
    <section id="contact" className="py-16 sm:py-20 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Get In Touch' : 'Prendre Contact'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'en' ? 'Let’s Discuss a PFE Internship Opportunity' : "Discutons d'une Opportunité de Stage PFE"}
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-xs sm:text-base">
            {language === 'en'
              ? 'Looking for a dedicated Java Back-End & DevOps Engineer starting February 2026? Send a message below or contact Mouad directly.'
              : 'Vous recherchez un ingénieur back-end Java & DevOps passionné par les architectures distribuées dès Février 2026 ? Contactez-moi directement.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Perks */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Card - February 2026 */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                {language === 'en' ? 'Availability & Mobility' : 'Disponibilité & Mobilité'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {language === 'en' ? (
                  <>Available for an <strong>End-of-Studies PFE Internship</strong> (4 to 6 months) starting in <strong>February 2026</strong>.</>
                ) : (
                  <>Disponible pour un <strong>Stage de Fin d'Études (PFE)</strong> de 4 à 6 mois à partir de <strong>Février 2026</strong>.</>
                )}
              </p>
              <div className="space-y-2.5 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>{language === 'en' ? 'Mobility: Morocco, International & Remote' : 'Mobilité : Tout le Maroc, International & Télétravail'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  <span>{language === 'en' ? 'Target: Java Back-End & DevOps Engineer' : 'Rôles : Ingénieur Back-End Java & Ingénieur DevOps'}</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-6 space-y-3.5 backdrop-blur-sm">
              
              {/* Direct Gmail Web Composer Button (Requires ZERO SMTP secrets) */}
              <a
                href={gmailWebComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-red-500/10 via-zinc-900 to-zinc-950 border border-red-500/30 hover:border-red-500/60 text-zinc-200 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
                    M
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-white group-hover:text-red-300 transition">
                      {language === 'en' ? 'Compose Directly in Gmail' : 'Rédiger Directement dans Gmail'}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {language === 'en' ? '1-click browser compose (no secrets needed)' : 'Ouvre un brouillon Gmail en 1 clic'}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition" />
              </a>

              {/* Email item */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-zinc-500 font-mono">Email</div>
                    <div className="text-xs sm:text-sm font-semibold text-zinc-200 truncate">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition cursor-pointer shrink-0"
                  title="Copy email"
                >
                  {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone item */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-zinc-500 font-mono">WhatsApp / Phone</div>
                    <div className="text-xs sm:text-sm font-semibold text-zinc-200 truncate">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </div>
                <button
                  onClick={copyPhone}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition cursor-pointer shrink-0"
                  title="Copy phone"
                >
                  {copiedPhone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-cyan-400 transition"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 sm:p-8 backdrop-blur-sm shadow-xl">
              
              {successData ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {language === 'en' ? 'Message Sent Successfully!' : 'Message Reçu avec Succès !'}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    {successData.message}
                  </p>
                  <div className="inline-block px-3 py-1 rounded bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400">
                    Reference ID: {successData.submissionId}
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setSuccessData(null)}
                      className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition cursor-pointer"
                    >
                      {language === 'en' ? 'Send another message' : 'Envoyer un autre message'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  
                  {/* Note explaining no secrets needed */}
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-[11px] sm:text-xs text-cyan-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>
                      {language === 'en'
                        ? 'Direct delivery active: submit here or click the Gmail composer button on the left.'
                        : 'Envoi direct actif : soumettez ici ou cliquez sur le bouton Gmail à gauche.'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        {language === 'en' ? 'Your Name' : 'Votre Nom & Prénom'} <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={language === 'en' ? 'e.g. John Doe' : 'Ex: Jean Dupont'}
                        className={`w-full bg-zinc-950 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition ${
                          errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-zinc-800 focus:border-cyan-500'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                        {language === 'en' ? 'Your Email' : 'Votre Email Professionnel'} <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={`w-full bg-zinc-950 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition ${
                          errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-zinc-800 focus:border-cyan-500'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      {language === 'en' ? 'Subject' : 'Objet du message'} <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'e.g. Java & DevOps PFE Internship Offer' : 'Ex: Proposition de Stage PFE Back-End Java / DevOps'}
                      className={`w-full bg-zinc-950 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition ${
                        errors.subject ? 'border-red-500/80 focus:border-red-500' : 'border-zinc-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.subject && <p className="text-[11px] text-red-400 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      {language === 'en' ? 'Your Message' : 'Votre Message'} <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Tell Mouad about your team, tech stack, or interview proposition...' : 'Décrivez votre opportunité, l’équipe, les technologies ou vos questions...'}
                      className={`w-full bg-zinc-950 border rounded-xl p-4 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none transition resize-none ${
                        errors.message ? 'border-red-500/80 focus:border-red-500' : 'border-zinc-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  {errors.submit && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.submit}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-cyan-600 hover:bg-cyan-500 text-white transition disabled:opacity-50 cursor-pointer shadow-lg shadow-cyan-600/20"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{language === 'en' ? 'Transmitting...' : 'Transmission en cours...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{language === 'en' ? 'Submit Inquiry' : 'Envoyer le Message'}</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <a
                      href={gmailWebComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl font-medium text-xs sm:text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                    >
                      <span>{language === 'en' ? 'Open in Gmail' : 'Ouvrir dans Gmail'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
