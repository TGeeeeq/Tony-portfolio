# Antonín Figueroa — Portfolio

Personal portfolio site bridging nature, spirit, and modern technology.
Built with **React (CRA + craco)** + **TailwindCSS** + **shadcn/ui**.

Live: **https://www.antoninfigueroa.cz**

---

## 🚀 Deploy (Forpsi shared hosting)

The site runs on **Forpsi** shared hosting (Apache) at **https://www.antoninfigueroa.cz**,
served as a static CRA build from the `/www/` web root.

Deploy from your machine with one command:

```bash
./deploy.sh
```

It builds the frontend and uploads `frontend/build/` to Forpsi over FTP using the
credentials in `.env.deploy` (git-ignored): `FTP_HOST`, `FTP_USER`, `FTP_PASS`, `FTP_REMOTE`.

> ℹ️ There is **no CI auto-deploy**. Forpsi rejects FTP logins from GitHub Actions runner
> IPs (`530 Login authentication failed`), so deploys run locally via `deploy.sh`.

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
