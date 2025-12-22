#!/bin/bash

# Script to remove API keys from git history
# Created by Rania Sultana

echo "🔒 Removing API keys from Git history..."
echo ""
echo "⚠️  WARNING: This will rewrite Git history!"
echo "⚠️  This is a destructive operation."
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 1
fi

echo ""
echo "Step 1: Creating backup..."
git branch backup-before-cleanup

echo ""
echo "Step 2: Removing sensitive data from history..."

# Use git filter-repo to remove the API key pattern
# Replace the actual API key with placeholder
git filter-branch --force --tree-filter '
  if [ -f "docs/SECURITY.md" ]; then
    sed -i.bak "s/AIzaSyCyFSnJ_nXI4TeQZqFDmZiWN7PMkweOZWc/your_actual_api_key_here/g" docs/SECURITY.md
    rm -f docs/SECURITY.md.bak
  fi
  if [ -f "SECURITY.md" ]; then
    sed -i.bak "s/AIzaSyCyFSnJ_nXI4TeQZqFDmZiWN7PMkweOZWc/your_actual_api_key_here/g" SECURITY.md
    rm -f SECURITY.md.bak
  fi
' --prune-empty --tag-name-filter cat -- --all

echo ""
echo "Step 3: Cleaning up..."
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo ""
echo "✅ Git history cleaned!"
echo ""
echo "Step 4: Force push to GitHub (this overwrites remote history)..."
echo "Run this command when ready:"
echo ""
echo "  git push origin main --force"
echo ""
echo "⚠️  Make sure all team members know you're rewriting history!"
echo "⚠️  They'll need to re-clone the repository after you force push."
echo ""
