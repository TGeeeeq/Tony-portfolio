# Antonín Figueroa — Portfolio

Personal portfolio site bridging nature, spirit, and modern technology.
Built with **React (CRA + craco)** + **TailwindCSS** + **shadcn/ui**.

Live: _set after Netlify deploy_

---

## 🚀 Deploy on Vercel

This repo is preconfigured with `vercel.json`. Steps:

1. Go to https://vercel.com/new
2. **Import Git Repository** → choose `TGeeeeq/Tony-portfolio`
3. On the import screen, Vercel auto-detects the `vercel.json`:
   - **Framework Preset**: *Other* (driven by `vercel.json`)
   - **Root Directory**: `./` *(leave as is — `vercel.json` handles `cd frontend`)*
   - **Build Command**: *(auto, from `vercel.json`)*
   - **Output Directory**: *(auto, from `vercel.json`)*
4. Click **Deploy**. First build takes ~2–3 minutes.
5. (Optional) Add a custom domain in **Project → Settings → Domains**.

No environment variables are required for the current build.

> 💡 `netlify.toml` is also included for flexibility but Vercel ignores it.

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
| All text & translations (CS/EN/RU)  | `frontend/src/mock.js`                     |
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
