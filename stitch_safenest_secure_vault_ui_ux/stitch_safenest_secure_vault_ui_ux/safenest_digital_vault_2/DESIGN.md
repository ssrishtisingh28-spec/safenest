---
name: SafeNest Digital Vault
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#504441'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#827470'
  outline-variant: '#d4c3be'
  surface-tint: '#77574d'
  primary: '#442a22'
  on-primary: '#ffffff'
  primary-container: '#5d4037'
  on-primary-container: '#d4ada1'
  inverse-primary: '#e7bdb1'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#3f2d26'
  on-tertiary: '#ffffff'
  tertiary-container: '#57433b'
  on-tertiary-container: '#cbb0a6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#e7bdb1'
  on-primary-fixed: '#2c160e'
  on-primary-fixed-variant: '#5d4037'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#fadcd2'
  tertiary-fixed-dim: '#ddc1b7'
  on-tertiary-fixed: '#271812'
  on-tertiary-fixed-variant: '#56423b'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
  surface-cream: '#F9F7F2'
  sand-light: '#EFEBE9'
  mocha-dark: '#3E2723'
  copper-accent: '#B87333'
  charcoal-text: '#1A1A1A'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
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
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
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
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 40px
  container-max: 1200px
---

## Brand & Style
The design system transitions the "Digital Sanctuary" concept into a high-end, light-filled environment reminiscent of a private wealth office or a modern gallery. It targets security-conscious individuals who value discretion, warmth, and organic sophistication. The emotional response is one of "Secure Transparency"—the feeling of safety that comes from clarity and premium craftsmanship.

The visual style is a blend of **Minimalism** and **Refined Glassmorphism**. It utilizes a warm, off-white foundation to feel approachable and human, while maintaining technical rigor through precise typography and layered depth. 

**Key Stylistic Markers:**
- **Organic Sophicstication:** Use of warm neutrals (sand, tan, mocha) instead of cold tech-blues.
- **Luminous Depth:** Adapting glassmorphism for light mode using high-transparency whites and soft, multi-layered shadows.
- **Tactile Security:** Elements should feel like physical objects—polished stone, matte metal, and thick glass.

## Colors
The palette shifts from a dark "vault" to a "luminous sanctuary." 

- **Primary & Secondary:** A sophisticated pairing of Deep Mocha (#5D4037) for grounding elements and Soft Gold (#D4AF37) for premium highlights and successful security states.
- **Backgrounds:** The foundation is a warm, off-white Cream (#F9F7F2). Surfaces are tiered using slight shifts in warmth rather than grey-scale value.
- **Accents:** Copper and Sand tones are used for interactive states and secondary navigation. 
- **Functional Colors:** Success is signaled by the secondary gold; warnings by a muted terracotta; errors by a deep, desaturated red that maintains the premium tone without appearing aggressive.

## Typography
This design system utilizes **Manrope** for headlines to provide a more modern, rounded, and premium character than standard grotesque faces. **Inter** remains the choice for body text to ensure maximum legibility for sensitive data. **JetBrains Mono** is used for technical labels and encryption keys to evoke a sense of digital precision.

- **Contrast:** Text should never be pure black. Use **Charcoal Text (#1A1A1A)** for primary content and **Mocha Dark (#3E2723)** for secondary descriptions.
- **Scaling:** Headlines utilize tight tracking to appear like "engraved" headers, while labels utilize expanded tracking to ensure clarity at small sizes.

## Layout & Spacing
The layout uses a **Fixed Grid** model to convey a sense of structured, curated space. 

- **Grid:** A 12-column grid on desktop with a 1200px max-width ensures the UI feels like a centered "document" or "vault tray." 
- **Rhythm:** The 8px spacing system is applied rigorously to create a clean, predictable hierarchy.
- **Negative Space:** Use generous padding within containers (minimum 32px on desktop) to evoke a premium, unhurried user experience.
- **Mobile Reflow:** Elements should stack vertically, maintaining the same 20px side margins, with cards expanding to full-width to maximize the touch area for biometric interactions.

## Elevation & Depth
Depth in the light theme is achieved through "Soft Glass" and "Organic Shadows." 

- **The Surface:** The base layer is a solid cream. Above this, floating surfaces use 90% opacity white with a `backdrop-filter: blur(20px)`.
- **Soft Shadows:** Instead of glows, use multi-layered ambient shadows with a hint of the primary mocha color: `0 4px 6px -1px rgba(93, 64, 55, 0.05), 0 10px 15px -3px rgba(93, 64, 55, 0.1)`.
- **Light Borders:** Define edges with a 1px solid border in **Sand Light (#EFEBE9)**. For elevated glass elements, use a white 1.5px border at 50% opacity to mimic the edge of thick glass.
- **Interaction:** Upon hover, increase the shadow spread and reduce the blur slightly to make the element feel as if it is physically lifting toward the user.

## Shapes
The shape language is "Polished Geometry." Following the `ROUND_EIGHT` philosophy, the system uses a consistent 0.5rem (8px) base radius.

- **Small Elements:** Buttons and inputs use the base 8px radius.
- **Large Containers:** Vault cards and modal windows use 1rem (16px) to appear more welcoming and substantial.
- **Interactive Pill:** Use `rounded-full` (pill shape) for high-importance actions like "Unlock" or "Add New Item" to distinguish them from the rectangular layout grid.

## Components
- **Buttons:** Primary buttons use a rich Mocha-to-Deep-Brown gradient with white text. Secondary buttons use a "Glass" style: semi-transparent white fill, sand border, and mocha text.
- **Cards:** Feature the 20px backdrop blur, a sand-colored border, and the mocha-tinted ambient shadow.
- **Input Fields:** Use a subtle "inset" look by using a slightly darker cream background (#F2EEE8) and a 1px border that darkens to mocha on focus.
- **Chips/Badges:** Use a light sand background with mocha text. For "Secure" status, use a soft gold background with white text.
- **Lists:** Vault items should be separated by high-contrast white space rather than lines where possible. If dividers are needed, use a 1px Sand Light (#EFEBE9) hairline.
- **Biometric Hub:** A centered, circular glass element with a soft gold "breathing" outer shadow to indicate the scanner is ready.