# 🚀 Vercel Deployment Guide

Complete step-by-step guide to deploy your Language Translation Tool on Vercel.

**Created by Rania Sultana**

---

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Your code pushed to GitHub

---

## Step 1: Prepare Your Repository

### Push to GitHub

```bash
# Navigate to your project
cd "/Users/apple/Documents/Language translation tool"

# Stage all changes
git add .

# Commit
git commit -m "feat: Ready for Vercel deployment

- Professional folder structure
- Comprehensive documentation
- Working translation with MyMemory API
- Created by Rania Sultana"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/language-translation-tool.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy on Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)**

2. **Sign in/Sign up** with GitHub

3. **Click "Add New..."** → "Project"

4. **Import Git Repository**:
   - Find your `language-translation-tool` repository
   - Click "Import"

5. **Configure Project**:
   ```
   Project Name: language-translation-tool
   Framework Preset: Other
   Root Directory: ./
   Build Command: (leave empty)
   Output Directory: (leave empty)
   Install Command: npm install
   ```

6. **Environment Variables** (IMPORTANT):
   Click "Environment Variables" and add:
   ```
   Name: USE_MYMEMORY
   Value: true
   ```

7. **Click "Deploy"**

8. **Wait 1-2 minutes** for deployment to complete

9. **Your app is live!** 🎉
   - You'll get a URL like: `https://language-translation-tool.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name: language-translation-tool
# - Directory: ./
# - Override settings? No

# Production deployment
vercel --prod
```

---

## Step 3: Verify Deployment

After deployment, test your live app:

1. **Open your Vercel URL** (e.g., https://your-app.vercel.app)

2. **Test translation**:
   - Type: "Hello world"
   - Select: Spanish
   - Click "Translate"
   - Should see: "Hola mundo"

3. **Test features**:
   - ✅ Text-to-speech
   - ✅ Copy to clipboard
   - ✅ Character counter
   - ✅ Input validation

---

## Troubleshooting

### Issue 1: Build Failed

**Error**: `Cannot find module 'src/server.js'`

**Solution**: Verify `vercel.json` is in root directory:
```bash
ls -la vercel.json
```

If missing, copy from config:
```bash
cp config/vercel.json .
git add vercel.json
git commit -m "fix: Add vercel.json to root"
git push
```

Redeploy on Vercel.

---

### Issue 2: Translation Not Working

**Error**: API returns errors or "failed to translate"

**Solution 1**: Check environment variables
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Verify `USE_MYMEMORY=true` exists
5. If missing, add it and redeploy

**Solution 2**: Check server logs
1. Go to Vercel Dashboard
2. Deployments → Select latest
3. Click "View Function Logs"
4. Look for errors

---

### Issue 3: Page Not Loading

**Error**: 404 or blank page

**Solution**: Check `vercel.json` routes:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

Ensure paths match your structure.

---

### Issue 4: Module Not Found

**Error**: `Cannot find module './translate-mymemory'`

**Solution**: Verify file structure:
```bash
# Should see these files:
ls src/
# translate-mymemory.js should be there

# If missing, check imports in server.js
```

---

## Custom Domain Setup

### Add Your Domain:

1. Go to Vercel Dashboard
2. Select your project
3. **Settings** → **Domains**
4. Click **"Add"**
5. Enter your domain (e.g., `translate.yourdomain.com`)
6. Follow DNS configuration instructions
7. Wait for SSL certificate (automatic, ~1 minute)

---

## Environment Variables

### Current Variables:
```
USE_MYMEMORY=true  (Required)
```

### To Add More:
1. Vercel Dashboard → Project → Settings
2. Environment Variables → Add New
3. Name: `YOUR_VARIABLE`
4. Value: `your_value`
5. Apply to: Production, Preview, Development
6. Save

### For Google Translate (if needed):
```
GOOGLE_API_KEY=your_key_here
USE_MYMEMORY=false
```

---

## Automatic Deployments

Once connected to GitHub:

1. **Every push to `main`** = Production deployment
2. **Every pull request** = Preview deployment
3. **Automatic SSL** for all deployments
4. **Global CDN** for fast loading worldwide

---

## Monitoring Your App

### View Logs:
```
Vercel Dashboard
→ Your Project
→ Deployments
→ Select deployment
→ Function Logs
```

### Analytics (Optional):
```
Vercel Dashboard
→ Your Project
→ Analytics
(Upgrade to see detailed analytics)
```

---

## Redeployment

### After making changes:

```bash
# Make changes to your code
git add .
git commit -m "your changes"
git push

# Vercel automatically redeploys!
```

### Manual Redeploy:
1. Vercel Dashboard → Your Project
2. Deployments → Latest
3. Three dots (...) → Redeploy

---

## Cost

**Vercel Free Tier Includes:**
- ✅ Unlimited personal projects
- ✅ 100 GB bandwidth/month
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ Automatic deployments
- ✅ Environment variables
- ✅ Custom domains

**Perfect for this translation tool!** Your app will run completely free.

---

## Performance

After deployment, your app will have:
- ⚡ **Edge Network**: Served from nearest location
- 🔒 **HTTPS**: Automatic SSL certificate
- 🚀 **Fast Loading**: Global CDN
- 📊 **99.99% Uptime**: Vercel's infrastructure

---

## Vercel Configuration Explained

### vercel.json:
```json
{
  "version": 2,  // Vercel platform version

  "builds": [
    {
      "src": "src/server.js",  // Entry point
      "use": "@vercel/node"    // Node.js builder
    }
  ],

  "routes": [
    {
      "src": "/(.*)",          // Match all routes
      "dest": "src/server.js"  // Send to server
    }
  ],

  "env": {
    "USE_MYMEMORY": "true"     // Default environment
  }
}
```

---

## Quick Checklist

Before deploying:
- [ ] Code pushed to GitHub
- [ ] `vercel.json` in root directory
- [ ] `package.json` has correct start script
- [ ] `.env` is in `.gitignore`
- [ ] All imports use correct paths
- [ ] Tested locally (`npm start`)

After deploying:
- [ ] App loads on Vercel URL
- [ ] Translation works
- [ ] All features functional
- [ ] No console errors
- [ ] Mobile responsive

---

## Support

**If deployment fails:**
1. Check Vercel build logs
2. Verify all files are in GitHub
3. Check `vercel.json` configuration
4. Ensure environment variables are set
5. Review this guide

**Common fixes:**
- Redeploy from Vercel dashboard
- Clear Vercel build cache
- Check Node.js version compatibility
- Verify file paths in imports

---

## Next Steps After Deployment

1. ✅ Share your live URL!
2. ✅ Add custom domain (optional)
3. ✅ Monitor usage in Vercel dashboard
4. ✅ Set up automatic deployments (already done!)
5. ✅ Add project to your portfolio

---

## Your Live App

After deployment, you'll have:
- 🌐 **Live URL**: `https://your-app.vercel.app`
- 🔒 **HTTPS**: Automatic & free
- 🚀 **Fast**: Global CDN
- 📱 **Mobile**: Responsive design
- 💰 **Cost**: $0/month

**Share it with the world!** 🌍

---

## Example Live URLs

Your app could be at:
- `https://language-translation-tool.vercel.app`
- `https://translate-by-rania.vercel.app`
- `https://your-custom-domain.com`

---

**Deployment guide created by Rania Sultana** ✨

*Translate anywhere, anytime!* 🌍
