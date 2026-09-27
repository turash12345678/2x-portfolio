# Automated Context Synchronization Script for 2X Portfolio
$ErrorActionPreference = "Stop"

Write-Host "🔍 Checking git status..." -ForegroundColor Cyan
git status --short

Write-Host "🔨 Verifying build..." -ForegroundColor Cyan
npm run build

Write-Host "📦 Staging changes..." -ForegroundColor Cyan
git add -A

Write-Host "💾 Committing changes..." -ForegroundColor Cyan
git commit -m "docs: sync read-agent.md living state and recent progress [skip ci]"

Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

Write-Host "✅ Sync complete! Your project memory and code are live on GitHub." -ForegroundColor Green
