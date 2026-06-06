# Design Brief — MyBodyWeight Premium Fitness Card Game

## Direction

Premium minimalist fitness card game combining playing card aesthetics with modern mobile fitness UX. Dark premium calisthenics aesthetic with vibrant cyan accents, beige workout cards, and refined typography. Tier-based visual hierarchy with gold (Subscriber), teal (Registered), and gray (Guest) badges. Ace/King modifiers use red-to-gold and blue-to-silver gradient overlays for satisfying rep-multiplier feedback.

## Tone

Brutalist luxury: Deep charcoal base with decisive high-contrast text, vibrant cyan energy bursts, and refined surfaces. Inspires motivation through professional sports UI combined with premium playing card aesthetics and celebratory modifier reveals.

## Differentiation

Card game mechanics meet fitness tracking—suits as exercise categories, premium card design with beige backgrounds and black text panels, tier badges signal access level, full-screen gradient overlays celebrate Ace/King modifiers, haptic feedback on Joker draws, smooth 3D card flip animations, and curated workout card imagery.

## Color Palette

| Token | OKLCH | Purpose |
|-------|-------|----------|
| background | 0.12 0.008 260 | Deep charcoal—primary dark mode base |
| foreground | 0.92 0.01 260 | Near-white text, maximum contrast |
| card | 0.16 0.01 260 | Slightly elevated dark surfaces |
| card-beige | 0.93 0.035 70 | Workout card background (premium sand) |
| card-black | 0.08 0.005 260 | Workout card text panel (true black) |
| primary | 0.68 0.25 180 | Vibrant cyan—CTAs, focus rings, Joker glow |
| tier-subscriber | 0.76 0.22 60 | Premium gold for Subscriber tier badge |
| tier-registered | 0.68 0.25 180 | Teal for Registered tier badge |
| tier-guest | 0.55 0.008 260 | Muted gray for Guest tier badge |
| ace-gold | 0.76 0.22 60 | Gold gradient end for Ace modifier overlay |
| ace-red | 0.55 0.22 25 | Red gradient start for Ace (REPS DOUBLED) |
| king-blue | 0.55 0.18 250 | Blue gradient start for King modifier |
| king-silver | 0.80 0.04 260 | Silver gradient end for King (REPS HALVED) |
| muted | 0.22 0.01 260 | Secondary UI, metadata text |
| destructive | 0.55 0.2 25 | Error/failure feedback |

## Typography

- Display: Space Grotesk—geometric, athletic sans-serif; 700 weight for headings, exercise names, labels
- Body: General Sans—clean, legible sans-serif; 400–600 for instructions, metadata, rep counts
- Scale: hero `text-5xl`, section `text-xl`, label `text-xs uppercase tracking-widest`, body `text-base`, card-title `text-lg font-bold`, modifier-text `text-4xl font-bold`

## Elevation & Depth

Subtle box-shadow hierarchy: `shadow-card` (8px blur) for workout cards, `shadow-elevated` (16px blur) for primary CTAs, `shadow-glow` for cyan accents on Joker reveals, `shadow-joker` for intense Joker animations. Locked decks use semi-transparent dark overlay (65% opacity) with 2px blur for muted effect. No decorative gradients except modifier overlays (Ace/King gradient displays).

## Structural Zones

| Zone | Background | Border | Notes |
|------|------------|--------|-------|
| Header | card (0.16 0.01 260) | border-b (0.26 0.01 260) | App logo, minimal chrome, tier badge |
| Content | background (0.12 0.008 260) | — | Full-bleed dark for card focus |
| Workout Card | card-beige (0.93 0.035 70) | 1px solid muted | Premium sand background, black text panel |
| Onboarding Card | card (0.16 0.01 260) | 1px solid primary | Large touch-friendly selection buttons |
| Locked Deck | card (0.16 0.01 260) | 1px solid muted | Semi-transparent dark overlay (65%), lock icon |
| Modifier Overlay | gradient (ace/king) | none | Full-screen, z-index 50, fade-in 0.4s |
| Footer | muted (0.22 0.01 260) | border-t (0.26 0.01 260) | Stats, timer, Next Card button |

