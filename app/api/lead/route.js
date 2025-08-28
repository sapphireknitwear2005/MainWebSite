import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      company,
      country,
      category,
      quantity,
      targetPrice,
      notes,
      source,
    } = body || {};
    const payload = {
      name,
      email,
      company,
      country,
      category,
      quantity,
      targetPrice,
      notes,
      source,
      at: new Date().toISOString(),
    };

    // Google Sheets webhook
    if (process.env.GOOGLE_SHEET_WEBHOOK) {
      fetch(process.env.GOOGLE_SHEET_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }

    // CRM webhook
    if (process.env.CRM_WEBHOOK_URL) {
      fetch(process.env.CRM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }

    // Email via Resend (optional)
    if (
      process.env.RESEND_API_KEY &&
      process.env.RESEND_TO &&
      process.env.RESEND_FROM
    ) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM,
            to: process.env.RESEND_TO,
            subject: "New RFQ — Sapphire Design LTD",
            html: `<h2>New RFQ</h2><pre>${JSON.stringify(
              payload,
              null,
              2
            )}</pre>`,
          }),
        });
      } catch {}
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
