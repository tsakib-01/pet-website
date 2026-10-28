"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Sparkles } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In-memory demo submit (no server backend required, zero-cost architecture)
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
          Thank you for reaching out to PawTruth. We review every community suggestion, formula feedback, and breed update with meticulous care.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
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
      className="bg-white border-2.5 border-brand-espresso rounded-3xl p-6 sm:p-8 shadow-paper space-y-5"
    >
      <div className="flex items-center justify-between pb-3 border-b-2 border-brand-espresso/15">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-terracotta" />
          <h3 className="font-heading text-lg sm:text-xl font-black text-brand-espresso">
            Send a Message
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-brand-olive/60 text-brand-espresso border border-brand-espresso/30">
          Direct Inbox
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-brand-espresso mb-1">
            Your Name <span className="text-brand-terracotta">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Dr. Sarah Jenkins or Pet Parent"
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
          <option value="general">General Inquiry & Feedback</option>
          <option value="formula">Veterinary Formula & Algorithm Suggestion</option>
          <option value="breed">Breed Guide / Clinical Standard Correction</option>
          <option value="partnership">Veterinary Partnership / Press Inquiry</option>
          <option value="bug">Bug Report / Technical Performance</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-mono font-bold uppercase text-brand-espresso mb-1">
          Message <span className="text-brand-terracotta">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Share your thoughts, suggestions, or algorithmic notes here..."
          className="w-full bg-[#FAF4EE] border-2 border-brand-espresso rounded-xl p-3.5 text-xs sm:text-sm font-sans font-medium text-brand-espresso placeholder:text-brand-taupe/60 shadow-paper-sm focus:outline-none focus:border-brand-terracotta leading-relaxed"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn-pill btn-pill-espresso hover:btn-pill-terracotta w-full py-3 px-6 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-between shadow-paper-sm hover:shadow-paper transition-all cursor-pointer group"
      >
        <span>Send Message to PawTruth</span>
        <span className="w-7 h-7 rounded-full bg-brand-olive text-brand-espresso flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
          <Send className="w-3.5 h-3.5" />
        </span>
      </button>
    </form>
  );
}
