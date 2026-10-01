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

## Pravidla pro práci se soubory — VŽDY DODRŽUJ

**PŘED každým Edit/Write existujícího souboru ho NEJPRVE přečti nástrojem Read
(v aktuální session).** Grep nestačí — Edit na nepřečtený soubor vždy selže
chybou "File has not been read yet". Tahle chyba se opakovala v mnoha sessions,
typicky u `frontend/src/mock.js` (najdi přes Grep → rovnou Edit → chyba).
U velkých souborů stačí přečíst cílovou sekci přes offset/limit.
Detailní checklist: `.claude/skills/read-before-edit/SKILL.md`.

## Stack
- React 18, CRA + craco, Tailwind CSS, React Router v6
- Veškerý obsah a překlady (CS/EN/RU/ES) v `frontend/src/mock.js`
- Komponenty v `frontend/src/components/`
- Statická média v `frontend/public/media/`

## Co bylo naposledy změněno (2026-10-01) — redesign „noční louka"
- Paleta: noc #07110c, zlatá #e8b04a, zelená #86c35a, červená #e4483c; fonty Unbounded (nadpisy) + Cormorant (italic akcenty) + Onest (text) + JetBrains Mono
- Hero: vinyl s portrétem jako labelem (`HeroPortrait.jsx`), tlačítko pustí syntetizovaný ska riddim (`lib/riddim.js`), louka + červený trpaslík
- Pozadí: světlušky + mycelium síť (`ui/firefly-field.jsx`, nahradilo MatrixRain); pás zálib `InterestsBand.jsx`
- O mně: jezdcova procházka (šachy); Poslání: poker karty; sekce mají šachové tahy 1. e4 …
- Easter eggy (`EasterEggs.jsx`): nox / lumos / smeg / Konami; texty v `UI_EXTRAS` + `INTERESTS` v mock.js
- v2: terminál `Terminal.jsx` (tlačítko >_ vlevo dole, klávesa `), příkazy v `lib/commands.js`, efekty přes event bus `lib/fx.js` → `EasterEggs.jsx`
- v2: boot intro (`BootIntro.jsx`, 1× za session), přechody rout (`RouteWipe` v App.js), odhalování nadpisů po slovech (`Split.jsx`), reveal varianty `r-left/r-right/r-zoom/r-blur/r-flip/r-deal` v index.css, scroll proměnné `--sy/--scroll/--vel`, kurzor `CursorFx.jsx`, Starbug `Starbug.jsx`, 404 `NotFound.jsx`
- Pozor: počáteční transformace reveal animací nesmí přetékat do šířky (mobil se pak oddálí) — `.section` i html/body mají `overflow-x: clip`

## Změny 2026-07-11
- Platební možnosti: poznámka „peníze / Bitcoin a kryptoměny / výměnný obchod" na hlavní stránce (ServicesTeaser) + rozšířená barter sekce na /sluzby (všechny 4 jazyky)
- Nový skill `.claude/skills/read-before-edit` (guardrail: Read před Edit)

## Změny 2026-06-19
- Stránka Služby: přidána tabulka srovnání cen agentura vs. Tony (všechny 4 jazyky)
- Nové projekty: Škola pokojný bojovník (skolapokojnybojovnik.cz) + Vejce Chvalov / Vaječný deník (vejcechvalov.cz)
- Loga: `skola-pokojny-bojovnik-logo.jpg`, `vejcechvalov-logo.svg` v `public/media/`
