"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Sparkles, ShieldCheck, Ban, AlertCircle, FileText } from "lucide-react";

// Robust pattern detecting URLs, web protocols, domains with paths, HTML tags, markdown links, data URIs, and file extensions
const FORBIDDEN_CONTENT_REGEX =
  /(https?:\/\/|ftp:\/\/|www\.)|(\b[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)|(\[[^\]]*\]\([^)]*\))|(<[^>]+>)|(data:\w+\/\w+)|(\.(?:pdf|exe|zip|rar|docx|xlsx|tar|gz|png|jpg|jpeg|gif|webp)\b)/i;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  const validateText = (text: string): string | null => {
    if (FORBIDDEN_CONTENT_REGEX.test(text)) {
      return "Security Policy: Web links, URLs, and file attachments are strictly prohibited. Please submit your message in plain raw text only.";
    }
    return null;
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, message: val }));
    const validationError = validateText(val);
    setError(validationError);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError("Security Policy: File attachments and uploads are not permitted. Please submit plain raw text only.");
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (e.clipboardData.files && e.clipboardData.files.length > 0) {
      e.preventDefault();
      setError("Security Policy: File attachments are disabled. Please enter plain raw text only.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check message
    const messageError = validateText(formData.message);
    if (messageError) {
      setError(messageError);
      return;
    }

    // Check name
    if (FORBIDDEN_CONTENT_REGEX.test(formData.name)) {
      setError("Security Policy: The name field cannot contain links or URLs.");
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#FAF4EE] border-2.5 border-brand-espresso rounded-3xl p-8 sm:p-10 shadow-paper text-center space-y-4">
        <div className="w-14 h-14 bg-brand-olive border-2 border-brand-espresso rounded-full flex items-center justify-center mx-auto shadow-pill">
          <CheckCircle className="w-7 h-7 text-brand-espresso" />
        </div>
        <h3 className="font-heading text-2xl font-black text-brand-espresso">
          Message Received!
        </h3>
        <p className="text-sm text-brand-taupe max-w-md mx-auto leading-relaxed font-sans font-medium">
          Thank you for reaching out to PawTruth. Your submission has passed our automated spam filter and been queued for our editorial team.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setError(null);
              setFormData({ name: "", email: "", subject: "general", message: "" });
            }}
            className="btn-pill btn-pill-espresso px-6 py-2.5 text-xs font-black shadow-paper-sm cursor-pointer"
          >
            Send Another Note
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper space-y-5"
    >
      <div className="flex items-center justify-between pb-3 border-b-2 border-brand-espresso/15">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-terracotta" />
          <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso">
            Send a Note
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-brand-olive text-brand-espresso border border-brand-espresso shadow-[1px_1px_0px_#583D32]">
          Secure Form
        </span>
      </div>

      {/* Real-time Anti-Spam Security Warning */}
      {error && (
        <div className="bg-amber-50 border-2 border-brand-terracotta rounded-2xl p-3.5 flex items-start gap-3 shadow-paper-sm animate-in fade-in">
          <Ban className="w-5 h-5 text-brand-terracotta flex-shrink-0 mt-0.5" />
          <div className="text-xs text-brand-espresso font-sans">
            <strong className="font-heading font-black block mb-0.5 text-brand-terracotta">
              Submission Blocked
            </strong>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-brand-espresso mb-1">
            Your Name <span className="text-brand-terracotta">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={100}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Sarah Jenkins or Pet Parent"
            className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans font-medium text-brand-espresso placeholder:text-brand-taupe/60 shadow-paper-sm focus:outline-none focus:border-brand-terracotta"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-brand-espresso mb-1">
            Your Email <span className="text-brand-terracotta">*</span>
          </label>
          <input
            type="email"
            required
            maxLength={120}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="youremail@example.com"
            className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans font-medium text-brand-espresso placeholder:text-brand-taupe/60 shadow-paper-sm focus:outline-none focus:border-brand-terracotta"
          />
        </div>
      </div>

      {/* Inquiry Topic */}
      <div>
        <label className="block text-xs font-mono font-bold uppercase text-brand-espresso mb-1">
          Inquiry Topic
        </label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans font-bold text-brand-espresso shadow-paper-sm focus:outline-none focus:border-brand-terracotta cursor-pointer"
        >
          <option value="general">General Feedback & Suggestions</option>
          <option value="formula">Veterinary Formula & Algorithm Suggestion</option>
          <option value="breed">Breed Guide / Health Standard Note</option>
          <option value="partnership">Clinical Partnership / Press Inquiry</option>
          <option value="bug">Technical Issue / Formula Correction</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-mono font-bold uppercase text-brand-espresso">
            Message <span className="text-brand-terracotta">*</span>
          </label>
          <span className="text-[10px] font-mono text-brand-taupe">
            {formData.message.length} / 2,000 characters
          </span>
        </div>
        <textarea
          required
          rows={5}
          maxLength={2000}
          value={formData.message}
          onChange={handleMessageChange}
          onDrop={handleDrop}
          onPaste={handlePaste}
          placeholder="Share your feedback, clinical suggestions, or notes here. Plain text only (no links or file uploads accepted)..."
          className={`w-full bg-[#FAF4EE] border-2 rounded-xl p-3.5 text-xs sm:text-sm font-sans font-medium text-brand-espresso placeholder:text-brand-taupe/60 shadow-paper-sm focus:outline-none leading-relaxed transition-colors ${
            error ? "border-brand-terracotta focus:border-brand-terracotta" : "border-brand-espresso focus:border-brand-terracotta"
          }`}
        />
      </div>

      {/* Anti-Spam Plain Text Security Guideline Box */}
      <div className="bg-[#FAF4EE] border border-brand-espresso/30 rounded-xl p-3 flex items-start gap-2.5 text-[11px] font-mono text-brand-espresso/80">
        <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-brand-espresso font-bold">Anti-Spam &amp; Security Policy:</strong> Plain raw text only. To prevent malicious phishing and bot spam, external links, website URLs (<code className="bg-white px-1 py-0.5 rounded text-[10px] text-brand-terracotta font-bold">http, https, www</code>), and file attachments are strictly prohibited.
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={Boolean(error)}
        className={`w-full py-3 px-6 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-between shadow-paper-sm transition-all rounded-full border-2 border-brand-espresso ${
          error
            ? "bg-stone-300 text-stone-500 cursor-not-allowed opacity-60"
            : "btn-pill-espresso hover:btn-pill-terracotta cursor-pointer group"
        }`}
      >
        <span>Submit Note to PawTruth</span>
        <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform shadow-[1px_1px_0px_#583D32]">
          <Send className="w-3.5 h-3.5" />
        </span>
      </button>
    </form>
  );
}
