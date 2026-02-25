# g0village-8bit — Claude Instructions

## Project Overview

g0v 新手村計畫 (g0v Newbie Village): An 8-bit RPG browser game built for the g0v civic tech community. Based on Crafty.js, styled after Persona 4 8-bit RPG.

- Demo: http://g0v.github.io/g0village-8bit/
- License: http://g0v.mit-license.org/

## Tech Stack

- **Game Engine**: [Crafty.js](https://github.com/louisstow/Crafty) (`js/lib/crafty.js`)
- **Utilities**: jQuery 1.10.2, lodash, colorbox, glfx
- **Firebase**: Disabled (see commit `db2d511`)
- **Audio**: MP3 + OGG dual format
- **No build system** — plain HTML/JS, served statically

## Branch Strategy

- `gh-pages` — production/deploy branch (GitHub Pages)
- `refactor-mobile-game` — current development branch

## Project Structure

```
index.html          # Main entry point
js/                 # Game logic
  lib/              # Third-party libraries (Crafty, jQuery, lodash, etc.)
  aggroable.js      # Enemy aggro behavior
  assetManager.js   # Asset loading
  battleEngine.js   # Battle system
  character.js      # Character base class
  interactable.js   # NPC interaction
  movable.js        # Movement component
  novelInterface.js # Dialogue/story UI
  npc.js            # NPC component
  player.js         # Player character
  playerControl.js  # Input handling
assets/             # Sprites, images, audio
data/               # Game data (JSON)
npcs/               # NPC definitions
scenes/             # Scene/map definitions
```

## Development Notes

- No package manager or bundler — edit files directly
- No test framework configured
- PRs should target `gh-pages` branch
- Firebase is disabled; do not re-enable without discussion
