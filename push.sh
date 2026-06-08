#!/bin/bash
# ─────────────────────────────────────────────
# PH Calculators — GitHub Push Script
# Run: bash push.sh
# ─────────────────────────────────────────────

set -e

# ── 1. Check there is something to push ───────
if git --no-optional-locks diff --quiet && git --no-optional-locks diff --cached --quiet; then
  echo ""
  echo "✓ Nothing new to commit. Running git push anyway to sync..."
  git push origin main
  echo "✓ Done."
  exit 0
fi

# ── 2. Show what changed ──────────────────────
echo ""
echo "Files changed:"
git --no-optional-locks diff --name-only
git --no-optional-locks diff --cached --name-only
echo ""

# ── 3. Ask for a commit message ───────────────
read -p "Commit message (or press Enter for auto): " MSG
if [ -z "$MSG" ]; then
  MSG="Update site $(date '+%Y-%m-%d %H:%M')"
fi

# ── 4. Stage, commit, push ────────────────────
git add .
git commit -m "$MSG"

echo ""
echo "Pushing to GitHub..."
echo "(If asked for a password, paste your GitHub Personal Access Token — not your account password)"
echo "Get one at: https://github.com/settings/tokens → Generate new token (classic) → tick 'repo'"
echo ""

git push origin main

echo ""
echo "✓ Pushed to https://github.com/johnpaul965/ph-calculators"
echo "  Vercel will auto-deploy in ~2 minutes if connected."
