# 🔧 Vercel Deployment Troubleshooting

**Issue**: Translation works locally but fails on Vercel with "Failed to translate. Please try again."

**Created by Rania Sultana**

---

## ✅ Solution Applied

The issue was that Vercel uses **serverless functions**, not traditional Node.js servers.

### What Was Changed:

1. ✅ Created `api/translate.js` - Vercel serverless function
2. ✅ Updated `vercel.json` to use serverless architecture
3. ✅ Configured proper routes for static files and API

### Files Created:
- `api/translate.js` - Serverless translation endpoint
- `api/README.md` - Documentation

---

## 🚀 How to Fix Your Vercel Deployment

### Step 1: Pull Latest Changes

```bash
cd "/Users/apple/Documents/Language translation tool"

# Stage new files
git add api/
git add vercel.json
git add VERCEL_TROUBLESHOOTING.md

# Commit
git commit -m "fix: Add Vercel serverless function for translation API"

# Push to GitHub
git push origin main
```

### Step 2: Redeploy on Vercel

Vercel will automatically detect the changes and redeploy.

**Or manually trigger:**
1. Go to Vercel Dashboard
2. Your project → Deployments
3. Click "Redeploy" on the latest deployment

### Step 3: Check Function Logs

After redeployment:
1. Go to Vercel Dashboard
2. Your project → Deployments
3. Click on the latest deployment
4. Click "Functions" tab
5. Click on `/api/translate`
6. View logs to see if there are errors

---

## 🔍 Common Vercel Issues & Fixes

### Issue 1: "Failed to translate" Error

**Cause**: API endpoint not found or not working

**Solution**:
- Verify `api/translate.js` exists in GitHub
- Check Vercel build logs for errors
- Ensure axios is in dependencies
- Redeploy after pushing changes

### Issue 2: Module Not Found

**Error**: `Cannot find module 'axios'`

**Solution**:
1. Check `package.json` includes axios:
   ```json
   "dependencies": {
     "axios": "^1.13.2"
   }
   ```
2. Push to GitHub
3. Redeploy

### Issue 3: Environment Variables

**Error**: Translation uses wrong service

**Solution**:
1. Vercel Dashboard → Your Project → Settings
2. Environment Variables
3. Add if missing:
   - `USE_MYMEMORY` = `true`
4. Redeploy

### Issue 4: CORS Errors

**Error**: "CORS policy blocked"

**Solution**: Add CORS headers (already included in api/translate.js)

---

## 📊 Verify Deployment

### Test Checklist:

1. **Homepage loads**: ✅ Check `https://your-app.vercel.app`
2. **API responds**: Test translation
3. **No console errors**: Open DevTools → Console
4. **Network tab**: Check `/api/translate` returns 200
5. **All features work**: Speak, Copy, Clear

---

## 🔍 Debug Steps

If still not working:

### Step 1: Check Vercel Function Logs
```
Vercel Dashboard
→ Your Project
→ Deployments
→ Latest Deployment
→ Functions
→ /api/translate
→ View Logs
```

Look for:
- Request received
- Translation errors
- Module errors

### Step 2: Check Browser Console
```
F12 → Console Tab
Try translating
Look for errors
```

Common errors:
- `Failed to fetch` = API endpoint not found
- `500 Internal Server Error` = Server-side error
- `CORS error` = Cross-origin issue

### Step 3: Test API Directly

Open in browser:
```
https://your-app.vercel.app/api/translate
```

Should show: "Method not allowed" (this is correct for GET)

Test with curl:
```bash
curl -X POST https://your-app.vercel.app/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text":"hello","sourceLanguage":"en","targetLanguage":"es"}'
```

Should return: `{"success":true,"translatedText":"Hola","detectedSourceLanguage":"en"}`

---

## 🎯 Expected File Structure on Vercel

After deployment, Vercel should have:

```
/api/translate.js        → Serverless function
/public/index.html       → Static file
/public/styles.css       → Static file
/public/app.js           → Static file
/package.json           → Dependencies
/vercel.json            → Configuration
```

---

## 🚀 Quick Fix Commands

```bash
# 1. Commit and push latest changes
git add .
git commit -m "fix: Vercel serverless function configuration"
git push origin main

# 2. Vercel auto-redeploys

# 3. Test your live app
# Open: https://your-app.vercel.app
```

---

## 📞 Still Not Working?

### Check These:

1. **Vercel Build Logs**:
   - Any build errors?
   - Dependencies installed?
   - Functions created?

2. **Function Logs**:
   - Are requests reaching the function?
   - Any runtime errors?
   - Module loading issues?

3. **Browser DevTools**:
   - Network tab shows 200 or error?
   - Console shows any errors?
   - Request payload correct?

4. **File Paths**:
   - Check all files in correct directories
   - Verify imports match structure

---

## ✅ Success Indicators

Your deployment is successful when:
- ✅ Homepage loads at `https://your-app.vercel.app`
- ✅ Translation works for any text
- ✅ Function logs show "Translation request"
- ✅ No errors in browser console
- ✅ All features functional

---

## 💡 Pro Tips

1. **Check Vercel Dashboard first** - Most errors shown there
2. **Use Function Logs** - See real-time requests
3. **Test API directly** - Isolate frontend vs backend issues
4. **Incremental deployment** - Test after each change

---

**After pushing the latest changes, your Vercel deployment should work perfectly!** 🚀

Just run:
```bash
git add .
git commit -m "fix: Add Vercel serverless API endpoint"
git push origin main
```

Then test your Vercel URL again!

---

**Created by Rania Sultana** ✨
