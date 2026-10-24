# Sayyid Omid Mousavi Mehr — Personal Resume & Analytics Platform

A minimal, high-craft, production-grade personal resume website and built-in privacy-first analytics administrative dashboard built for **Sayyid Omid Mousavi Mehr**, Senior Data Engineer specializing in Agentic Systems and Spec-Driven Development (SDD).

Live local development: `http://localhost:3000` (English at `/en`, Persian at `/fa`, Admin at `/admin`).

---

## 1. Architectural Highlights

- **Bilingual & Truly ATS-Friendly**: Full bilingual support (English LTR + Persian RTL) powered by a strictly-typed content layer. Self-hosts variable fonts (`Geist Sans`, `Geist Mono`, and `Vazirmatn`) with zero external Google Fonts network calls.
- **Print & PDF Engine**: Pixel-perfect `@media print` A4 stylesheet. Clean two-page executive printout without UI clutter or layout breaks.
- **Keyboard-First Navigation**: Fast command palette (`⌘K` or `?`) for jumping to sections, toggling themes, switching languages, and exporting PDFs.
- **First-Party Analytics**: Plausible/Umami-style built-in telemetry running entirely on your own database with **zero third-party trackers, zero cookies, and zero raw IP addresses stored**.
- **Admin Dashboard**: Comprehensive panel covering real-time visitors, acquisition channels (referrers, UTM parameters), audience demographics (edge countries, devices, browsers), engagement funnels, requests logs, and recruiter message inbox.

---

## 2. Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 + Radix UI / headless primitives
- **Database & ORM**: Prisma ORM with SQLite (local dev) or PostgreSQL (production)
- **Visualizations**: Recharts
- **Validation**: Zod
- **Testing**: Vitest for unit test suites and Playwright for e2e smoke tests
- **Deployment**: Multi-stage `Dockerfile`, `docker-compose.yml`, and Vercel support

---

## 3. Quick Start (Clean Setup)

```bash
# 1. Clone the repository
git clone https://github.com/SOMM-55/resume.git
cd resume

# 2. Copy the environment configuration
cp .env.example .env

# 3. Install dependencies using pnpm
pnpm install

# 4. Initialize SQLite database and run seeds (creates sample telemetry and admin user)
pnpm db:push
pnpm db:seed

# 5. Start the development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Environment Variables Reference

| Variable | Description | Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | Prisma connection string (`file:./dev.db` or PostgreSQL) | `file:./dev.db` |
| `ADMIN_USERNAME` | Single-admin login username | `admin` |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash for admin password (`admin123` by default) | `$2b$10$...` |
| `AUTH_SECRET` | 32+ character key for signing admin session cookies | (Random dev secret) |
| `ANALYTICS_SALT_SECRET` | 32+ character key used to derive daily rotating visitor salt | (Random dev secret) |
| `NEXT_PUBLIC_SITE_URL` | Canonical public site URL | `http://localhost:3000` |
| `RESEND_API_KEY` | (Optional) Resend API key for forwarding contact submissions | `""` |
| `CONTACT_FORWARD_EMAIL` | (Optional) Destination inbox for contact submissions | `""` |

To generate a new bcrypt password hash for the admin:
```bash
node -e "console.log(require('bcryptjs').hashSync('your-new-password', 10))"
```

---

## 5. Editing Resume Content (Zero Component Touching)

All resume content is strictly typed and decoupled from presentation components. **Editing the resume never requires modifying component code.**

- **English Content**: Edit `/src/content/en.ts`
- **Persian Content**: Edit `/src/content/fa.ts`
- **Content Type Schema**: Defined in `/src/content/schema.ts` via Zod.

Any schema mismatch will be caught at build or typecheck time (`pnpm typecheck`).

### Adding a New Language (e.g. German `de`)

1. Create `/src/content/de.ts` implementing `ResumeContent`.
2. Update `/src/content/index.ts`:
   - Add `"de"` to `LOCALES`.
   - Add metadata label to `LOCALE_META`.
   - Register the validated content in `contentMap`.
3. Add the locale to `/src/app/sitemap.ts` and middleware matching.

---

## 6. First-Party & Privacy-First Analytics

This platform implements an ethical, privacy-first telemetry architecture:

1. **Daily Rotating Salt**: Visitor identities are calculated as:
   ```
   visitorId = HMAC-SHA256(IP + UserAgent, HMAC-SHA256(ANALYTICS_SALT_SECRET, YYYY-MM-DD))
   ```
   **Raw IPs and User-Agents are immediately discarded and never written to disk or database.**
2. **Zero Tracking Cookies**: No persistent cookies or fingerprinting scripts are set on public visitors.
3. **Respects DNT & GPC**: Requests containing `Do Not Track` or `Global Privacy Control` headers are silently ignored.
4. **Lightweight Beacon**: The client script (`/analytics.js`) is under 2 KB, cached for 24 hours, and uses `navigator.sendBeacon` for non-blocking telemetry.
5. **On-Write Daily Rollups**: Metric counts are automatically aggregated into `DailyRollup` records to ensure the dashboard remains instantaneous as data grows.
6. **Exclusions**: IP addresses and User-Agents specified in Admin Settings are excluded from metrics.

---

## 7. Administrative Portal (`/admin`)

Access the admin dashboard at `/admin`.

Default credentials:
- **Username**: `admin`
- **Password**: `admin123`

### Security Safeguards
- Session tokens are signed using HMAC-SHA256 and stored in `httpOnly`, `sameSite=lax`, `secure` cookies.
- Brute-force lockout: After 5 failed login attempts from an IP within 15 minutes, login is blocked for 15 minutes.
- All admin and API routes are strictly guarded by `X-Robots-Tag: noindex, nofollow, noarchive`.

### Views
1. **Overview**: Date-range selector (Today, 7d, 30d, 90d) with previous-period comparison percentages, 6 KPI cards, and an interactive area chart with accessible table fallback.
2. **Acquisition**: Direct vs Social vs Search breakdown, top referrers list, and UTM campaign tracking (`utm_source`, `utm_medium`, `utm_campaign`).
3. **Audience**: Geographic countries derived from edge platform headers, device breakdown (Desktop, Mobile, Tablet), browsers, operating systems, and language distribution.
4. **Engagement (Resume-Specific)**: Section read rates tracked via `IntersectionObserver`, recruiter funnel (Total Visits → Viewed Experience → Downloaded PDF / Contacted), and outbound link clicks.
5. **Requests Log**: Filterable table (All, Humans, Bots, Errors) displaying status codes, response latencies, and slowest routes.
6. **Messages Inbox**: Recruiter contact form submissions with read/unread flags, archive, delete, and one-click `mailto:` reply.
7. **Settings & Export**: IP/UA exclusion configuration, bot filter toggles, data retention rules, and raw telemetry export as CSV or JSON.

---

## 8. Deployment Options

### Option A: Docker / VPS (Self-Hosted PostgreSQL)
```bash
# Build and start the container stack
docker compose up -d --build

# Run database migrations in container
docker compose exec app pnpm db:deploy
```

### Option B: Vercel
1. Push this repository to GitHub or GitLab.
2. Import the project in Vercel.
3. Configure environment variables in the Vercel Project Settings (provision a Vercel Postgres or Supabase database and set `DATABASE_URL`).
4. Set build command: `prisma generate && next build`.

---

## 9. Testing & Quality Verification

```bash
# Run ESLint
pnpm lint

# Run strict TypeScript typecheck
pnpm typecheck

# Run Vitest unit tests (content schema, salts, bot heuristics, tokens)
pnpm test

# Run Playwright e2e smoke tests
pnpm test:e2e
```
