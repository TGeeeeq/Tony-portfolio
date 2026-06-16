# Antonín Figueroa — Portfolio

Personal portfolio site bridging nature, spirit, and modern technology.
Built with **React (CRA + craco)** + **TailwindCSS** + **shadcn/ui**.

Live: **https://www.antoninfigueroa.cz**

---

## 🚀 Deploy (Forpsi shared hosting)

The site runs on **Forpsi** shared hosting (Apache) at **https://www.antoninfigueroa.cz**,
served as a static CRA build from the `/www/` web root.

### Automatic — GitHub Actions (FTP)

Every push to `main` runs `.github/workflows/deploy-forpsi.yml`, which builds the
frontend and uploads `frontend/build/` to Forpsi over FTP.

Required repository **secrets** (Settings → Secrets and variables → Actions):

| Secret         | Example                  |
|----------------|--------------------------|
| `FTP_SERVER`   | `ftpx.forpsi.com`        |
| `FTP_USERNAME` | `www.antoninfigueroa.cz` |
| `FTP_PASSWORD` | the current FTP password |

Optional repo **variable** `FTP_SERVER_DIR` overrides the web root (defaults to `/www/`).

> ⚠️ If Forpsi's FTP password is rotated, update the `FTP_PASSWORD` secret too —
> otherwise the deploy fails with `530 Login authentication failed`.

### Manual — FTP from your machine

Credentials live in `.env.deploy` (git-ignored). Build, then mirror the output up:

```bash
cd frontend && CI=false GENERATE_SOURCEMAP=false yarn build && cd ..
set -a; . ./.env.deploy; set +a
lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" \
  -e "set ftp:ssl-allow no; mirror -R ./frontend/build/ ${FTP_REMOTE:-/www}/ ; bye"
```

### SPA routing

`frontend/public/.htaccess` rewrites all non-file routes to `index.html`, so client-side
routes (`/sluzby`, `/nastroje`, `/blog/...`) work on direct load and refresh. CRA copies
it into `frontend/build/` automatically.

---

## 📝 Local development

```bash
cd frontend
yarn install
yarn start          # runs at http://localhost:3000
yarn build          # production build into frontend/build
```

---

## 🗂️ Where to edit content

| What                                | File                                       |
|-------------------------------------|--------------------------------------------|
| All text & translations (CS/EN/RU/ES)| `frontend/src/mock.js`                     |
| Services & pricing (data + i18n)     | `frontend/src/mock.js` (`PRICING`, `pricing`)|
| Projects, contacts, image URLs      | `frontend/src/mock.js`                     |
| Colors / fonts / animations         | `frontend/src/index.css`                   |
| Hero & spy-scanner photo            | `frontend/src/components/Hero.jsx`         |
| Project cards / logo cropping       | `frontend/src/components/Projects.jsx`     |
| Contact (mailto)                    | `frontend/src/components/Contact.jsx`      |
| Footer                              | `frontend/src/components/Footer.jsx`       |
| AF monogram (animated logo)         | `frontend/src/components/AFLogo.jsx`       |

---

## 🔧 Tech

- React 19 + React Router 7
- TailwindCSS 3.4 + shadcn/ui (Radix primitives)
- Lucide-react icons
- Cormorant Garamond + Inter + JetBrains Mono (Google Fonts)
- Sonner for toasts

## 📨 Contact

The contact section uses a **mailto:** link — no backend required.
Messages open the visitor's email app prefilled to `antoninfigueroa@nechmerust.org`.
