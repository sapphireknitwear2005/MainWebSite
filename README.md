# Sapphire Design LTD — Buyer Website

Production-ready Next.js + Tailwind site optimized to convert international buyers into qualified leads.

## Quick Start

```bash
pnpm i   # or npm i / yarn
cp .env.example .env.local
pnpm dev
```

## One-Click Deploy

- **Vercel:** Import this repo → add environment variables → Deploy.
- **Netlify:** Use Next.js adapter → add environment variables → Deploy.

## Forms Wiring

- **Email:** Set `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`. Uses Resend API.
- **Google Sheets:** Publish an Apps Script as a Web App and paste the URL into `GOOGLE_SHEET_WEBHOOK`.
- **CRM:** Paste webhook URL in `CRM_WEBHOOK_URL`.

### Google Apps Script (paste into Apps Script, publish as Web App)

```javascript
function doPost(e) {
  const sheet =
    SpreadsheetApp.openByUrl("YOUR_SHEET_URL").getSheetByName("Leads");
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.company,
    data.country,
    data.category,
    data.quantity,
    data.targetPrice,
    data.notes,
  ]);
  return ContentService.createTextOutput("ok").setMimeType(
    ContentService.MimeType.TEXT
  );
}
```

## Performance

- Mobile-first, lazy-loaded images (add your WebP/AVIF).
- Tailwind jit; minimal JS; preconnect & prefetch hints included.
- Target Lighthouse ≥95; CLS ≤0.05; TTI ≤3s on 4G (optimize your final images).

## Accessibility

- WCAG 2.1 AA: focus states, skip link, aria labels, form errors.

## SEO

- Semantic HTML, OpenGraph/Twitter, JSON-LD (Organization), sitemap.xml, robots.txt.

## Live Capacity

- Update `/public/data/capacity.json` to refresh the widget without redeploy.

## Internationalization

- Base locale: `en`. Structure is i18n-ready; add locales in `next.config.mjs` and content strings.

## Reports

After deployment, run:

```bash
npx @lhci/cli autorun --collect.url=https://YOUR_DEPLOYED_URL --upload.target=filesystem --upload.outputDir=./site/reports
```

This will populate `/reports` with Lighthouse JSON for desktop & mobile.

## Maintenance (Monthly)

- Verify forms delivery, rotate API keys.
- Update capacity.json, new case studies, certificates.
- Run Lighthouse & axe audits; fix regressions.

## License & Assets

All generated content is yours. Image files are placeholders—replace with your own licensed photos.

```

```
