# Quick Start Guide

Get your translation tool running in under 2 minutes!

## Local Development

```bash
# 1. Navigate to project folder
cd language-translation-tool

# 2. Install dependencies
npm install

# 3. Start the server
npm start

# 4. Open in browser
# Visit: http://localhost:3000
```

Done! Your translation tool is now running locally.

---

## Using the App

### Translate Text:

1. **Enter text** in the left input box
2. **Select target language** (e.g., Spanish)
3. **Click "Translate"** button
4. **View translation** in the right box

### Additional Features:

- **🔊 Speak:** Click to hear the translation read aloud
- **📋 Copy:** Click to copy translation to clipboard
- **🗑️ Clear:** Click to reset and start over
- **⇄ Swap:** Click to swap source and target languages

---

## Deploy to Production (Free)

### Option 1: Vercel (Easiest)

1. Push code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

2. Go to [vercel.com](https://vercel.com)

3. Click "Import Project" → Select your repo → Deploy

4. Your app is live! 🎉

### Option 2: Netlify

Same as Vercel, but use [netlify.com](https://netlify.com)

---

## Configuration

The app works out of the box with **MyMemory API** (free, no API key needed).

To change settings, edit `.env`:

```bash
# Free translation (default)
USE_MYMEMORY=true
```

---

## Troubleshooting

**Problem:** Port 3000 already in use

**Solution:**
```bash
lsof -i :3000
kill -9 <PID>
npm start
```

**Problem:** Translation fails

**Solution:**
- Check internet connection
- Verify `.env` has `USE_MYMEMORY=true`
- Restart server

---

## What's Next?

- Customize the UI colors in `styles.css`
- Add more languages in `index.html`
- Deploy to production (see [DEPLOYMENT.md](./DEPLOYMENT.md))
- Share with friends!

---

## Need Help?

- Read [README.md](./README.md) for complete documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment options
- Review phase documentation files for implementation details

---

**Enjoy your translation tool! 🌍**
