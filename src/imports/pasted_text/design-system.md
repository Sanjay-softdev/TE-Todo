DESIGN SYSTEM — Task Assignment App (Mobile-First, Minimalist)

PALETTE
  Primary:    #FFDD00  (yellow) — CTAs, active states, accents, logo bg
  Tertiary:   #1A1A1A  (near-black) — header bg, body text, icon fills, tag pills
  Background: #FFFFFF  (white) — all screen backgrounds
  Surface:    #F5F5F5  (off-white) — input fields, card surfaces, inactive chips
  Muted text: #888888  — labels, placeholders, secondary info
  Error:      #E24B4A  — required field asterisk, validation messages only

TYPOGRAPHY
  Font: Inter (Google Fonts) — clean, system-neutral
  Weights: 400 (regular) and 500 (medium) only — never bold or heavy
  Sizes:
    App title / screen heading: 16px / 500
    Section label (uppercase): 9–10px / 500 / letter-spacing: 0.6px
    Body / input text: 13px / 400
    Small meta / captions: 10–11px / 400
    Button text: 13px / 500
  Line height: 1.6 for body, 1 for single-line UI labels

SPACING SYSTEM
  Base unit: 4px
  Padding inside screen: 16px horizontal
  Gap between form fields: 14px
  Gap between chips/small elements: 6px
  Card inner padding: 12px 14px

BORDER RADIUS
  Buttons and submit CTA: 8px
  Input fields: 6px
  Assignee chips: 4px
  Status pills / tags: 3px
  Logo / icon containers: 8px
  Avatar circle: 50%

COMPONENTS

1. STATUS BAR
   - Background: #1A1A1A
   - Text: white, 9px
   - Shows time (left) and signal dots (right)

2. TOP / APP BAR
   - Background: #FFDD00
   - Screen title: 14–15px / 500 / color #1A1A1A
   - Right: 26×26px circular avatar, fill #1A1A1A, initials in #FFDD00 at 9px
   - No border, no shadow — flush with content below

3. FORM FIELDS
   - Label: ALL CAPS, 9px, #1A1A1A, 500, letter-spacing 0.6px, 4px below label
   - Required: red asterisk (#E24B4A) inline after label text
   - Input background: #F5F5F5, border: none, radius 6px
   - Input padding: 9px 10px, font 12px, color #1A1A1A
   - Placeholder: #888888
   - No visible border on inputs in default state
   - Focus state: 2px solid #FFDD00 ring, no shadow

4. ASSIGNEE CHIPS (pill selector row)
   - All chips same width (flex: 1), height ~28px, radius 4px
   - Inactive: bg #F5F5F5, text #1A1A1A, 10px / 500
   - Active / selected: bg #1A1A1A, text #FFDD00, 10px / 500
   - Horizontal scroll if overflow on mobile

5. DATE FIELDS
   - Two-column grid (1fr 1fr), gap 6px
   - Same input style as text fields
   - Show formatted date value: "Apr 18, 2026"

6. ATTACHMENT BUTTONS
   - Two side-by-side flat cards (flex: 1), bg #F5F5F5, radius 6px
   - Center-aligned: 18px icon circle on top, label below at 9px / #888
   - Icon circle: bg #1A1A1A, icon stroke #FFDD00
   - Active/recording state button: bg #1A1A1A, label color #888888

7. VOICE RECORDER ROW (while recording)
   - Full-width bg: #1A1A1A, radius 6px, padding 9px 12px
   - Left: 8px pulsing circle dot in #FFDD00 (CSS keyframe animation: opacity 1→0.3→1, 1s loop)
   - Center: "Recording…" in #FFDD00, 10px / 500
   - Right: elapsed time in #888, 9px

8. TRANSCRIPT TEXTAREA (post-recording)
   - Same style as description field
   - Pre-filled with transcribed text
   - Editable, 3 rows min
   - Label: "Voice transcript"

9. SCREENSHOT PREVIEW
   - Full width, max-height 120px, object-fit: cover, radius 6px
   - Shown directly below the screenshot button after file selection
   - Small "remove" × icon top-right corner: 16px circle, bg #1A1A1A, × in #FFDD00

10. SUBMIT BUTTON
    - Full width minus 28px total horizontal margin (14px each side)
    - Height: 46px, radius 8px
    - Background: #FFDD00, text: #1A1A1A, 13px / 500
    - Loading state: show small spinner (rotating 16px circle, stroke #1A1A1A) replacing text
    - Disabled state: bg #F5F5F5, text #888, cursor not-allowed

11. LOGIN SCREEN
    - Pure white background, no app bar
    - Top-left: 36×36px logo square, bg #FFDD00, radius 8px, grid icon inside in #1A1A1A
    - Title: "Welcome back", 18px / 500
    - Subtitle: "Sign in to your workspace", 11px / #888
    - Same field style as form
    - Primary button: bg #1A1A1A, text #FFDD00, full width, 46px, radius 8px
    - "Sign in" — 13px / 500

12. SUCCESS / CONFIRMATION STATE
    - No app bar — white screen
    - Top: 44×44px circle, bg #FFDD00, checkmark SVG inside in #1A1A1A
    - Title: "Task submitted", 15px / 500
    - Subtitle: short confirmation copy, 10px / #888, line-height 1.5
    - Recent task cards below: bg #F5F5F5, radius 8px, padding 10px 12px
      - Title: 11px / 500 / #1A1A1A
      - Meta row: assignee tag pill (bg #1A1A1A, text #FFDD00, 8px), due date, status pill
    - "New task" CTA: bg #FFDD00, full width, 42px, radius 8px, #1A1A1A text

MOTION & MICRO-INTERACTIONS
  - All transitions: 150ms ease
  - Chip active state: instant background swap (no animation needed)
  - Submit button loading: opacity 0.7 + spinner
  - Recording dot: keyframe pulse, 1s loop, opacity 1 → 0.3 → 1
  - Form field focus: 2px yellow ring appears instantly
  - Success screen: slide up from bottom (translateY 24px → 0, opacity 0 → 1, 250ms ease-out)
  - Toast notification: slide in from top, auto-dismiss after 3s

LAYOUT RULES
  - Max content width on mobile: 100% with 16px side padding
  - On desktop/tablet (≥640px): center content in a 420px column, rest is white
  - No bottom nav bar in MVP
  - Scrollable form — do not paginate or split into steps
  - Sticky submit button only if form is very long (> 1.5× viewport height)

ICONS
  Use inline SVG only — no external icon library
  Stroke weight: 1.5px, stroke-linecap: round, stroke-linejoin: round
  All icons: 16×16px default, 20×20px for decorative
  Icon color: inherit from parent (white on dark bg, #1A1A1A on light bg, #FFDD00 on black bg)

ACCESSIBILITY
  - All tap targets minimum 44×44px
  - Focus rings on all interactive elements: 2px solid #FFDD00, offset 2px
  - Color contrast: #1A1A1A on #FFDD00 passes AA (ratio ~11:1)
  - Screen reader labels on all icon-only buttons (aria-label)
  - Required fields marked with aria-required="true"