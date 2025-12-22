# API Directory

This directory contains Vercel serverless functions.

## translate.js

Vercel-compatible serverless function for handling translation requests.

**Endpoint**: `POST /api/translate`

**Request Body**:
```json
{
  "text": "Hello world",
  "sourceLanguage": "en",
  "targetLanguage": "es"
}
```

**Response**:
```json
{
  "success": true,
  "translatedText": "Hola mundo",
  "detectedSourceLanguage": "en"
}
```

## Why This Directory?

Vercel automatically converts files in `api/` directory into serverless functions. Each file becomes an API endpoint.

**File**: `api/translate.js`
**Becomes**: `https://your-app.vercel.app/api/translate`

This is different from the `src/server.js` which is used for local development.

## Local vs Vercel

**Local Development:**
- Uses `src/server.js` (traditional Node.js server)
- Runs continuously on port 3000
- Start with: `npm start`

**Vercel Deployment:**
- Uses `api/translate.js` (serverless function)
- Runs on-demand when called
- No server needed, auto-scales

Both use the same translation logic, just packaged differently!
