# Deployment Notes

- Deploy target: **Forpsi** shared hosting (Apache) at https://www.antoninfigueroa.cz
- Deploy: run `./deploy.sh` from your machine — builds CRA and uploads `frontend/build/` to `/www/` over FTP (creds in `.env.deploy`, git-ignored)
- No CI auto-deploy: Forpsi rejects FTP logins from GitHub Actions IPs (530), so deploys are local
- SPA routing handled by `frontend/public/.htaccess` (copied into the build)
- `date-fns` pinned to `3.6.0` for `react-day-picker@8` peer compatibility
- `.npmrc` enables `legacy-peer-deps` as belt-and-suspenders fallback