## Spacing & Rhythm

Mobile-first compact density: 1rem gaps between major sections, 0.5rem micro-spacing inside cards, 1.5rem padding inside card content areas. 100% width buttons with 3rem height, 44px minimum touch targets. Onboarding cards span full width with 1rem gap between selections. Balanced rhythm through alternating card + whitespace composition.

## Component Patterns

**Tier Badges**: Pill-shaped (rounded-full), 0.75rem text, uppercase tracking, colored borders with 30% opacity, background at 15% opacity. Subscriber=gold, Registered=teal, Guest=gray.

**Modifier Overlays**: Full-screen gradient (Ace: red→gold, King: blue→silver), centered bold 4rem text, white color with 40% dark text-shadow, `modifierFadeIn` 0.4s then `modifierScaleIn` 0.5s on overlay text.

**Locked Deck**: Semi-transparent dark overlay (65% opacity, 2px blur), lock icon centered, card still visible beneath.

**Onboarding Selection Cards**: Large, full-width premium dark cards with 1px primary border, `text-lg` centered labels, 4rem height, rounded-md, `transition-smooth` on hover with `scale-105` + `shadow-glow`.

**Buttons**: Cyan primary (`bg-primary` `text-primary-foreground`) with rounded-md (6px), 3rem height, 1rem padding, `transition-smooth` on hover; scale(1.05) + cyan glow at `shadow-glow`. Large body-weight text (1rem, 600).

## Motion

**Entrance**: `slide-up` 0.5s ease-out on page load; onboarding cards cascade 50ms stagger; deck init uses `card-shuffle` 0.8s with stagger effect.

**Modifier Reveal**: `modifierFadeIn` 0.4s on overlay, then `modifierScaleIn` 0.5s on text—celebratory scale+opacity combo for Ace/King. Haptic feedback on reveal start.

**Card Draw**: `card-flip` 0.6s rotateY(180deg), paired with haptic feedback and motion blur effect (0.4s).

**Hover**: CTA buttons `scale-105` + `shadow-glow`; onboarding cards lift shadow.

**Feedback**: `haptic-ping` on confirm actions; `pulse-accent` for attention-grabbing transitions.

## Asset Integration

**Workout Card Images**: Premium illustrated exercise demonstrations—18+ card designs covering Push Ups, Pull Ups, Rows, Dips with beige backgrounds and black text panels.

**Illustrations**: Warming up guide, instruction overlay, Ace (last exercise ×2) and King (reps ÷2) modifier cards, lock icon for locked decks.

**Logo**: MBW branding on splash screen, home screen header, and top-right of workout cards.

## Constraints

- All colors via OKLCH tokens only—no raw hex or rgb() except Canvas rendering or gradient definitions
- Cyan accent used sparingly: CTAs, focus rings, Joker highlight, progress indicators, onboarding primary border
- Modifier overlays are the ONLY full-screen gradients; no background page-level gradients
- Shapes: 0px (borders), 4px (inputs), 6px (buttons/cards), full (pill badges)
- Dark mode primary; light mode reference only
- Locked decks show semi-transparent overlay (65% opacity) without hiding card beneath
- Tier badges always visible in header/deck selection; minimal but present
- Onboarding cards must be large, touch-friendly (min 4rem height), and visually distinct from workout cards

## Signature Detail

3D card-flip animation with perspective + rotateY(180deg) on every draw—premium motion that signals the game mechanic. Ace/King modifiers trigger full-screen gradient overlays (red→gold / blue→silver) with celebratory text scale-in and haptic feedback—making rep multipliers feel rewarding and special, not just a UI label change.

## References

- Card asset path: `src/frontend/public/assets/cards/`
- Illustration path: `src/frontend/public/assets/illustrations/`
- Font path: `src/frontend/public/assets/fonts/`
- Presets: OKLCH values verified for AA+ contrast on both light and dark backgrounds
