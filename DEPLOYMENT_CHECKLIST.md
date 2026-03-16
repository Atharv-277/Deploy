# Deployment Checklist

## 1) Required Environment Variables

### Backend (`backend/.env`)
- `PORT`
- `MONGO_URI`
- `FRONTEND_URL` (comma-separated allowed origins, e.g. `https://app.example.com,https://admin.example.com`)
- `ADMIN_PASSWORD`
- `ADMIN_TOKEN_SECRET`
- `ADMIN_TOKEN_TTL_MS` (optional, defaults to 8 hours)

### Frontend (`Frontend/.env`)
- `VITE_API_BASE_URL` (must point to deployed backend URL)

## 2) Build & Run Validation

### Backend
- `cd backend`
- `npm ci`
- `npm start`
- Verify: `GET /api/health` returns 200

### Frontend
- `cd Frontend`
- `npm ci`
- `npm run build`
- Serve `dist/` using your static host

## 3) SPA Routing (Critical)

Because the app uses React Router BrowserRouter, configure rewrite/fallback to `index.html`.

- Nginx: `try_files $uri /index.html;`
- Netlify: add `_redirects` with `/* /index.html 200`
- Vercel: add rewrites in `vercel.json`

## 4) CORS & API Connectivity

- Ensure backend `FRONTEND_URL` exactly matches deployed frontend origin(s).
- Ensure frontend `VITE_API_BASE_URL` points to backend public URL.
- Test from browser: no CORS errors on `/api/*` requests.

## 5) Data & Upload Storage

Current backend writes uploads and fallback content to local disk.

- `backend/uploads/`
- `backend/data/*.json`

On ephemeral hosts, files may be lost after restart/redeploy.

Recommended:
- Move uploads to cloud object storage (S3/Azure Blob/Cloudinary).
- Keep authoritative content in MongoDB (avoid relying on local JSON fallback in production).

## 6) Security Hardening

- Rotate all secrets before production deploy.
- Never commit real `.env` files.
- Add rate limiting to admin login.
- Add `helmet` middleware.
- Keep HTTPS enabled at the edge/proxy.

## 7) Post-Deploy Smoke Tests

- Home page loads with no console errors.
- `/contact` form submission succeeds.
- `/get-quote` form submission succeeds.
- Admin login + protected API actions succeed.
- Product image upload works and returned URL is publicly reachable.
- Deep link reload works (e.g. `/contact`, `/admin/network`).

## 8) Performance Follow-ups

- Large media assets should be optimized/compressed.
- Consider lazy loading for heavy sections/components.
- Serve media via CDN with caching headers.
