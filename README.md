# Phantom Blade Zero — Player Assistant

An unofficial English-language, evidence-aware troubleshooting companion for Phantom Blade Zero.

## Goal
Help players solve real problems using clear steps, traceable sources, and honest evidence labels.

## Features
- Five categories: endings, quests, missables, combat, and PC performance
- Symptom-based guidance and source links
- Explicit labels when a game-specific fix has not been independently verified
- Local-only “Solved / Still stuck” feedback

## Run
Requires Node.js 18+; no external dependencies.

```bash
npm run build
npm test
npm start
```

Open http://localhost:4173

## Deployment
Netlify: build command `npm run build`; publish directory `dist`.

## Quality limitations
The production build and static checks are automated. Game-specific fixes are not independently play-tested; the site does not guarantee outcomes. The UI and copy must be reviewed before representing it as fully verified guidance.

This is a fan-made, unofficial resource, not affiliated with the game publisher.