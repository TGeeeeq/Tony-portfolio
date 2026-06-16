# Deployment Notes

- Deploy target: **Forpsi** shared hosting (Apache) at https://www.antoninfigueroa.cz
- Deploy path: push to `main` → GitHub Actions `deploy-forpsi.yml` builds CRA and uploads `frontend/build/` to `/www/` over FTP
- Manual fallback: build locally + `lftp` mirror using creds in `.env.deploy` (git-ignored)
- SPA routing handled by `frontend/public/.htaccess` (copied into the build)
- `date-fns` pinned to `3.6.0` for `react-day-picker@8` peer compatibility
- `.npmrc` enables `legacy-peer-deps` as belt-and-suspenders fallback
