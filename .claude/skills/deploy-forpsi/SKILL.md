---
name: deploy-forpsi
description: >-
  Deploy the Tony Figueroa portfolio (CRA + craco frontend) to Forpsi shared
  hosting over FTP. Use when the user asks to "nahrát na Forpsi", "deploy to
  Forpsi", publish/update the live site, or upload the build via FTP. Explains
  why FTP fails from Claude Code cloud sessions and how to deploy anyway.
---

# Deploy to Forpsi (FTP)

The portfolio lives in `frontend/` (Create React App + craco). The production
build is `frontend/build/`. Forpsi is the live host, reached over FTP.

## CRITICAL: FTP does not work from Claude Code cloud sessions

Claude Code on the web / mobile runs in an isolated cloud container whose
network policy allows **only outbound HTTPS (443)**. FTP (21), FTPS (990) and
SFTP (22) are all blocked at the TCP level. Verify with:

```bash
timeout 10 bash -c 'cat </dev/null >/dev/tcp/ftpx.forpsi.com/21' && echo OPEN || echo BLOCKED
```

If it prints `BLOCKED`, you are in the cloud sandbox — do **not** try to FTP
from here, it will only time out. Use the GitHub Action path below.

(Claude Code running **locally** in a terminal uses the user's own network, so
direct FTP works there. That is how past manual uploads succeeded.)

## Connection details

- Host: `ftpx.forpsi.com`
- Username: `www.antoninfigueroa.cz`
- Protocol: plain FTP, port 21
- Remote web root: typically `/www/` (confirm via Forpsi file manager if unsure)
- Password: held by the user — keep it in GitHub Secrets, never in chat or git.

## Preferred path: GitHub Action (works from any session)

A workflow already exists at `.github/workflows/deploy-forpsi.yml`. It builds
the frontend and uploads `frontend/build/` to Forpsi via FTP on every push to
`main`, and can also be triggered manually (`workflow_dispatch`). It runs on
GitHub runners, which have full network access.

One-time setup the **user** must do (Repo → Settings → Secrets and variables →
Actions):

| Secret         | Value                          |
| -------------- | ------------------------------ |
| `FTP_SERVER`   | `ftpx.forpsi.com`              |
| `FTP_USERNAME` | `www.antoninfigueroa.cz`       |
| `FTP_PASSWORD` | the (rotated) FTP password     |

Optional repo **variable** `FTP_SERVER_DIR` overrides the remote dir (default
`/www/`).

To deploy: push to `main` (or run the workflow manually). Check the run under
the repo's Actions tab. The agent can confirm status via the GitHub MCP tools
(`mcp__github__actions_list` / `actions_get` / `get_job_logs`).

## Fallback: direct FTP from a local terminal

When Claude Code runs locally (FTP port reachable), upload with curl or lftp:

```bash
cd frontend && yarn install --frozen-lockfile && yarn build
# mirror build/ to the web root
lftp -u "www.antoninfigueroa.cz,PASSWORD" ftpx.forpsi.com \
  -e "set ftp:ssl-allow no; mirror -R --delete --verbose frontend/build/ /www/; bye"
```

or per-file with curl:

```bash
curl -T frontend/build/index.html \
  --user "www.antoninfigueroa.cz:PASSWORD" \
  "ftp://ftpx.forpsi.com/www/index.html"
```

## Build settings (must match Netlify/CRA config)

- Node 20, Yarn 1.22.x
- `CI=false` (CRA otherwise treats warnings as errors)
- `GENERATE_SOURCEMAP=false`
- Build command: `yarn install --frozen-lockfile && yarn build` in `frontend/`

## Security note

The FTP password must never be pasted into chat or committed to git. If it has
been exposed, tell the user to rotate it in the Forpsi admin and update the
`FTP_PASSWORD` GitHub Secret.
