# 📁 Project Structure

## Overview

This document explains the organization of the Language Translation Tool project.

---

## Directory Tree

```
language-translation-tool/
│
├── 📁 public/                # Frontend files (served to browser)
│   ├── index.html           # Main HTML page
│   ├── styles.css           # Styling and animations
│   ├── app.js               # Frontend JavaScript
│   └── README.md            # Public directory documentation
│
├── 📁 src/                   # Backend/Server files
│   ├── server.js            # Node.js HTTP server
│   ├── translate.js         # Google Translate integration
│   ├── translate-mock.js    # Mock translation (testing)
│   ├── translate-mymemory.js # MyMemory API (active)
│   ├── translate-libre.js   # LibreTranslate (backup)
│   └── README.md            # Source directory documentation
│
├── 📁 docs/                  # Documentation files
│   ├── PHASE3_COMPLETE.md   # Phase 3 implementation docs
│   ├── PHASE4_COMPLETE.md   # Phase 4 implementation docs
│   ├── PHASE5_COMPLETE.md   # Phase 5 implementation docs
│   ├── DEPLOYMENT.md        # Deployment guide
│   ├── SECURITY.md          # Security best practices
│   ├── GITHUB_SETUP.md      # GitHub setup instructions
│   └── QUICKSTART.md        # Quick start guide
│
├── 📁 config/                # Configuration files
│   ├── vercel.json          # Vercel deployment config
│   └── netlify.toml         # Netlify deployment config
│
├── 📁 node_modules/          # Dependencies (gitignored)
│
├── 📄 .env                   # Environment variables (gitignored)
├── 📄 .env.example           # Environment template
├── 📄 .gitignore             # Git ignore rules
├── 📄 package.json           # Project metadata & dependencies
├── 📄 package-lock.json      # Dependency lock file
├── 📄 README.md              # Main project documentation
└── 📄 PROJECT_STRUCTURE.md   # This file
```

---

## Directory Explanations

### 📁 public/
**Purpose**: Contains all files that are served directly to the user's browser.

**Files**:
- `index.html` - The main webpage structure
- `styles.css` - All styling, animations, and visual design
- `app.js` - Client-side JavaScript for user interactions

**Why separated**: Keeps frontend code isolated and makes it easy to serve static files.

---

### 📁 src/
**Purpose**: Contains all server-side code and translation logic.

**Files**:
- `server.js` - Main HTTP server that handles requests
- `translate-*.js` - Different translation service implementations

**Why separated**: Keeps backend logic separate from frontend, makes code more maintainable.

---

### 📁 docs/
**Purpose**: Contains all project documentation.

**Contents**:
- Implementation phase documentation
- Deployment guides
- Security guides
- Quick start guides

**Why separated**: Keeps documentation organized and easy to find.

---

### 📁 config/
**Purpose**: Contains deployment and configuration files.

**Contents**:
- Platform-specific deployment configs (Vercel, Netlify)
- Build configurations

**Why separated**: Makes it easy to find and update deployment settings.

---

## File Flow

### User Request Flow:
```
User's Browser
    ↓
http://localhost:3000
    ↓
src/server.js (receives request)
    ↓
Serves files from public/
    ↓
Browser loads:
  - public/index.html
  - public/styles.css
  - public/app.js
    ↓
User sees the application
```

### Translation Request Flow:
```
User clicks "Translate"
    ↓
public/app.js (sends POST request)
    ↓
POST /api/translate
    ↓
src/server.js (receives API request)
    ↓
Checks environment variables
    ↓
Calls appropriate translation service:
  - src/translate-mymemory.js (if USE_MYMEMORY=true)
  - src/translate.js (if using Google)
  - src/translate-mock.js (if USE_MOCK=true)
    ↓
Returns translation result
    ↓
public/app.js (receives result)
    ↓
Updates UI with translation
```

---

## Key Files Explained

### Root Level Files:

**package.json**
- Project metadata
- Dependencies list
- Start scripts
- Author information

**package-lock.json**
- Exact versions of all dependencies
- Ensures consistent installs

**.env**
- Environment variables (API keys)
- **NEVER committed to git**
- Contains sensitive information

**.env.example**
- Template for .env
- Safe to commit to git
- Shows what variables are needed

**.gitignore**
- Lists files to not commit to git
- Protects .env and node_modules

---

## Why This Structure?

### ✅ Advantages:

1. **Clear Separation**: Frontend and backend are clearly separated
2. **Easy Navigation**: Find files quickly based on their purpose
3. **Scalable**: Easy to add new features in appropriate directories
4. **Professional**: Follows industry best practices
5. **Deployment Ready**: Works with Vercel, Netlify, etc.
6. **Maintainable**: Easy for others to understand and contribute

### 📚 Follows Best Practices:

- ✅ Separate public/private code
- ✅ Keep documentation organized
- ✅ Configuration files in one place
- ✅ Clear README files in each directory
- ✅ Logical file naming

---

## Adding New Features

### Adding a new translation service:
1. Create file in `src/translate-newservice.js`
2. Follow the pattern of existing files
3. Update `src/server.js` to import and use it
4. Add environment variable to `.env.example`
5. Document in `src/README.md`

### Adding new frontend features:
1. Update HTML in `public/index.html`
2. Add styles in `public/styles.css`
3. Add logic in `public/app.js`
4. Document in `public/README.md`

### Adding documentation:
1. Create new `.md` file in `docs/`
2. Link from main `README.md`
3. Keep it clear and concise

---

## File Sizes (Approximate)

```
public/
  index.html          ~4 KB
  styles.css          ~9 KB
  app.js              ~8 KB

src/
  server.js           ~3 KB
  translate-*.js      ~2-3 KB each

Total project size: ~50 KB (without node_modules)
With node_modules: ~30 MB
```

Very lightweight and fast!

---

## Git Workflow

### Files Tracked by Git:
✅ All source code
✅ Documentation
✅ Configuration files
✅ .gitignore
✅ .env.example
✅ README files

### Files NOT Tracked:
❌ .env (sensitive data)
❌ node_modules/ (too large)
❌ .DS_Store (OS files)
❌ *.log (log files)

---

## Deployment Structure

### Vercel/Netlify Deployment:
```
Repository (GitHub)
    ↓
Deployment Platform reads:
  - config/vercel.json or netlify.toml
  - Runs: npm install
  - Runs: npm start
  - Serves: public/ files
  - Runs: src/server.js
```

---

## Summary

The project is organized into logical directories:
- **public/** = What users see
- **src/** = Backend logic
- **docs/** = Documentation
- **config/** = Deployment settings

This structure makes the project:
- Easy to understand
- Easy to maintain
- Easy to deploy
- Easy to collaborate on

**Created by Rania Sultana** 🌍
