"use client";

import * as React from "react";
import type { ResumeContent } from "@/content";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface ContactSectionProps {
  content: ResumeContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(content.contact.email);
      setCopiedEmail(true);
      toast.success(content.ui.copiedToClipboard);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          honeypot: honeypot,
          locale: content.locale,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      toast.success(content.ui.contactFormSuccess);
      setName("");
      setEmail("");
      setMessage("");

      // Track contact event
      if (typeof window !== "undefined" && (window as unknown as { trackEvent?: (name: string, data?: unknown) => void }).trackEvent) {
        (window as unknown as { trackEvent: (name: string, data?: unknown) => void }).trackEvent("contact_submit", {
          locale: content.locale,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : content.ui.contactFormError;
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-12 border-b border-border/40 scroll-mt-20">
      <div className="flex items-center gap-2 mb-8">
        <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
          [06]
        </span>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          <span>{content.sections.contact}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Direct Channels (Always Visible & Prominent Fallback) */}
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Interested in data engineering, microkernel pipelines, or agentic systems? Feel free to reach out directly via email or the form.
          </p>

          <div className="space-y-3 font-mono text-xs">
            {/* Email with copy button */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/70">
              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-center gap-2.5 text-foreground hover:text-primary transition-colors truncate"
              >
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="truncate">{content.contact.email}</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                title="Copy email address"
                aria-label="Copy email"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-center p-3 rounded-lg bg-card border border-border/70">
              <a
                href={`tel:${content.contact.phoneHref}`}
                className="flex items-center gap-2.5 text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{content.contact.phone}</span>
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-card border border-border/70 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{content.contact.location}</span>
            </div>

            {/* Social links */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={content.contact.githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border/70 hover:border-primary/50 text-foreground transition-colors"
              >
                <Github className="w-4 h-4 text-primary" />
                <span>GitHub</span>
              </a>

              <a
                href={content.contact.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border/70 hover:border-primary/50 text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4 text-primary" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="contact-form p-5 rounded-lg bg-card border border-border/70 space-y-4">
          {/* Honeypot field for bot spam prevention */}
          <input
            type="text"
            name="website_url_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="text-xs font-semibold text-foreground">
              {content.ui.contactFormName}
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md bg-secondary/50 border border-border focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary transition-all"
              placeholder="e.g. Alex Smith"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="text-xs font-semibold text-foreground">
              {content.ui.contactFormEmail}
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md bg-secondary/50 border border-border focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary transition-all"
              placeholder="alex@company.com"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-message" className="text-xs font-semibold text-foreground">
              {content.ui.contactFormMessage}
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md bg-secondary/50 border border-border focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary transition-all resize-y"
              placeholder="Tell me about your role or project..."
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all shadow-xs"
          >
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{content.ui.contactFormSending}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{content.ui.contactFormSend}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
