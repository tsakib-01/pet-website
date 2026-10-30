import { NextRequest, NextResponse } from "next/server";

// Hidden recipient address — never exposed to client bundles or browser DOM
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "pawtrusty.official@gmail.com";

// Security pattern detecting suspicious URLs, web protocols, markdown links, HTML tags, and file extensions
const FORBIDDEN_CONTENT_REGEX =
  /(https?:\/\/|ftp:\/\/|www\.)|(\b[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)|(\[[^\]]*\]\([^)]*\))|(<[^>]+>)|(data:\w+\/\w+)|(\.(?:pdf|exe|zip|rar|docx|xlsx|tar|gz|png|jpg|jpeg|gif|webp)\b)/i;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUBJECT_LABELS: Record<string, string> = {
  general: "General Feedback & Suggestions",
  formula: "Veterinary Formula & Algorithm Suggestion",
  breed: "Breed Guide / Health Standard Note",
  partnership: "Clinical Partnership / Press Inquiry",
  bug: "Technical Issue / Formula Correction",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON payload provided." },
        { status: 400 }
      );
    }

    const { name, email, subject, message, _hp } = body;

    // Honeypot spam trap: if a bot filled the hidden honeypot field, drop silently
    if (_hp) {
      return NextResponse.json({ ok: true, message: "Message received." });
    }

    // Input Validations
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: "Please provide your name." },
        { status: 400 }
      );
    }

    if (name.length > 100 || FORBIDDEN_CONTENT_REGEX.test(name)) {
      return NextResponse.json(
        { ok: false, error: "Name must be under 100 characters and cannot contain URLs." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (email.length > 120) {
      return NextResponse.json(
        { ok: false, error: "Email address is too long." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { ok: false, error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { ok: false, error: "Message cannot exceed 2,000 characters." },
        { status: 400 }
      );
    }

    if (FORBIDDEN_CONTENT_REGEX.test(message)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Security Policy: Plain text only. Web links, URLs, and file attachments are strictly prohibited.",
        },
        { status: 400 }
      );
    }

    const humanTopic = SUBJECT_LABELS[subject] || "General Inquiry";
    const cleanedName = name.trim();
    const cleanedEmail = email.trim();
    const cleanedMessage = message.trim();

    // Dispatch email securely via serverless HTTP call
    // The client never communicates with formsubmit.co directly, keeping RECIPIENT_EMAIL 100% private.
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: cleanedName,
        email: cleanedEmail,
        _replyto: cleanedEmail,
        topic: humanTopic,
        message: cleanedMessage,
        _subject: `[PawTrusty Contact] ${humanTopic} from ${cleanedName}`,
        _template: "table",
        _captcha: "false",
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("FormSubmit dispatch error:", res.status, errText);
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to dispatch email. Please try again or reach out later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Your message has been delivered to PawTrusty editorial desk.",
    });
  } catch (error) {
    console.error("API /api/contact unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
