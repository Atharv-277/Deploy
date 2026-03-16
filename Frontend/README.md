# Frontend Deployment Notes

## Production API URL

This frontend reads backend URL from `VITE_API_BASE_URL`.

Production default in this repo is set in `.env.production`:

`VITE_API_BASE_URL=https://a2k-v1-0.onrender.com`

You can still override it in your hosting provider environment settings.

## Build Commands

- Install: `npm install`
- Build: `npm run build`
- Output directory: `dist`

## SPA Routing (Important)

This app uses React Router (`BrowserRouter`).
Your static host must rewrite all non-file routes to `index.html`.

Examples:

- Netlify: `_redirects` with `/* /index.html 200`
- Vercel: rewrite config in `vercel.json`
- Nginx: `try_files $uri /index.html;`
