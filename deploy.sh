#!/usr/bin/env bash
# Deploy the portfolio to Forpsi shared hosting.
# Builds the CRA frontend and uploads frontend/build/ to the web root over FTP.
#
# Credentials come from .env.deploy (git-ignored):
#   FTP_HOST, FTP_USER, FTP_PASS, FTP_REMOTE (defaults to /www)
#
# Why local-only: Forpsi rejects FTP logins from GitHub Actions runner IPs (530),
# so CI auto-deploy isn't possible — run this from your own machine.
set -euo pipefail

cd "$(dirname "$0")"

if [[ ! -f .env.deploy ]]; then
  echo "✗ .env.deploy not found (needs FTP_HOST, FTP_USER, FTP_PASS, FTP_REMOTE)" >&2
  exit 1
fi

echo "▸ Building frontend…"
( cd frontend && CI=false GENERATE_SOURCEMAP=false yarn build )

set -a; . ./.env.deploy; set +a
: "${FTP_HOST:?missing in .env.deploy}" "${FTP_USER:?missing in .env.deploy}" "${FTP_PASS:?missing in .env.deploy}"
REMOTE="${FTP_REMOTE:-/www}"

echo "▸ Uploading frontend/build/ → ${FTP_HOST}:${REMOTE}/ …"
# Note: add --delete to the mirror line below if you want to purge stale remote
# files (old hashed chunks). Left off by default to avoid removing anything
# that isn't part of the build.
lftp -u "$FTP_USER","$FTP_PASS" "$FTP_HOST" -e "
  set ftp:ssl-allow no;
  set net:timeout 25;
  set net:max-retries 2;
  set mirror:parallel-transfer-count 4;
  mirror -R --verbose --no-perms ./frontend/build/ ${REMOTE}/;
  bye
"

echo "✓ Deployed to https://www.antoninfigueroa.cz"
