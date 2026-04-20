# Task Assignment & Alert App — Complete Build Prompt
# Paste this entire prompt into Cursor, Bolt, Lovable, v0, or any AI coding tool.
# Every section is fully detailed. Build the complete app in one shot.

═══════════════════════════════════════════════════════════════
SECTION 01 · ROLE & GOAL
═══════════════════════════════════════════════════════════════

You are a senior full-stack developer and UI engineer. Build a complete,
production-ready, mobile-first Task Assignment & Alert App from scratch.
No boilerplate shortcuts. Every screen, component, interaction, and
integration must be fully implemented and working.

The app allows an admin to:
  1. Log in with email and password (Supabase Auth)
  2. View a task dashboard showing all tasks with status filters
  3. Create tasks with title, description, assignee, dates,
     optional screenshot, and optional voice note
  4. Auto-transcribe voice notes using the Web Speech API
     (with OpenAI Whisper as fallback)
  5. Submit tasks to Supabase (database + file storage)
  6. Automatically send a Zoho Cliq notification to the assigned
     person or team channel on every submission
  7. View full task detail by tapping any task card
  8. Update task status (Pending → In Progress → Done) inline

The app must feel fast, clean, and completable in under 60 seconds
per task. It is internal-use only (no public sign-up).


═══════════════════════════════════════════════════════════════
SECTION 02 · TECH STACK
═══════════════════════════════════════════════════════════════

Frontend framework : React 18 + Vite 5
Styling            : TailwindCSS v3 (JIT, mobile-first breakpoints)
Routing            : React Router v6 (createBrowserRouter)
State management   : React useState + useContext (no Redux, no Zustand)
HTTP               : Native fetch() only — no axios
Backend / DB       : Supabase (Auth + PostgreSQL + Storage)
Transcription      : Web Speech API (primary) → OpenAI Whisper (fallback)
Notifications      : Zoho Cliq Incoming Webhooks (HTTP POST, no SDK)
Font               : Inter from Google Fonts — weights 400, 500, 600
Icons              : Inline SVG only — no Heroicons, no Lucide, no icon lib
Hosting target     : Vercel or Netlify (static SPA export)

Package versions to use:
  react: ^18.2.0
  react-dom: ^18.2.0
  react-router-dom: ^6.22.0
  @supabase/supabase-js: ^2.39.0
  tailwindcss: ^3.4.0
  vite: ^5.1.0


═══════════════════════════════════════════════════════════════
SECTION 03 · DESIGN SYSTEM (apply to every component)
═══════════════════════════════════════════════════════════════

── COLOR PALETTE ────────────────────────────────────────────

  Primary yellow  : #FFDD00  — app bar bg, FAB accent, active chips,
                               CTA bg, logo bg, recording dot, stat card
  Tertiary black  : #1A1A1A  — dark buttons, inactive assignee chips,
                               FAB body, voice card bg, nav header bg
  Background      : #FFFFFF  — every screen background
  Surface         : #F5F5F5  — input fields, inactive filter chips,
                               stat cards (non-primary), card hover
  Muted           : #888888  — placeholder text, secondary labels,
                               captions, inactive chip text
  Border default  : #ECECEC  — card borders, dividers
  Yellow dark     : #7A6A00  — subtitle text on yellow backgrounds only
  Error / overdue : #E24B4A  — validation errors, overdue accents
  Overdue surface : #FCEBEB  — overdue pill background
  Success         : #3B6D11  — done pill text
  Success surface : #EAF3DE  — done pill background

CSS custom properties to define in :root (index.css):
  --yellow:     #FFDD00;
  --black:      #1A1A1A;
  --white:      #FFFFFF;
  --surface:    #F5F5F5;
  --muted:      #888888;
  --border:     #ECECEC;
  --error:      #E24B4A;
  --yellow-dark:#7A6A00;

── TYPOGRAPHY ───────────────────────────────────────────────

Font: Inter (Google Fonts)
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

Scale:
  App bar / screen title  : 16px / 600 / #1A1A1A
  Section micro-label     : 10px / 500 / UPPERCASE / letter-spacing 0.6px / #888
  Card title              : 13px / 500 / #1A1A1A
  Body / input text       : 13px / 400 / #1A1A1A
  Description / secondary : 13px / 400 / #888 / line-height 1.6
  Caption / meta          : 11px / 400 / #888
  Button text             : 14px / 600
  Stat number             : 24px / 600 / #1A1A1A
  Stat label              : 10px / 400 / #888 (or #7A6A00 on yellow)
  Error message           : 11px / 400 / #E24B4A

Weights used: 400 (regular), 500 (medium), 600 (semibold) — NEVER 700+

── SPACING SYSTEM ───────────────────────────────────────────

Base unit: 4px
Page horizontal padding:  16px
Gap between form fields:  14px vertical
Card internal padding:    12px 14px
Chip gap (horizontal):    6px
Section gap:              20px vertical
Stats row gap:            8px

── BORDER RADIUS ────────────────────────────────────────────

  Primary CTA / submit button : 12px
  Secondary buttons           : 10px
  Input fields / textareas    : 8px
  Task cards                  : 12px
  Filter chips                : 20px (pill shape)
  Assignee chips              : 8px
  Status pills                : 4px
  Stat cards                  : 10px
  Voice / screenshot cards    : 10px
  Avatar circles              : 50%
  FAB                         : 50%
  Logo square                 : 10px
  Date input cells            : 8px

── ELEVATION & BORDERS ──────────────────────────────────────

  Cards        : border 0.5px solid #ECECEC — no box-shadow
  Inputs       : border none — background #F5F5F5 only
  Focus ring   : outline: 2px solid #FFDD00; outline-offset: 2px
  Overdue card : border-left: 2.5px solid #E24B4A; border-radius: 0 12px 12px 0
  No drop shadows anywhere (flat design)

