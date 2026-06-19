# Tony Figueroa — Portfolio

CRA + craco frontend v `frontend/`. Produkční build jde do `frontend/build/`.
Živý web: **https://www.antoninfigueroa.cz** — hosting Forpsi (shared FTP hosting).

## Deploy na Forpsi — PŘEČTI NA ZAČÁTKU KAŽDÉ SESSION

**Stav k 2026-06-19:** Kód je v `main`, ale web ještě NENÍ live — deploy nebyl spuštěn.

### Proč deploy nejde z cloudu
Claude Code na webu/mobilu běží v izolovaném cloudovém kontejneru.
FTP port 21 je blokován. GitHub Actions jsou blokovány Forpsi (vrací 530).
**Deploy jde jen z lokálního počítače uživatele.**

### Jak deployovat (spustit z lokálního terminálu)
```bash
# 1. Pull nejnovější main
git pull origin main

# 2. Spustit deploy skript (potřebuje .env.deploy)
./deploy.sh
```

Soubor `.env.deploy` (git-ignored, musí existovat lokálně):
```
FTP_HOST=ftpx.forpsi.com
FTP_USER=www.antoninfigueroa.cz
FTP_PASS=<heslo z Forpsi adminu>
FTP_REMOTE=/www
```

Skript: buildne frontend (`CI=false GENERATE_SOURCEMAP=false yarn build`) a nahraje `frontend/build/` přes lftp.

### Checklist pro deploy session
Až uživatel spustí Claude Code z počítače:
1. Připomenout: `git pull origin main && ./deploy.sh`
2. Ověřit, že `.env.deploy` existuje a má správné heslo
3. Po deployi zkontrolovat https://www.antoninfigueroa.cz

## Stack
- React 18, CRA + craco, Tailwind CSS, React Router v6
- Veškerý obsah a překlady (CS/EN/RU/ES) v `frontend/src/mock.js`
- Komponenty v `frontend/src/components/`
- Statická média v `frontend/public/media/`

## Co bylo naposledy změněno (2026-06-19)
- Stránka Služby: přidána tabulka srovnání cen agentura vs. Tony (všechny 4 jazyky)
- Nové projekty: Škola pokojný bojovník (skolapokojnybojovnik.cz) + Vejce Chvalov / Vaječný deník (vejcechvalov.cz)
- Loga: `skola-pokojny-bojovnik-logo.jpg`, `vejcechvalov-logo.svg` v `public/media/`
