# vidpace.com

Static marketing site for VidPace, built with Astro 5 and deployed on Vercel.

- `npm run dev` starts a local server at http://localhost:4321
- `npm run build` writes the site to `dist/`
- Prices, plans, terms, FAQs and niche pages all live in `src/data/site.ts`
- The audit form posts to EmailJS (template params: `from_name`, `from_email`, `message`)
