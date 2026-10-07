---
name: SafeNest Digital Vault
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#bec8d2'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#88929b'
  outline-variant: '#3e4850'
  surface-tint: '#89ceff'
  primary: '#89ceff'
  on-primary: '#00344d'
  primary-container: '#0ea5e9'
  on-primary-container: '#003751'
  inverse-primary: '#006591'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#c1c6d9'
  on-tertiary: '#2a303f'
  tertiary-container: '#959bad'
  on-tertiary-container: '#2d3342'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c9e6ff'
  primary-fixed-dim: '#89ceff'
  on-primary-fixed: '#001e2f'
  on-primary-fixed-variant: '#004c6e'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#dde2f6'
  tertiary-fixed-dim: '#c1c6d9'
  on-tertiary-fixed: '#151b29'
  on-tertiary-fixed-variant: '#414756'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 40px
---

## Brand & Style

The design system is anchored in the concept of "Digital Sanctuary." It targets high-net-worth individuals and security-conscious users who require a premium, private environment for their most sensitive data. The emotional response is one of absolute calm, fortified protection, and effortless sophistication.

The visual style blends **Minimalism** with **Glassmorphism**. By utilizing deep, layered backgrounds and translucent foreground elements, the interface mimics the physical sensation of looking through armored glass into a secure vault. The aesthetic is clean and futuristic, avoiding unnecessary clutter to ensure that security-critical information remains the sole focus.

Key stylistic markers:
- High-quality whitespace to evoke a sense of "breathing room" within a secure space.
- Subdued background layers that provide a sense of infinite depth.
- Subtle kinetic feedback (glows and transitions) to signal system integrity and active protection.

## Colors

The color palette is strictly dark-mode to reduce eye strain and reinforce the "vault" metaphor. 

- **Primary & Secondary:** Teal and Bright Blue are used sparingly for actionable elements, status indicators, and security confirmations. These "electric" accents contrast sharply against the dark base to guide the user’s eye.
- **Backgrounds:** A hierarchy of Deep Navy (#0B1120) for the base and Dark Charcoal (#121826) for elevated surfaces.
- **Accents:** Subtle glowing effects should use the primary teal with a high-diffusion blur (20-40px) at low opacity (10-15%) to indicate active states or premium features.
- **Functional Colors:** Success states utilize the primary teal; warnings utilize a muted amber; errors utilize a high-contrast coral to ensure immediate visibility without breaking the sophisticated aesthetic.

## Typography

This design system utilizes **Inter** for its systematic, utilitarian clarity, ensuring that complex data remains highly legible. **Geist** is introduced for labels and technical data to provide a precise, developer-grade feel that reinforces the app's technical sophistication.

- **Headlines:** Use tight letter-spacing and bold weights to convey strength.
- **Body:** Standardized on 16px for optimal readability against dark backgrounds. Use light-gray (#E2E8F0) for primary text and medium-gray (#94A3B8) for secondary descriptions.
- **Labels:** Always use uppercase for `label-sm` to denote categories, metadata, or table headers.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** approach for desktop to maintain a sense of controlled, "contained" security, transitioning to a fluid model for mobile devices.

- **Rhythm:** A strict 8px linear scale governs all padding and margins. 
- **Grid:** 12-column grid for desktop (max-width 1200px), 8-column for tablet, and 4-column for mobile.
- **Safe Zones:** Generous internal padding (minimum 24px) within cards and containers prevents the UI from feeling cramped, maintaining the premium minimalist aesthetic.
- **Reflow:** On mobile, multi-column data tables should collapse into "Value Cards" to preserve legibility and touch-targets.

## Elevation & Depth

Depth is communicated through **Glassmorphism** and **Tonal Layers** rather than heavy shadows.

- **The Base:** The bottom-most layer is the Deep Navy (#0B1120).
- **Surfaces:** Floating cards use a semi-transparent Dark Charcoal background (80% opacity) with a `backdrop-filter: blur(12px)`.
- **Borders:** Surfaces are defined by a 1px "Inner Glow" border. This is a subtle linear gradient border (top-left to bottom-right) using White at 10% opacity fading to White at 2% opacity.
- **Shadows:** Use a single, highly diffused "Ambient Shadow": `0 20px 40px rgba(0, 0, 0, 0.4)`. No harsh shadows are permitted.

## Shapes

The shape language is "Protective Softness." Elements are rounded enough to feel modern and accessible, but not so circular as to appear playful.

- **Standard Radius:** 0.5rem (8px) for input fields and small buttons.
- **Container Radius:** 1rem (16px) for cards and primary vault modules.
- **Interactive Radius:** 1.5rem (24px) for prominent call-to-action buttons, creating a distinct "pill" shape that stands out from the rectangular grid.

## Components

- **Buttons:** Primary buttons use a solid Teal-to-Blue linear gradient. Secondary buttons use the "Ghost" style with the 1px inner-glow border and no fill.
- **Cards:** Must feature the 12px backdrop blur and the subtle gradient border. Header sections within cards should be separated by a hairline divider (1px, 5% white).
- **Input Fields:** Darker than the card surface (#080C14) with a subtle inset shadow to appear "recessed" into the vault surface. Focus states trigger a 1px Teal outer glow.
- **Chips/Badges:** Small, high-radius (pill) shapes. For "Encrypted" or "Secure" statuses, use a soft teal glow behind the text.
- **Biometric Prompt:** A custom component featuring a large, centered icon with a rhythmic pulse animation (soft teal glow) to signify active scanning.
- **Vault List:** Lists should have generous vertical padding (16px) per item, separated by low-contrast dividers to maintain a clean, organized hierarchy.