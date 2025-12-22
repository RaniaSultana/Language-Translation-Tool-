# Source Directory

This directory contains all backend/server-side code that powers the translation functionality.

## Files

### server.js
Main Node.js HTTP server that handles requests and serves files.

**Responsibilities:**
- Serves static files from `public/` directory
- Handles `/api/translate` POST endpoint
- Routes requests appropriately
- Manages environment variables
- Logs requests for debugging

### translate-mymemory.js
**Currently Active** - MyMemory Translation API integration.

**Features:**
- Free translation API (no API key required)
- Supports all 13 languages
- Simple REST API calls
- Error handling

### translate.js
Google Translate API integration (requires API key).

**Features:**
- Professional translation quality
- Requires Google Cloud API key
- Supports language auto-detection
- Detailed error messages

### translate-mock.js
Mock translation service for testing and development.

**Features:**
- Works offline
- Instant responses
- Limited vocabulary (common phrases)
- No API calls required
- Great for development/testing

### translate-libre.js
LibreTranslate API integration (backup option).

**Features:**
- Open-source translation
- Can be self-hosted
- Requires API key from libretranslate.com
- Alternative to Google/MyMemory

## Translation Flow

```
Frontend (app.js)
    ↓
POST /api/translate
    ↓
Server (server.js)
    ↓
Check environment variables
    ↓
USE_MYMEMORY=true → translate-mymemory.js
USE_MOCK=true → translate-mock.js
Otherwise → translate.js (Google)
    ↓
Return translation result
    ↓
Frontend displays result
```

## Switching Translation Services

Edit `.env` file in project root:

**MyMemory (Current/Recommended):**
```bash
USE_MYMEMORY=true
USE_MOCK=false
```

**Google Translate:**
```bash
USE_MYMEMORY=false
USE_MOCK=false
GOOGLE_API_KEY=your_key_here
```

**Mock/Demo:**
```bash
USE_MYMEMORY=false
USE_MOCK=true
```

## Adding New Translation Services

1. Create new file: `translate-newservice.js`
2. Export function: `translateTextNewService(text, targetLang, sourceLang)`
3. Return format:
   ```javascript
   {
     success: true,
     translatedText: "translated text",
     detectedSourceLanguage: "en"
   }
   ```
4. Import in `server.js`
5. Add environment variable check
6. Update `.env.example`

## Error Handling

All translation functions should return:

**Success:**
```javascript
{
  success: true,
  translatedText: "result",
  detectedSourceLanguage: "en"
}
```

**Error:**
```javascript
{
  success: false,
  error: "error message"
}
```

This ensures consistent error handling across all services.
