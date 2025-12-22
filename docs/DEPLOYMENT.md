# Deployment Guide

This guide explains how to deploy the Language Translation Tool to various platforms.

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

**Step 1: Prepare for Vercel**

1. Create `vercel.json` in project root (already created below)

2. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/translation-tool.git
git push -u origin main
```

**Step 2: Deploy to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
6. Add Environment Variables:
   - `GOOGLE_API_KEY` = your-api-key
   - `USE_MYMEMORY` = true
7. Click "Deploy"

Your app will be live at: `https://your-project.vercel.app`

---

### Option 2: Netlify

**Step 1: Prepare for Netlify**

1. Create `netlify.toml` (already created below)

2. Push to GitHub (same as Vercel)

**Step 2: Deploy to Netlify**

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose your GitHub repository
5. Configure:
   - Build command: (leave empty)
   - Publish directory: `.`
6. Add Environment Variables in Site Settings:
   - `GOOGLE_API_KEY` = your-api-key
   - `USE_MYMEMORY` = true
7. Click "Deploy"

Your app will be live at: `https://your-site-name.netlify.app`

---

### Option 3: Heroku

**Step 1: Install Heroku CLI**
```bash
brew install heroku/brew/heroku  # Mac
# or
curl https://cli-assets.heroku.com/install.sh | sh  # Linux
```

**Step 2: Deploy**
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set USE_MYMEMORY=true
heroku open
```

---

### Option 4: Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables
6. Deploy automatically

---

### Option 5: DigitalOcean App Platform

1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Choose GitHub as source
4. Select your repository
5. Configure:
   - HTTP Port: 3000
   - Run Command: `npm start`
6. Add environment variables
7. Click "Launch App"

---

## Local Deployment (Production Mode)

### For Personal/Team Use:

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd language-translation-tool
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your settings
```

4. **Start the server:**
```bash
npm start
```

5. **Access at:** `http://localhost:3000`

---

## Environment Variables

Required environment variables:

```bash
# Translation API Selection
USE_MYMEMORY=true          # Use free MyMemory API (recommended)
USE_MOCK=false             # Use demo mode (for testing only)

# Optional: Google Translate API
GOOGLE_API_KEY=your-key    # Only if using Google Translate
```

---

## Server Requirements

**Minimum:**
- Node.js 14.0.0 or higher
- 128 MB RAM
- 100 MB disk space

**Recommended:**
- Node.js 18.0.0 or higher
- 256 MB RAM
- 500 MB disk space

---

## Custom Domain Setup

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown

### Netlify:
1. Go to Site Settings → Domain management
2. Add custom domain
3. Update DNS records

---

## SSL/HTTPS

All recommended platforms (Vercel, Netlify, Heroku, Railway) provide **automatic HTTPS** with Let's Encrypt certificates.

---

## Monitoring & Logs

### Vercel:
- View logs in dashboard → Deployments → Select deployment → Logs

### Netlify:
- View logs in dashboard → Deploys → Select deploy → Deploy log

### Heroku:
```bash
heroku logs --tail
```

---

## Performance Optimization

1. **Enable Compression** (already done in code)
2. **Use CDN** (automatic on Vercel/Netlify)
3. **Cache Static Assets** (configured in server)
4. **Rate Limiting** (add if needed for production)

---

## Troubleshooting

**Issue: Port already in use**
```bash
# Find process on port 3000
lsof -i :3000
# Kill it
kill -9 <PID>
```

**Issue: Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Issue: Translation fails**
- Check environment variables are set correctly
- Verify `USE_MYMEMORY=true`
- Check server logs for errors

---

## Security Checklist

- [ ] Environment variables stored securely
- [ ] API keys not committed to Git
- [ ] HTTPS enabled
- [ ] CORS configured if needed
- [ ] Rate limiting implemented
- [ ] Input validation enabled
- [ ] Dependencies updated

---

## Backup & Maintenance

**Backup:**
```bash
# Backup code
git push origin main

# Backup environment variables (store securely)
cp .env .env.backup
```

**Updates:**
```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit
npm audit fix
```

---

## Cost Estimates

### Free Tier Options:
- **Vercel Free:** Unlimited personal projects
- **Netlify Free:** 100 GB bandwidth/month
- **Railway Free:** $5 credit/month
- **Heroku Free:** No longer available (paid plans start at $7/month)
- **MyMemory API:** Free (no API key required)

**Recommended for Production: Vercel or Netlify (Free tier is sufficient)**

---

## Support

For issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check server console output

---

## Next Steps After Deployment

1. Test all features in production
2. Set up custom domain (optional)
3. Configure analytics (optional)
4. Add monitoring alerts
5. Share with users!
