# Security Guidelines - Akwaba Project

## Overview

This document outlines the security measures implemented in the Akwaba project to protect sensitive data and API keys.

## Completed Security Actions

### 1. ✅ Algolia Code Removal
- **Status**: No Algolia code found in the codebase
- **Verification**: Searched entire project - no Algolia references exist

### 2. ✅ Markdown Files Protection
- **Action**: All `.md` files are now ignored by git
- **Exception**: Node modules markdown files are still tracked (they're part of dependencies)
- **Files Removed from GitHub**:
  - `README.md`
  - `cities/korhogo/README.md`
- **Template Created**: `README.example.md` (safe to commit)

### 3. ✅ Configuration Files with API Keys
- **Files Removed from Tracking**:
  - `cities/korhogo/public/js/config.js` (contained Firebase config)
  
- **Template Created**:
  - `cities/korhogo/public/js/config.example.js` (safe template without real keys)

- **Now Ignored**:
  - `**/config.js`
  - `**/firebase-config.js`
  - `**/*-config.js` (except in node_modules)

### 4. ✅ Environment Files
- **Protected**: All `.env*` files are ignored
- **Exception**: `.env.example` can be committed (template only)

### 5. ✅ Algolia-Related Files
- **Protected**:
  - `**/algolia-config.js`
  - `**/.algolia/`
  - `**/algolia.json`

## Updated .gitignore

The following patterns have been added to `.gitignore`:

```gitignore
# Markdown files (documentation)
*.md
!node_modules/**/*.md

# Configuration files with API keys
**/config.js
**/firebase-config.js
**/*-config.js
!node_modules/**/*-config.js

# Algolia configuration and keys
**/algolia-config.js
**/.algolia/
**/algolia.json

# Environment files with keys
.env*
!.env.example
```

## Setup Instructions for Developers

### First Time Setup

1. **Copy Configuration Template**:
   ```bash
   cp cities/korhogo/public/js/config.example.js cities/korhogo/public/js/config.js
   ```

2. **Add Your Firebase Configuration**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings > General
   - Copy your Firebase configuration
   - Replace the placeholder values in `config.js`

3. **Never Commit config.js**:
   - The file is already in `.gitignore`
   - Git will ignore it automatically
   - If you accidentally stage it, git will warn you

### Creating Documentation

1. **Copy README Template**:
   ```bash
   cp README.example.md README.md
   ```

2. **Edit for Your Needs**:
   - Add project-specific information
   - Update contact details
   - Document any custom setup steps

3. **Keep It Local**:
   - `README.md` won't be tracked by git
   - Each developer can have their own local version

## Security Best Practices

### ✅ DO:
- Use template files (`.example` suffix) for sharing configuration structure
- Keep API keys in local config files that are gitignored
- Use environment variables for sensitive data in production
- Regularly audit the repository for accidentally committed secrets
- Use Firebase Security Rules to protect your database

### ❌ DON'T:
- Commit files with real API keys
- Share configuration files with credentials
- Hardcode sensitive data in source code
- Disable `.gitignore` rules for convenience
- Commit `.env` files with real values

## Emergency: If Keys Are Accidentally Committed

If you accidentally commit sensitive keys:

1. **Immediately Rotate the Keys**:
   - Go to Firebase Console
   - Regenerate affected API keys
   - Update your local config

2. **Remove from Git History**:
   ```bash
   # Remove file from git history
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch path/to/sensitive/file" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push (WARNING: This rewrites history)
   git push origin --force --all
   ```

3. **Notify Team**:
   - Inform all team members
   - Ensure everyone updates their local configs

## Verification Checklist

- [x] No Algolia code in codebase
- [x] All `.md` files ignored (except node_modules)
- [x] Config files with keys removed from tracking
- [x] Template files created for configuration
- [x] `.gitignore` updated with security patterns
- [x] Changes committed and pushed to GitHub
- [x] Documentation created for team

## Monitoring

Regularly check for:
- Accidentally committed secrets using tools like `git-secrets`
- Outdated dependencies with known vulnerabilities
- Proper Firebase Security Rules configuration
- Access logs for unusual activity

## Contact

For security concerns, contact:
- Project Lead: The Day Info
- Technical Partner: GDG Cloud Abidjan

---

**Last Updated**: February 3, 2026
**Status**: ✅ All security measures implemented
