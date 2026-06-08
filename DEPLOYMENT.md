# How to Push and Deploy PH Calculators

## Push to GitHub (shell commands)

```bash
# First time setup — run these once
git config --global user.email "you@email.com"
git config --global user.name "Your Name"

# Add your GitHub repo as remote (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/ph-calculators.git

# Push your code
git add .
git commit -m "Initial PH Calculators site"
git push -u origin main
```

## Deploy to Vercel (free, no credit card)

### Option A — Vercel CLI (simplest)
```bash
# Install Vercel CLI
npm install -g vercel

# Go to the calculator folder
cd artifacts/ph-calculators

# Deploy (follow the prompts, it's free)
vercel
```

### Option B — Connect GitHub to Vercel (auto-deploy on push)
1. Go to vercel.com → Sign up free with GitHub
2. Click "Add New Project"
3. Import your GitHub repo
4. Set these build settings:
   - Build Command: `cd ../.. && pnpm --filter @workspace/ph-calculators run build`
   - Output Directory: `artifacts/ph-calculators/dist/public`
   - Install Command: `npm install -g pnpm && pnpm install --frozen-lockfile`
5. Add environment variables:
   - BASE_PATH = /
   - PORT = 3000
   - NODE_ENV = production
6. Click Deploy — done. Every git push auto-deploys.

## Everyday workflow

```bash
# Make changes, then:
git add .
git commit -m "Add new calculator"
git push
# Vercel auto-deploys in ~2 minutes
```
