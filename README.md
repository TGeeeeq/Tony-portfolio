# Antonín Figueroa — Portfolio

Personal portfolio site bridging nature, spirit, and modern technology.
Built with **React (CRA + craco)** + **TailwindCSS** + **shadcn/ui**.

Live: _set after Netlify deploy_

---

## 🚀 Deploy on Netlify

This repo is preconfigured. Just connect it to Netlify:

1. Go to https://app.netlify.com/start
2. **Add new site → Import an existing project → GitHub**
3. Choose `TGeeeeq/Tony-portfolio`
4. Netlify reads `netlify.toml` automatically. The values are:
   - **Base directory**:   `frontend`
   - **Build command**:    `yarn install --frozen-lockfile && yarn build`
   - **Publish directory**: `frontend/build`
   - **Node version**:     `20`
5. Click **Deploy site**. First build takes ~2–3 minutes.
6. (Optional) Add a custom domain in **Site settings → Domain management**.

No environment variables are required for the current build.

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