── MOTION & ANIMATION ───────────────────────────────────────

  Standard transition    : all 150ms ease
  Page enter animation   : slideUp — translateY(20px)→0 + opacity 0→1, 200ms ease-out
  FAB tap                : transform scale(0.92), 100ms, returns to 1 on release
  Chip / button active   : transform scale(0.97), 80ms
  Recording dot pulse    : keyframe — opacity 1→0.3→1, duration 1s, ease-in-out, infinite
  Toast slide-in         : translateY(-20px)→0 + opacity 0→1, 200ms ease-out
  Toast slide-out        : opacity 1→0, 150ms ease-in (after 3000ms)
  Submit loading spinner : border-top transparent rotate 360deg, 700ms linear infinite
  Status update          : background-color transition 120ms ease

Define these keyframes in index.css:
  @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes slideUp  { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes spin     { to{transform:rotate(360deg)} }
  @keyframes slideDown{ from{transform:translateY(-20px);opacity:0} to{transform:translateY(0);opacity:1} }

── COMPONENT PATTERNS ───────────────────────────────────────

MICRO-LABEL (used above every form section):
  <p class="micro-label">TITLE</p>
  CSS: font-size:10px; font-weight:500; color:#888; text-transform:uppercase;
       letter-spacing:0.6px; margin-bottom:4px;

AVATAR CIRCLE:
  Fixed size circle (30–40px), background #1A1A1A, initials text #FFDD00
  Font: 11–13px / 500. Always 2 characters (first + last initial, or team abbreviation)

STATUS DOT (top-right of task card):
  10px circle — yellow=#FFDD00 (Pending), black=#1A1A1A (In progress), gray=#CCC (Done)

ASSIGNEE PILL:
  bg #1A1A1A, text #FFDD00, font-size 10px, font-weight 500, radius 4px, padding 2px 8px

STATUS PILL colors:
  Pending     → bg #FFDD00,   text #1A1A1A
  In progress → bg #F5F5F5,   text #888
  Done        → bg #EAF3DE,   text #3B6D11
  Overdue     → bg #FCEBEB,   text #E24B4A

FILTER CHIP (active / inactive):
  Active   → bg #1A1A1A, text #FFDD00, radius 20px, padding 6px 14px, 12px/500
  Inactive → bg #F5F5F5, text #888,    same shape


═══════════════════════════════════════════════════════════════
SECTION 04 · SCREEN 1 — LOGIN  (/login)
═══════════════════════════════════════════════════════════════

ROUTE: /login (public — redirect to /dashboard if already authenticated)

LAYOUT:
  Full white screen, vertically centered column, max-width 420px,
  centered horizontally with auto horizontal margins.
  Padding: 40px 20px on mobile.

ELEMENTS (top to bottom):

1. LOGO MARK
   - 44×44px square, background #FFDD00, border-radius 10px
   - Inside: 2×2 grid of 4 squares in #1A1A1A (each ~14×14px, gap 3px, radius 3px)
   - Bottom-right square: opacity 0.2 (brand mark detail)
   - Margin-bottom: 32px

2. HEADING
   - "Welcome back" — 26px / 600 / #1A1A1A
   - Margin-bottom: 6px

3. SUBHEADING
   - "Sign in to your workspace" — 14px / 400 / #888
   - Margin-bottom: 32px

4. EMAIL FIELD
   - Micro-label: "EMAIL"
   - Input: type="email", height 50px, bg #F5F5F5, border none, radius 8px,
     padding 0 16px, font 13px/400/#1A1A1A, width 100%
   - Placeholder: "admin@company.com" in #888
   - Margin-bottom: 14px

5. PASSWORD FIELD
   - Micro-label: "PASSWORD"
   - Input: type="password", same styling as email
   - Placeholder: "Enter your password" in #888
   - Margin-bottom: 20px

6. ERROR MESSAGE (conditional — shown on auth failure)
   - "Invalid email or password. Please try again."
   - 11px / 400 / #E24B4A, margin-top -12px, margin-bottom 12px
   - Only render this element when authError state is truthy

7. SIGN IN BUTTON
   - Full width, height 52px, bg #1A1A1A, text #FFDD00
   - Text: "Sign in" — 14px / 600
   - Border-radius 12px, border none
   - Hover: opacity 0.88, transition 150ms
   - Active: scale(0.98), 80ms
   - Loading state: replace text with 18px white spinning circle (CSS border trick)
     and set opacity to 0.7, pointer-events none
   - Margin-bottom: 16px

8. FORGOT PASSWORD LINK
   - "Forgot password?" — 12px / 400 / #888
   - Text centered, no underline by default, underline on hover
   - onClick: for MVP show a toast "Please contact your administrator"

FORM BEHAVIOUR:
  - On mount: check Supabase session → if exists, redirect to /dashboard immediately
  - On submit: prevent default, validate both fields non-empty (show "This field is required"
    below each empty field in #E24B4A, 11px)
  - Call: supabase.auth.signInWithPassword({ email, password })
  - On success: navigate('/dashboard', { replace: true })
  - On error: set authError = true, show error message (item 6 above)
  - setIsLoading(true) before call, setIsLoading(false) in finally block
  - Clear authError when user starts typing again (onChange)


═══════════════════════════════════════════════════════════════
SECTION 05 · SCREEN 2 — DASHBOARD  (/dashboard)
═══════════════════════════════════════════════════════════════

ROUTE: /dashboard (protected — redirect to /login if no session)

LAYOUT: Full white screen, single column, no horizontal overflow.
        Content padded 16px left/right. Page scrolls vertically.

── APP BAR (sticky top) ─────────────────────────────────────

  Position: sticky top-0, z-index 50
  Height: 72px, background #FFDD00
  Padding: 14px 16px

  LEFT SIDE:
    Greeting text: "Good morning" / "Good afternoon" / "Good evening"
    (compute based on current hour: 5–11 = morning, 12–17 = afternoon, 18–4 = evening)
    — 16px / 600 / #1A1A1A

    Subtitle below: "{X} tasks due today"
    (count tasks where due_date = today AND status != 'done')
    — 12px / 400 / #7A6A00

  RIGHT SIDE:
    Avatar circle: 38×38px, bg #1A1A1A, radius 50%
    Initials from logged-in user's email (first 2 chars uppercase), color #FFDD00, 13px/500
    On tap → show a small dropdown menu below avatar:
      Menu item: "Sign out" — tap calls supabase.auth.signOut() → navigate('/login')
      Style: white card, 120px wide, 1px border #ECECEC, radius 8px, 12px/400/#1A1A1A,
             padding 10px 14px, positioned absolute top-full right-0

── STATS ROW ────────────────────────────────────────────────

  Margin-top: 0 (flush below app bar)
  Padding: 16px 16px 0
  Display: grid, 3 equal columns, gap 8px

  CARD 1 — TOTAL:
    bg #FFDD00, radius 10px, padding 14px 10px
    Number: count of ALL tasks — 24px / 600 / #1A1A1A, centered
    Label: "Total" — 10px / 400 / #7A6A00, centered

  CARD 2 — ACTIVE:
    bg #F5F5F5, same size/padding
    Number: count of tasks where status IN ('pending', 'in_progress') — 24px/600/#1A1A1A
    Label: "Active" — 10px/400/#888

  CARD 3 — DONE:
    bg #F5F5F5, same size/padding
    Number: count of tasks where status = 'done' — 24px/600/#1A1A1A
    Label: "Done" — 10px/400/#888

  All numbers fetched live from Supabase on page load and on pull-to-refresh.

── FILTER CHIPS ─────────────────────────────────────────────

  Padding: 14px 16px 0
  Display: flex, gap 6px, overflow-x auto, no scrollbar visible
  (scrollbar-width: none; -webkit-overflow-scrolling: touch)

  Four chips: "All" | "Pending" | "In progress" | "Done"
  Default active: "All"
  Single-select — tap to activate, re-tapping "All" resets filter

  Active chip style:  bg #1A1A1A, color #FFDD00, radius 20px, padding 7px 16px, 12px/500
  Inactive chip style: bg #F5F5F5, color #888,    same shape and padding
  Transition: background + color, 120ms ease

  Filtering logic: client-side — filter in-memory task array, no refetch.
  Filter key: 'pending', 'in_progress', 'done', or 'all' (show everything)

── SECTION LABEL ────────────────────────────────────────────

  "Tasks" — 11px / 500 / #888 / uppercase, padding 12px 16px 6px

── TASK LIST ────────────────────────────────────────────────

  Scrollable area below filters, padding 0 16px 100px (bottom padding for FAB clearance)
  Gap between cards: 10px

  Each task is rendered using <TaskCard /> component.

  TASK CARD ANATOMY (normal):
    Background: #FFFFFF
    Border: 0.5px solid #ECECEC
    Border-radius: 12px
    Padding: 12px 14px
    Tap: navigate to /task/:id

    ROW 1 (top):
      Left: task title — 13px / 500 / #1A1A1A, flex:1, padding-right 10px
            If title > 45 chars: truncate with ellipsis (overflow hidden, white-space nowrap)
      Right: status dot — 10px circle
             Pending = #FFDD00, In progress = #1A1A1A, Done = #CCCCCC

    ROW 2 (bottom, margin-top 7px):
      Assignee pill: bg #1A1A1A, text #FFDD00, 10px/500, radius 4px, padding 2px 8px
      Status pill:   see status pill colors in Section 03
      Due date:      "Apr 22" — 10px / 400 / #BBBBBB, margin-left auto

  TASK CARD ANATOMY (overdue — due_date < today AND status != 'done'):
    Same as normal PLUS:
    border-left: 2.5px solid #E24B4A
    border-radius: 0 12px 12px 0 (left side flat, right side rounded)
    Extra row 3: "2 days overdue" (calculate actual days) — 10px / 500 / #E24B4A, margin-top 5px

  EMPTY STATE (no tasks match filter):
    Centered column in the list area:
    40px circle bg #F5F5F5 with a checkmark SVG icon in #888
    "No tasks here" — 14px/500/#1A1A1A, margin-top 12px
    "Tap + to create your first task" — 12px/400/#888

  LOADING STATE (while fetching from Supabase):
    Show 4 skeleton cards — same size as real cards
    Skeleton: bg #F5F5F5, radius 12px, animated shimmer effect
    (CSS: background linear-gradient shimmer, or simple pulse opacity animation)

  PULL-TO-REFRESH:
    On mobile, implement pull-to-refresh using a simple scroll listener.
    When user pulls down past 60px on the task list, show a small
    yellow spinner at the top and re-fetch tasks from Supabase.

── FLOATING ACTION BUTTON (FAB) ─────────────────────────────

  Position: fixed bottom-right (bottom: 24px, right: 20px)
  Size: 56×56px, border-radius 50%
  Background: #1A1A1A
  Shadow: none (flat design)
  z-index: 100

  Inside: centered plus icon — inline SVG, viewBox="0 0 24 24"
    Two lines: horizontal (M3 12 h18) + vertical (M12 3 v18)
    stroke="#FFDD00", stroke-width="2.5", stroke-linecap="round"

  On tap: navigate('/create')
  Animation: scale(0.92) on touchstart, scale(1) on touchend, 100ms ease


═══════════════════════════════════════════════════════════════
SECTION 06 · SCREEN 3 — TASK DETAIL  (/task/:id)
═══════════════════════════════════════════════════════════════

ROUTE: /task/:id (protected)

DATA LOADING:
  On mount: fetch single task from Supabase
  const { data } = await supabase.from('tasks').select('*').eq('id', id).single()
  Show full-screen yellow dot pulse spinner while loading.
  If task not found: show "Task not found" with a back button.

LAYOUT: white screen, scrollable body

── APP BAR ──────────────────────────────────────────────────

  Height: 64px, background #FFDD00, padding 0 16px
  Display: flex, align-items center, gap 12px

  BACK BUTTON (left):
    34×34px circle, bg #1A1A1A, radius 50%
    Inside: left arrow SVG — stroke #FFDD00, stroke-width 2, linecap round
    SVG path: "M15 18l-6-6 6-6"
    On tap: navigate(-1) or navigate('/dashboard')

  TITLE (right of back button):
    "Task detail" — 15px / 600 / #1A1A1A

── BODY (padding 20px 16px, sections with 16px gap) ─────────

SECTION: TITLE
  Micro-label: "TITLE"
  Value: task.title — 16px / 600 / #1A1A1A, line-height 1.3

SECTION: DESCRIPTION
  (Only render if task.description is not null/empty)
  Micro-label: "DESCRIPTION"
  Value: task.description — 13px / 400 / #888, line-height 1.6

SECTION: ASSIGNED TO
  Micro-label: "ASSIGNED TO"
  Card row: bg #F5F5F5, radius 10px, padding 11px 14px
  Content: flex row, gap 10px, align-items center
    - Avatar circle: 34px, bg #1A1A1A, initials #FFDD00, 12px/500
      (show first 2 letters of assigned_to value, uppercase)
    - Right column:
        Top: task.assigned_to — 13px / 500 / #1A1A1A
        Bottom: "Notified via Zoho Cliq" — 11px / 400 / #888

SECTION: DATES
  Micro-label: "DATES"
  2-column grid, gap 8px
    Left cell: bg #F5F5F5, radius 8px, padding 10px 12px
      Sub-label: "ASSIGNED" — 9px/500/uppercase/#AAA, margin-bottom 3px
      Value: formatted assigned_date — 13px/600/#1A1A1A
      (format: "Apr 18, 2026" using toLocaleDateString)
    Right cell: same style
      Sub-label: "DUE DATE"
      Value: formatted due_date
  If either date is null, show "Not set" in #888 for that cell.

SECTION: STATUS
  Micro-label: "STATUS"
  Three equal-width chips in a flex row, gap 6px
    "Pending"     — when active: bg #FFDD00, text #1A1A1A
    "In progress" — when active: bg #1A1A1A, text #FFDD00
    "Done"        — when active: bg #EAF3DE,  text #3B6D11
  Inactive: bg #F5F5F5, text #888
  Height: 44px each (tap target), radius 8px, 12px/500, centered

  On tap: optimistically update local state,
  then call: supabase.from('tasks').update({ status: newStatus }).eq('id', id)
  Show a subtle loading state (opacity 0.6) on the chips during the update.
  On error: revert local state + show error toast.

SECTION: VOICE TRANSCRIPT
  (Only render if task.voice_transcript is not null/empty)
  Micro-label: "VOICE TRANSCRIPT"
  Dark card: bg #1A1A1A, radius 10px, padding 14px
    Header row: flex, align-items center, gap 8px, margin-bottom 8px
      8px circle: bg #FFDD00(static — no animation here)
      Text: "Transcribed note" — 11px / 500 / #FFDD00
    Body: task.voice_transcript — 12px / 400 / #777777, line-height 1.5

SECTION: AUDIO PLAYBACK
  (Only render if task.audio_url is not null)
  Micro-label: "VOICE NOTE"
  Native <audio controls src={task.audio_url} />
  Style: width 100%, bg #F5F5F5, border none, radius 8px, height 44px

SECTION: SCREENSHOT
  (Only render if task.screenshot_url is not null)
  Micro-label: "SCREENSHOT"
  <img src={task.screenshot_url} alt="Task screenshot" />
  Style: width 100%, max-height 200px, object-fit cover, radius 10px,
         border 0.5px solid #ECECEC

SECTION: METADATA
  Small muted row at bottom:
  "Created {relative time}" — 11px/400/#AAA (e.g. "Created 2 hours ago")
  Use a simple relative time formatter (no library needed).


═══════════════════════════════════════════════════════════════
SECTION 07 · SCREEN 4 — CREATE TASK  (/create)
═══════════════════════════════════════════════════════════════

ROUTE: /create (protected)

LAYOUT: white screen, scrollable form body, sticky submit button

── APP BAR ──────────────────────────────────────────────────

  Height: 64px, bg #FFDD00, padding 0 16px
  Display: flex, align-items center, justify-content space-between

  LEFT: "New task" — 15px / 600 / #1A1A1A

  RIGHT: Close button
    34×34px circle, bg #1A1A1A, radius 50%
    Inside: × SVG — stroke #FFDD00, stroke-width 2, linecap round
    SVG paths: "M18 6 6 18" and "M6 6 18 18"
    On tap: navigate('/dashboard') — do not confirm, just navigate back

── FORM BODY ────────────────────────────────────────────────

  Padding: 20px 16px 100px (100px bottom for sticky submit clearance)
  All fields stacked vertically with 14px gap between them.

FIELD 1: TASK TITLE (REQUIRED)
  Micro-label: "TITLE *" — asterisk is span with color #E24B4A
  Input: type="text", placeholder="What needs to be done?",
         height 50px, bg #F5F5F5, radius 8px, border none,
         padding 0 16px, font 13px/400/#1A1A1A, width 100%
  Focus: outline 2px solid #FFDD00, outline-offset 2px
  Error state: border 1.5px solid #E24B4A + message "Title is required" below in 11px/#E24B4A
  Clear error as soon as user types anything.

FIELD 2: DESCRIPTION (OPTIONAL)
  Micro-label: "DESCRIPTION"
  Textarea: 4 rows, placeholder="Add more context…",
            same bg/radius/border as input, padding 12px 16px,
            resize: none, font 13px/400/#1A1A1A, line-height 1.5, width 100%

FIELD 3: ASSIGN TO (OPTIONAL)
  Micro-label: "ASSIGN TO"
  Horizontal scrolling chip row (overflow-x auto, no scrollbar):
    Chips: "Dev Team" | "Alice" | "Bob" | "Carol" | "Marketing" | "Operations"
    Single-select — tap to select, tap again to deselect (toggles off)
    Active chip: bg #1A1A1A, text #FFDD00, radius 8px, height 38px, padding 0 16px, 12px/500
    Inactive chip: bg #F5F5F5, text #1A1A1A, same shape
    Transition: 120ms ease on bg and color

FIELD 4: DATES (BOTH OPTIONAL)
  Micro-label: "DATES"
  Two date pickers side-by-side (grid 1fr 1fr, gap 8px)
    Left: label "Assigned" (9px/500/uppercase/#AAA above input)
          <input type="date"> styled: bg #F5F5F5, radius 8px, height 48px,
          border none, padding 0 12px, font 13px/400/#1A1A1A, width 100%
    Right: label "Due date"  — same styling

  Validation: if both set, due_date must be >= assigned_date.
  If invalid: show "Due date must be after assigned date" in #E24B4A below the row.

FIELD 5: SCREENSHOT (OPTIONAL)
  Micro-label: "SCREENSHOT"

  STATE A — no file selected:
    Full-width tap zone: bg #F5F5F5, radius 10px, height 72px, border: 1.5px dashed #CCCCCC
    Centered content: camera SVG icon (20px, stroke #888) + "Tap to attach a screenshot" (12px/#888)
    Wraps a hidden <input type="file" accept="image/*" />
    On tap: programmatically click the file input

  STATE B — file selected:
    Show <img> preview: width 100%, max-height 160px, object-fit cover, radius 10px
    In top-right corner of preview: remove button
      20×20px circle bg #1A1A1A, × icon #FFDD00 (10px)
      Absolute positioned, top 8px, right 8px
      On tap: clear screenshotFile state, revoke object URL

FIELD 6: VOICE NOTE (OPTIONAL)
  Micro-label: "VOICE NOTE"

  STATE A — idle (no recording, no audio):
    Full-width tap zone: bg #F5F5F5, radius 10px, height 72px, border none
    Centered: microphone SVG icon (22px, stroke #1A1A1A) + "Tap to record a voice note" (12px/#888)
    On tap: request microphone permission → start recording (see Section 09)

  STATE B — recording in progress:
    Full-width row: bg #1A1A1A, radius 10px, height 52px, padding 0 16px
    Display: flex, align-items center, gap 10px
      Left: 10px circle bg #FFDD00 — CSS animation: pulse 1s ease-in-out infinite
      Center: "Recording…" — 13px / 500 / #FFDD00, flex 1
      Right: elapsed time counter "0:12" — 12px / 400 / #555
    On tap anywhere on this row: STOP recording

  STATE C — transcription in progress (after stop, before result):
    Same row as STATE B but:
      Replace dot + "Recording…" with a 14px spinning circle (border-trick) in #FFDD00
      Replace timer with "Transcribing…" — 12px/#555
      Row is not tappable during this state

  STATE D — recording done + transcript ready:
    Audio player: <audio controls src={audioUrl} />
      Style: width 100%, bg #F5F5F5, radius 8px, height 44px

    Below audio player (margin-top 10px):
    Micro-label: "VOICE TRANSCRIPT"
    Textarea (editable — user can correct transcription errors):
      Pre-filled with voiceTranscript state value
      3 rows, same style as description textarea
      onChange → update voiceTranscript state

    Remove button: small text link "Remove voice note" — 11px/400/#E24B4A
      On tap: clear audioBlob, audioUrl, voiceTranscript states

── STICKY SUBMIT BUTTON ─────────────────────────────────────

  Position: sticky (or fixed on mobile) at bottom of screen
  Background: white strip — height 80px, padding 14px 16px
  Border-top: 0.5px solid #ECECEC

  Button: full width, height 52px, bg #FFDD00, radius 12px, border none
  Text: "Submit task" — 14px / 600 / #1A1A1A
  Hover: opacity 0.88, 150ms
  Active: scale(0.98), 80ms

  LOADING STATE:
    Replace text with 16px spinning circle (border-trick, border-color #1A1A1A, top border transparent)
    Button: opacity 0.7, pointer-events none, cursor not-allowed

  DISABLED STATE (when title is empty):
    bg #F5F5F5, text #888, cursor not-allowed — no hover effect


═══════════════════════════════════════════════════════════════
SECTION 08 · SUPABASE SCHEMA & STORAGE
═══════════════════════════════════════════════════════════════

── DATABASE TABLE ────────────────────────────────────────────

Run this exact SQL in the Supabase SQL Editor:

CREATE TABLE public.tasks (
  id               uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  title            text         NOT NULL,
  description      text,
  assigned_to      text,
  assigned_date    date,
  due_date         date,
  voice_transcript text,
  audio_url        text,
  screenshot_url   text,
  status           text         NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending','in_progress','done')),
  created_by       uuid         REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at       timestamptz  NOT NULL DEFAULT now(),
  updated_at       timestamptz  NOT NULL DEFAULT now()
);

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can do everything"
  ON public.tasks
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Index for dashboard queries
CREATE INDEX tasks_status_idx ON public.tasks (status);
CREATE INDEX tasks_due_date_idx ON public.tasks (due_date);
CREATE INDEX tasks_created_by_idx ON public.tasks (created_by);

── STORAGE BUCKETS ───────────────────────────────────────────

Create these two buckets in Supabase Dashboard → Storage:

BUCKET 1:
  Name: task-screenshots
  Public: true (check "Public bucket")
  File size limit: 10 MB
  Allowed MIME types: image/jpeg, image/png, image/webp, image/gif

BUCKET 2:
  Name: task-audio
  Public: true
  File size limit: 25 MB
  Allowed MIME types: audio/webm, audio/mp4, audio/mpeg, audio/ogg

For both buckets, set Storage policy (run in SQL editor):
  CREATE POLICY "Authenticated upload"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id IN ('task-screenshots','task-audio'));

  CREATE POLICY "Public read"
    ON storage.objects FOR SELECT TO public
    USING (bucket_id IN ('task-screenshots','task-audio'));


═══════════════════════════════════════════════════════════════
SECTION 09 · AUTH & ROUTING
═══════════════════════════════════════════════════════════════

── src/config/supabase.js ───────────────────────────────────

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)

── src/hooks/useAuth.js ─────────────────────────────────────

Exports: { user, session, loading, signOut }

Implementation:
  - useEffect on mount: supabase.auth.getSession() → set session state
  - supabase.auth.onAuthStateChange((event, session) => { setSession(session); setUser(session?.user ?? null) })
  - setLoading(false) after initial getSession resolves
  - signOut: calls supabase.auth.signOut() then navigates to /login

── src/components/ProtectedRoute.jsx ───────────────────────

Wraps any route that requires authentication.

  import { Navigate } from 'react-router-dom'
  import { useAuth } from '../hooks/useAuth'
  import Spinner from './Spinner'

  export default function ProtectedRoute({ children }) {
    const { session, loading } = useAuth()
    if (loading) return <Spinner fullScreen />
    if (!session) return <Navigate to="/login" replace />
    return children
  }

── src/App.jsx routing setup ───────────────────────────────

  import { createBrowserRouter, RouterProvider } from 'react-router-dom'
  import { AuthProvider } from './context/AuthContext'
  import ProtectedRoute from './components/ProtectedRoute'
  import Login from './pages/Login'
  import Dashboard from './pages/Dashboard'
  import TaskDetail from './pages/TaskDetail'
  import CreateTask from './pages/CreateTask'

  const router = createBrowserRouter([
    { path: '/login',      element: <Login /> },
    { path: '/dashboard',  element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
    { path: '/task/:id',   element: <ProtectedRoute><TaskDetail /></ProtectedRoute> },
    { path: '/create',     element: <ProtectedRoute><CreateTask /></ProtectedRoute> },
    { path: '/',           element: <Navigate to="/dashboard" replace /> },
    { path: '*',           element: <Navigate to="/dashboard" replace /> },
  ])

  export default function App() {
    return <AuthProvider><RouterProvider router={router} /></AuthProvider>
  }

── src/context/AuthContext.jsx ──────────────────────────────

  Creates AuthContext with { user, session, loading, signOut }
  Wraps the whole app. useAuth() hook reads from this context.
  Handles supabase.auth.onAuthStateChange subscription with cleanup.


═══════════════════════════════════════════════════════════════
SECTION 10 · VOICE RECORDING & TRANSCRIPTION
═══════════════════════════════════════════════════════════════

── src/hooks/useVoiceRecorder.js ────────────────────────────

Exports:
  { isRecording, audioBlob, audioUrl, recordingSeconds,
    startRecording, stopRecording, clearRecording }

IMPLEMENTATION:

const mediaRecorderRef = useRef(null)
const chunksRef = useRef([])
const streamRef = useRef(null)
const timerRef = useRef(null)

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    streamRef.current = stream
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4'
    const recorder = new MediaRecorder(stream, { mimeType })
    chunksRef.current = []
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType })
      setAudioBlob(blob)
      setAudioUrl(URL.createObjectURL(blob))
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
    recorder.start(250) // collect data every 250ms
    mediaRecorderRef.current = recorder
    setIsRecording(true)
    setRecordingSeconds(0)
    timerRef.current = setInterval(() => setRecordingSeconds(s => s + 1), 1000)
  } catch (err) {
    // Microphone permission denied — show toast "Microphone access denied"
    console.error('Recording error:', err)
  }
}

function stopRecording() {
  mediaRecorderRef.current?.stop()
  clearInterval(timerRef.current)
  setIsRecording(false)
}

function clearRecording() {
  if (audioUrl) URL.revokeObjectURL(audioUrl)
  setAudioBlob(null); setAudioUrl(null)
  setRecordingSeconds(0)
}

// Cleanup on unmount
useEffect(() => () => {
  clearInterval(timerRef.current)
  streamRef.current?.getTracks().forEach(t => t.stop())
}, [])

Format seconds display:
  const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`

── src/hooks/useTranscription.js ────────────────────────────

Exports: { transcribe, isTranscribing, transcript, setTranscript }

IMPLEMENTATION:

async function transcribe(audioBlob) {
  setIsTranscribing(true)
  setTranscript('')
  try {
    // PRIMARY: Web Speech API
    // Note: Web Speech API transcribes live; start SpeechRecognition
    // BEFORE calling recorder.start() and capture results continuously.
    // If Web Speech API was used during recording, transcript is already available.
    // The fallback below is only needed when Web Speech API is not supported.

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      // FALLBACK: OpenAI Whisper
      await transcribeWithWhisper(audioBlob)
    }
  } finally {
    setIsTranscribing(false)
  }
}

async function transcribeWithWhisper(blob) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (!apiKey) {
    setTranscript('[Transcription unavailable — no API key configured]')
    return
  }
  const ext = blob.type.includes('mp4') ? 'mp4' : 'webm'
  const formData = new FormData()
  formData.append('file', blob, `recording.${ext}`)
  formData.append('model', 'whisper-1')
  formData.append('language', 'en')
  try {
    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData
    })
    if (!res.ok) throw new Error('Whisper API error')
    const data = await res.json()
    setTranscript(data.text ?? '')
  } catch {
    setTranscript('[Transcription failed — please type manually]')
  }
}

WEB SPEECH API INTEGRATION (in VoiceRecorder component):
  - Create SpeechRecognition instance before starting MediaRecorder
  - recognition.continuous = true
  - recognition.interimResults = true
  - Accumulate finalTranscript from recognition.onresult
  - Call recognition.stop() when stopRecording() is called
  - Set transcript state from finalTranscript in recognition.onend


═══════════════════════════════════════════════════════════════
SECTION 11 · TASK SUBMISSION FLOW
═══════════════════════════════════════════════════════════════

handleSubmit async function in CreateTask.jsx — FULL SEQUENCE:

async function handleSubmit() {
  // Step 1: Validate
  const errors = {}
  if (!title.trim()) errors.title = 'Title is required'
  if (assignedDate && dueDate && dueDate < assignedDate)
    errors.dates = 'Due date must be on or after assigned date'
  if (Object.keys(errors).length > 0) {
    setErrors(errors)
    return
  }

  // Step 2: Set loading
  setIsSubmitting(true)
  setErrors({})

  try {
    // Step 3: Upload screenshot (if selected)
    let screenshotPublicUrl = null
    if (screenshotFile) {
      const ext = screenshotFile.name.split('.').pop().toLowerCase()
      const path = `screenshots/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadErr } = await supabase.storage
        .from('task-screenshots')
        .upload(path, screenshotFile, { contentType: screenshotFile.type })
      if (uploadErr) throw new Error('Screenshot upload failed: ' + uploadErr.message)
      screenshotPublicUrl = supabase.storage
        .from('task-screenshots').getPublicUrl(path).data.publicUrl
    }

    // Step 4: Upload audio (if recorded)
    let audioPublicUrl = null
    if (audioBlob) {
      const ext = audioBlob.type.includes('mp4') ? 'mp4' : 'webm'
      const path = `audio/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: audioErr } = await supabase.storage
        .from('task-audio')
        .upload(path, audioBlob, { contentType: audioBlob.type })
      if (audioErr) throw new Error('Audio upload failed: ' + audioErr.message)
      audioPublicUrl = supabase.storage
        .from('task-audio').getPublicUrl(path).data.publicUrl
    }

    // Step 5: Get current user
    const { data: { user } } = await supabase.auth.getUser()

    // Step 6: Insert task row
    const { data: task, error: insertErr } = await supabase
      .from('tasks')
      .insert([{
        title:            title.trim(),
        description:      description.trim() || null,
        assigned_to:      assignedTo || null,
        assigned_date:    assignedDate || null,
        due_date:         dueDate || null,
        voice_transcript: voiceTranscript.trim() || null,
        audio_url:        audioPublicUrl,
        screenshot_url:   screenshotPublicUrl,
        status:           'pending',
        created_by:       user?.id ?? null
      }])
      .select()
      .single()
    if (insertErr) throw new Error('Task save failed: ' + insertErr.message)

    // Step 7: Send Zoho Cliq notification (non-blocking)
    sendCliqAlert(task).catch(() => {}) // swallow notification errors silently

    // Step 8: Show success toast
    showToast('Task submitted successfully')

    // Step 9: Navigate to dashboard after brief delay
    setTimeout(() => navigate('/dashboard'), 1200)

  } catch (err) {
    // Show error toast — DO NOT reset the form
    showToast(err.message ?? 'Something went wrong. Please try again.', 'error')
  } finally {
    setIsSubmitting(false)
  }
}


═══════════════════════════════════════════════════════════════
SECTION 12 · ZOHO CLIQ NOTIFICATIONS
═══════════════════════════════════════════════════════════════

── src/config/webhooks.js ───────────────────────────────────

export const WEBHOOK_URLS = {
  default:     import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_URL       ?? null,
  'Dev Team':  import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_DEV       ?? null,
  'Marketing': import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_MARKETING ?? null,
  'Operations':import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_OPS       ?? null,
  'Alice':     import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_ALICE     ?? null,
  'Bob':       import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_BOB       ?? null,
  'Carol':     import.meta.env.VITE_ZOHO_CLIQ_WEBHOOK_CAROL     ?? null,
}

── src/services/cliqService.js ──────────────────────────────

import { WEBHOOK_URLS } from '../config/webhooks'

export async function sendCliqAlert(task) {
  const webhookUrl = WEBHOOK_URLS[task.assigned_to] ?? WEBHOOK_URLS.default
  if (!webhookUrl) return // no webhook configured — skip silently

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US',
    { month:'short', day:'numeric', year:'numeric' }) : 'Not set'

  const payload = {
    text: `New task assigned${task.assigned_to ? ` to ${task.assigned_to}` : ''}`,
    card: {
      title: task.title,
      theme: "modern-inline"
    },
    slides: [
      {
        type: "label",
        data: [
          {
            label: "Assigned to",
            value: task.assigned_to ?? "Unassigned"
          },
          {
            label: "Due date",
            value: formatDate(task.due_date)
          },
          {
            label: "Assigned date",
            value: formatDate(task.assigned_date)
          },
          {
            label: "Description",
            value: task.description ?? "—"
          },
          {
            label: "Voice transcript",
            value: task.voice_transcript ?? "—"
          },
          {
            label: "Status",
            value: "Pending"
          }
        ]
      }
    ]
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error(`Cliq notification failed: ${response.status}`)
  }
}


═══════════════════════════════════════════════════════════════
SECTION 13 · SHARED COMPONENTS
═══════════════════════════════════════════════════════════════

── src/components/Toast.jsx ─────────────────────────────────

Props: { message, type ('success'|'error'), visible, onDismiss }

Visual:
  Position: absolute top-4 left-4 right-4 (inside app container)
  or fixed top-4 left-4 right-4 z-50
  Max-width: 400px, centered horizontally
  Background: #1A1A1A (success) or #E24B4A (error)
  Text: #FFFFFF, 13px/500
  Padding: 14px 18px, radius 10px
  Animation in: slideDown 200ms ease-out
  Auto-dismiss: setTimeout 3000ms → fade out
  Left accent: 3px left border #FFDD00 (success) or none

── src/components/Spinner.jsx ───────────────────────────────

Props: { size (default 20), color (default '#1A1A1A'), fullScreen }

fullScreen: centers spinner in full viewport with white bg and
  a 40px yellow pulsing dot (animation: pulse 1s infinite)

Normal: CSS border-trick spinner at specified size and color

── src/components/TaskCard.jsx ──────────────────────────────

Props: { task, onClick }
Renders one task card exactly as described in Section 05.
Computes isOverdue = task.due_date < today && task.status !== 'done'
Exports as memoized component: export default React.memo(TaskCard)

── src/components/Avatar.jsx ────────────────────────────────

Props: { name, size (default 36), bg (default '#1A1A1A'), fg (default '#FFDD00') }
Computes initials: first char of first word + first char of last word (if exists)
Falls back to first 2 chars uppercase if single word.

── src/hooks/useTasks.js ────────────────────────────────────

Exports: { tasks, loading, error, refetch, updateTaskStatus }

Implementation:
  - Fetch all tasks on mount, ordered by created_at DESC
  - const { data } = await supabase.from('tasks').select('*').order('created_at', { ascending: false })
  - updateTaskStatus(id, newStatus): optimistic update local array,
    then supabase.from('tasks').update({ status: newStatus }).eq('id', id)
    On error: revert + call showToast('Status update failed')
  - refetch: re-runs the full fetch query


═══════════════════════════════════════════════════════════════
SECTION 14 · COMPLETE FILE STRUCTURE
═══════════════════════════════════════════════════════════════

task-app/
├── public/
│   └── favicon.svg               (simple yellow square logo)
├── src/
│   ├── components/
│   │   ├── Avatar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Spinner.jsx
│   │   ├── TaskCard.jsx
│   │   ├── Toast.jsx
│   │   ├── VoiceRecorder.jsx
│   │   └── ScreenshotUpload.jsx
│   ├── config/
│   │   ├── supabase.js
│   │   └── webhooks.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useTasks.js
│   │   ├── useTranscription.js
│   │   ├── useVoiceRecorder.js
│   │   └── useToast.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── TaskDetail.jsx
│   │   └── CreateTask.jsx
│   ├── services/
│   │   └── cliqService.js
│   ├── utils/
│   │   └── formatters.js         (relativeTime, formatDate, formatTimer)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .env.local                    (never commit — gitignored)
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md


═══════════════════════════════════════════════════════════════
SECTION 15 · ENVIRONMENT VARIABLES
═══════════════════════════════════════════════════════════════

.env.example (commit this file — shows required vars without values):

# ── Supabase ──────────────────────────────────────────────────
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# ── Zoho Cliq Webhooks ────────────────────────────────────────
# Default channel (receives alerts when no specific channel matched)
VITE_ZOHO_CLIQ_WEBHOOK_URL=https://cliq.zoho.com/company/.../incoming/...

# Per-team channels (optional — falls back to default if not set)
VITE_ZOHO_CLIQ_WEBHOOK_DEV=
VITE_ZOHO_CLIQ_WEBHOOK_MARKETING=
VITE_ZOHO_CLIQ_WEBHOOK_OPS=

# Per-person webhooks (optional — falls back to default if not set)
VITE_ZOHO_CLIQ_WEBHOOK_ALICE=
VITE_ZOHO_CLIQ_WEBHOOK_BOB=
VITE_ZOHO_CLIQ_WEBHOOK_CAROL=

# ── OpenAI (optional — only needed for Whisper transcription fallback) ──
VITE_OPENAI_API_KEY=


═══════════════════════════════════════════════════════════════
SECTION 16 · README.md CONTENT
═══════════════════════════════════════════════════════════════

The README.md must contain all of the following:

# Task Assignment & Alert App

A lightweight internal workflow tool for capturing and routing action items.
Mobile-first. Built with React + Supabase + Zoho Cliq.

## Features
- Admin login (email/password via Supabase Auth)
- Task dashboard with live stats, status filters, task cards
- Create tasks with title, description, assignee, dates
- Screenshot attachment with preview
- Voice note recording with automatic speech-to-text transcription
- Automatic Zoho Cliq alerts to the assigned person or team channel
- Task detail view with inline status updates
- All tasks stored reliably in Supabase PostgreSQL

## Prerequisites
- Node.js v18 or higher
- A Supabase project (free tier works)
- A Zoho Cliq workspace with at least one incoming webhook

## Setup

### 1. Clone and install
  git clone <repo-url>
  cd task-app
  npm install

### 2. Configure environment
  cp .env.example .env.local
  # Edit .env.local and fill in all required values

### 3. Set up Supabase
  - Go to your Supabase project → SQL Editor
  - Paste and run the full SQL from Section 08 of this prompt
  - Go to Storage → Create bucket "task-screenshots" (public: on)
  - Go to Storage → Create bucket "task-audio" (public: on)
  - Run the storage policies SQL from Section 08

### 4. Set up Zoho Cliq webhooks
  - Open Zoho Cliq → click a channel → Channel Settings → Bots & Integrations
  - Add Incoming Webhook → copy the URL
  - Paste it into VITE_ZOHO_CLIQ_WEBHOOK_URL in .env.local
  - Repeat for each team channel and paste into per-team env vars

### 5. Run the app
  npm run dev
  # Open http://localhost:5173

### 6. Build for production
  npm run build
  # Deploy the dist/ folder to Vercel or Netlify

## Mobile testing notes
- iOS Safari: audio recording uses audio/mp4 (the code auto-detects this)
- Web Speech API is not available on all browsers. The app falls back to
  OpenAI Whisper automatically when SpeechRecognition is unavailable.
  Set VITE_OPENAI_API_KEY to enable Whisper fallback.
- Test on real iOS and Android devices, not just browser DevTools emulation.

## Deployment (Vercel)
  npm i -g vercel
  vercel
  # Add all VITE_ env vars in the Vercel project dashboard under Settings → Environment Variables


═══════════════════════════════════════════════════════════════
SECTION 17 · FINAL NON-NEGOTIABLE REQUIREMENTS
═══════════════════════════════════════════════════════════════

CODE QUALITY:
  ✓ All API keys read from import.meta.env — never hardcoded
  ✓ No console.log() calls in production code (use console.error for caught exceptions only)
  ✓ All async functions wrapped in try/catch/finally
  ✓ Loading and error states handled on every data-fetching operation
  ✓ Form data is NEVER reset on submission error (preserve user input)
  ✓ All object URLs (audio, screenshot preview) revoked with URL.revokeObjectURL() on cleanup

MOBILE & ACCESSIBILITY:
  ✓ Every tap target is minimum 44×44px
  ✓ Focus rings on all interactive elements: 2px solid #FFDD00, offset 2px
  ✓ All images have alt attributes
  ✓ All form inputs have associated labels
  ✓ Color contrast: #1A1A1A on #FFDD00 = ~11:1 (WCAG AAA)
  ✓ Color contrast: #888 on #FFFFFF = 3.5:1 (passes AA for large text / UI components)
  ✓ iOS Safari: use audio/mp4 fallback (MediaRecorder.isTypeSupported check)
  ✓ Touch events work correctly (no hover-only interactions)
  ✓ Page does not require horizontal scrolling on any screen width ≥ 320px

PERFORMANCE:
  ✓ Images lazy-loaded (loading="lazy" on <img> tags)
  ✓ TaskCard wrapped in React.memo()
  ✓ No unnecessary re-renders (useCallback on handlers passed to child components)
  ✓ Supabase queries use .select() with only needed columns where possible

BROWSER SUPPORT:
  ✓ Chrome (latest)
  ✓ Safari iOS (latest)
  ✓ Firefox (latest)
  ✓ Samsung Internet (latest)
  ✓ Edge (latest)

SUPABASE RULES:
  ✓ Never expose service role key in frontend code
  ✓ Always use anon key in VITE_ env vars
  ✓ RLS policies must be in place before going to production

ZOHO CLIQ RULES:
  ✓ Notification failures must not block task creation
  ✓ Wrap sendCliqAlert() in .catch(() => {}) — it is fire-and-forget
  ✓ Do not show error toast if only the notification failed

═══════════════════════════════════════════════════════════════
END OF PROMPT — BUILD THE COMPLETE APP NOW
═══════════════════════════════════════════════════════════════
