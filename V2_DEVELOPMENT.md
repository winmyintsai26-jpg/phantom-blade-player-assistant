# Phantom Blade Zero Player Assistant — V2

This branch is the isolated development track for the next version. The existing main branch and live sites are not changed by V2 work.

## Product principles
- Help players finish a task, not merely read about it.
- Every gameplay claim must be traceable to a source and checked against the current game version.
- No invented locations, NPCs, screenshots, or completion criteria.
- Screenshots must have verified provenance and permission before being used.
- Accessible, responsive, fast, and readable on mobile.
- Preserve explicit uncertainty and allow corrections.

## Release gates
- Complete content audit and sources for each published guide.
- Verify navigation, search, progress persistence, and stuck-state recovery.
- Test desktop and mobile views, keyboard navigation, broken links and images.
- Check generated metadata, sitemap and canonical URLs against the V2 deployment address.
- No production cutover until explicit approval.

## Deployment separation
- Existing Netlify and Cloudflare URLs stay untouched.
- Create a new Cloudflare Worker/project for V2 after a working build is verified.
- Do not change Search Console or AdSense until migration is approved.

## Initial build plan
1. Establish V2 design tokens, navigation, homepage and guide template.
2. Build an evidence-first guide content schema with status and verification metadata.
3. Implement an actionable step flow, progress checklist, and troubleshooting.
4. Add authorized, locally hosted, guide-relevant images.
5. Run automated checks and manually inspect the V2 preview before promoting any change.
