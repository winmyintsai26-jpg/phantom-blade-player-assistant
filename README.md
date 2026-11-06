# Phantom Blade Zero Player Assistant

An unofficial English-language game guide with **actual on-page walkthroughs**, searchable guide cards, local progress checklists, verification steps, source attribution and stuck-player branches.

## Product goal
Players should be able to follow a guide on this site and make progress without being redirected away for the basic instructions.

## Included
- True ending: multi-step requirements and source disagreement notice
- Missable quests: region-specific checkpoints
- Bloodline Awakening: five Long Pillar checklist
- Search and category navigation
- Step-by-step instructions with in-game verification criteria
- Browser-local progress and usefulness feedback

## Build and test
Requires Node.js 18+, no external packages.

```sh
npm run build
npm test
npm start
```

Open http://localhost:4173.

## Netlify
Build command: `npm run build`. Publish directory: `dist`. Import the GitHub repository into Netlify for continuous deployment.

## Editorial policy
Every game-specific guide links its source(s). Some guides disagree about exact ending requirements or points of no return; these uncertainties are visible to readers. We do not claim independent in-game testing. Check game version and in-game journal before irreversible decisions. This is not affiliated with the game publisher.

## Feedback limitation
Feedback and progress are stored in the player's own browser only. There is no remote analytics or reporting service yet.
