PROJECT: Task Assignment & Alert App
Stack: React + Vite, TailwindCSS, Supabase, Web Speech API / Whisper, Zoho Cliq Webhooks
Design: Mobile-first, max-width 480px centered, Inter font
Palette: Primary #FFDD00 (yellow) | Tertiary #1A1A1A (black) | Background #FFFFFF | Surface #F5F5F5 | Muted #888888 | Error #E24B4A

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 1 — LOGIN  (/login)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LAYOUT
- Full white screen, no app bar, single centered column, max-width 480px, padding 28px
- Vertically centered on the viewport

ELEMENTS (top to bottom)
1. Logo mark
   - 52×52px square, bg #FFDD00, border-radius 12px
   - Inside: 2×2 grid of 4 small black squares (17×17px each, radius 3px, gap 6px)
   - Bottom-right square: opacity 0.25
   - Margin bottom: 28px

2. Heading: "Welcome back"
   - font-size 28px, font-weight 500, color #1A1A1A
   - Margin bottom: 6px

3. Subheading: "Sign in to your workspace"
   - font-size 14px, color #888888
   - Margin bottom: 32px

4. Email field
   - Label: "EMAIL" — 10px, uppercase, letter-spacing 0.6px, color #1A1A1A, weight 500
   - Input: bg #F5F5F5, border none, radius 10px, padding 14px 16px, font-size 14px
   - Placeholder: "admin@company.com"
   - Margin bottom: 16px

5. Password field
   - Label: "PASSWORD" — same label style
   - Input: same style, type="password"
   - Margin bottom: 24px

6. Sign in button
   - Full width, height 52px, bg #1A1A1A, radius 12px
   - Text: "Sign in", 15px, weight 500, color #FFDD00
   - Loading state: show 20px spinning circle (stroke #FFDD00) replacing text
   - Disabled during loading: opacity 0.7, cursor not-allowed

7. Forgot password link
   - "Forgot password?" — 12px, color #888888, centered, margin-top 16px

BEHAVIOUR
- On submit: call Supabase signInWithPassword({ email, password })
- On success: navigate to /dashboard with a smooth fade transition
- On error: show inline red error text below the password field
- If already logged in (session exists on mount): auto-redirect to /dashboard
- Route guard: this page redirects to /dashboard if user is authenticated

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 2 — DASHBOARD  (/dashboard)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LAYOUT
- White background, full height, single column, max-width 480px centered
- Scrollable content area between app bar and bottom FAB

APP BAR (sticky top)
- Background: #FFDD00, padding 16px 20px, height 72px
- Left: greeting text
  - Line 1: "Good morning" (or afternoon/evening based on time), 16px, weight 500, #1A1A1A
  - Line 2: "{N} tasks due today" — 12px, color #7A6A00 (dark yellow), weight 400
- Right: circular avatar 40×40px, bg #1A1A1A, initials in #FFDD00 at 13px weight 500
  - Tap avatar: show dropdown with "Sign out" option

STATS STRIP (below app bar)
- 3 equal-width cards in a row, padding 14px 20px, gap 8px
- Card 1 (Total): bg #FFDD00, number in #1A1A1A, label "Total" in #7A6A00
- Card 2 (Active): bg #F5F5F5, number + label in #1A1A1A / #888888
- Card 3 (Done): bg #F5F5F5, number + label in #1A1A1A / #888888
- Each card: border-radius 10px, padding 10px, number 24px weight 500, label 10px

FILTER CHIPS (horizontal scroll, no scrollbar)
- Padding 0 20px, gap 8px, margin-top 12px
- Options: "All" | "Pending" | "In progress" | "Done"
- Active chip: bg #1A1A1A, text #FFDD00, radius 20px, padding 6px 14px, font-size 12px weight 500
- Inactive chip: bg #F5F5F5, text #888888, same sizing
- Tapping a chip filters the task list below (client-side filter, no reload)

SECTION LABEL
- "Tasks" — 11px, weight 500, color #888888, padding 12px 20px 4px

TASK CARDS (list, padding 0 20px, gap 10px)
Each card:
- bg #FFFFFF, border 0.5px solid #ECECEC, border-radius 12px, padding 12px 14px
- Overdue cards: left border 2.5px solid #E24B4A, border-radius 0 12px 12px 0

Card contents:
- Top row:
  - Left: task title — 13px, weight 500, #1A1A1A, flex:1, max 2 lines then ellipsis
  - Right: status dot 10×10px circle
    - Pending = #FFDD00
    - In progress = #1A1A1A
    - Done = #CCCCCC
- Bottom row (margin-top 6px):
  - Assignee tag pill: bg #1A1A1A, text #FFDD00, 10px weight 500, radius 4px, padding 2px 8px
  - Status pill:
    - Pending: bg #FFDD00, text #1A1A1A
    - In progress: bg #F5F5F5, text #888888
    - Done: bg #F5F5F5, text #888888
    - Overdue: bg #FCEBEB, text #A32D2D
  - Due date: 10px, color #BBBBBB, margin-left auto
- Overdue label (if overdue): "N days overdue" — 10px, color #E24B4A, weight 500, margin-top 4px

Tapping a card: navigate to /task/:id (Task Detail page) with slide-in-right transition

EMPTY STATE (when no tasks match filter)
- Centered illustration: 60×60px #F5F5F5 circle with a #CCCCCC clipboard SVG icon inside
- Text: "No tasks yet" — 14px, weight 500, #1A1A1A
- Subtext: "Tap + to create your first task" — 12px, #888888

FAB (floating action button)
- Position: absolute bottom-right, margin 24px from bottom, 24px from right
- Size: 56×56px circle, bg #1A1A1A, border-radius 50%
- Icon: white/yellow + symbol, 22px, stroke-width 2.5px
- On tap: navigate to /create with slide-up transition
- Hover/press: scale(1.08) with 150ms ease
- Add subtle entrance animation on page load: scale 0→1, opacity 0→1, 300ms ease-out with 200ms delay

BEHAVIOUR
- On mount: fetch all tasks from Supabase `tasks` table, order by created_at DESC
- Route guard: redirect to /login if no active session
- Stats numbers computed from fetched data
- Filter chips filter the in-memory task array
- Pull-to-refresh on mobile: re-fetches tasks from Supabase
- Show skeleton loaders (3 gray pulsing card placeholders) while data loads

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 3 — TASK DETAIL  (/task/:id)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LAYOUT
- White background, single column, max-width 480px
- Scrollable body below app bar

APP BAR
- Background: #FFDD00, height 64px, padding 0 16px
- Left: back button — 36×36px circle, bg #1A1A1A, left arrow icon in #FFDD00
  - On tap: navigate back to /dashboard with slide-out-right transition
- Center: "Task detail" — 16px, weight 500, #1A1A1A

BODY (padding 20px, gap between sections 20px)

Section pattern: label (9px uppercase, #888888, letter-spacing 0.5px) then value below

1. TITLE
   - Value: 17px, weight 500, #1A1A1A

2. DESCRIPTION
   - Value: 13px, #888888, line-height 1.6

3. ASSIGNED TO
   - Row layout: 26×26px avatar circle (bg #1A1A1A, initials #FFDD00) + name (14px weight 500) + subtitle "Notified via Zoho Cliq" (11px #888888)
   - Wrapped in: bg #F5F5F5, radius 10px, padding 10px 12px

4. DATES (two-column grid, gap 8px)
   - Each block: bg #F5F5F5, radius 10px, padding 10px 12px
   - Label: "ASSIGNED" / "DUE DATE" — 9px, #888888
   - Value: formatted date, 13px, weight 500, #1A1A1A
   - If no date set: show "—"

5. STATUS (inline tap-to-change selector)
   - Three equal-width chips in a row: "Pending" | "In progress" | "Done"
   - Active: bg #FFDD00 (Pending) or bg #1A1A1A (In progress) or bg #F5F5F5 (Done)
   - Active text: #1A1A1A / #FFDD00 / #888888 accordingly
   - Tapping a chip: optimistically updates UI + calls Supabase update on tasks table
   - Transition: 150ms background color swap

6. VOICE TRANSCRIPT (if exists)
   - Card: bg #1A1A1A, radius 12px, padding 12px 14px
   - Header row: 10×10px yellow circle dot + "Transcribed note" in #FFDD00 at 11px weight 500
   - Body: transcript text, 11px, color #777777, line-height 1.5

7. SCREENSHOT (if exists)
   - Full-width image, max-height 200px, object-fit cover, border-radius 10px
   - If no screenshot: show bg #F5F5F5, radius 10px, height 72px, centered text "No screenshot"

BEHAVIOUR
- On mount: fetch task by id from Supabase
- Status update calls: PATCH tasks SET status = '...' WHERE id = :id
- Route guard: redirect to /login if no active session

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 4 — CREATE TASK  (/create)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LAYOUT
- White background, single column, max-width 480px
- Scrollable form between app bar and submit button

APP BAR
- Background: #FFDD00, height 64px, padding 0 16px
- Left: "New task" — 16px, weight 500, #1A1A1A
- Right: close button — 36×36px circle, bg #1A1A1A, ✕ icon in #FFDD00
  - On tap: navigate back to /dashboard

FORM (padding 20px, gap 16px between fields)

Field label style: 9px, uppercase, letter-spacing 0.6px, weight 500, #1A1A1A, margin-bottom 4px
Input style: bg #F5F5F5, border none, radius 8px, padding 12px 14px, font-size 13px, color #1A1A1A
Focus style: 2px solid #FFDD00 ring (box-shadow: 0 0 0 2px #FFDD00), no outline

1. TASK TITLE (required)
   - Label: "TITLE *" (asterisk in #E24B4A)
   - Input: single line text
   - If empty on submit: red text below "Title is required", input ring turns red

2. DESCRIPTION
   - Label: "DESCRIPTION"
   - Textarea: 4 rows, resize none, same input style
   - Placeholder: "Add a description…"

3. ASSIGN TO
   - Label: "ASSIGN TO"
   - Horizontal chip selector (scrollable)
   - Chips: ["Alice", "Bob", "Carol", "Dev Team", "Marketing", "Operations"]
   - Active chip: bg #1A1A1A, text #FFDD00
   - Inactive chip: bg #F5F5F5, text #1A1A1A
   - One chip active at a time (radio behavior)
   - Also allow free-text input if scrolled past chips (show a small text field below)

4. DATES (two-column grid)
   - Labels: "ASSIGNED DATE" | "DUE DATE"
   - Inputs: type="date", same input style
   - Validate: due date must be >= assigned date

5. SCREENSHOT UPLOAD
   - Label: "SCREENSHOT"
   - Upload zone: bg #F5F5F5, radius 10px, height 72px, dashed border 1.5px #CCCCCC
   - Center content: camera icon SVG (20×20px, color #CCCCCC) + "Tap to upload" (11px #888888)
   - On file select: replace zone with full-width image preview, object-fit cover, radius 10px, max-height 180px
   - Top-right of preview: 24×24px circle remove button (bg #1A1A1A, ✕ in #FFDD00)
   - accept="image/*", capture="environment" for mobile camera

6. VOICE NOTE
   - Label: "VOICE NOTE"
   - Default state: 
     - Full-width row: bg #F5F5F5, radius 10px, padding 14px 16px
     - Left: microphone SVG icon (20×20px, #888888)
     - Text: "Tap to record" (13px, #888888)
   - Recording state:
     - Row bg: #1A1A1A
     - Left: pulsing 10px yellow circle (CSS keyframe: opacity 1→0.3→1, 1 second loop)
     - Text: "Recording…" (#FFDD00, 13px weight 500)
     - Right: elapsed timer "0:12" (#555555, 11px)
     - Stop button: 36×36px circle, bg #E24B4A, white square stop icon inside
   - Post-recording state:
     - Audio playback widget: native <audio controls> styled to match — bg #F5F5F5 full width
     - Below: textarea showing the transcript, label "VOICE TRANSCRIPT", editable
     - Transcription loading: show "Transcribing…" placeholder with pulsing opacity

7. SUBMIT BUTTON (sticky bottom, always visible)
   - Full width minus 40px total (20px each side), height 52px
   - Bg #FFDD00, radius 12px, text "Submit task" 15px weight 500 #1A1A1A
   - Loading state: spinner (20px rotating circle, stroke #1A1A1A) + "Submitting…" text
   - Disabled during submission: opacity 0.6, cursor not-allowed

SUBMISSION FLOW
1. Validate title (required)
2. Validate date range if both dates set
3. Show loading state on button
4. If screenshot selected: upload to Supabase Storage bucket "task-screenshots" → get public URL
5. If audio recorded: upload blob to Supabase Storage bucket "task-audio" → get public URL
6. INSERT into Supabase tasks table:
   { title, description, assigned_to, assigned_date, due_date,
     voice_transcript, audio_url, screenshot_url, status: 'pending', created_at: now() }
7. POST to Zoho Cliq webhook:
   - If assigned_to matches a team name: use that team's webhook URL
   - Else: use the default individual webhook URL
   - Payload: card with title, assigned_to, due_date, description, voice_transcript
8. On success: show toast "Task submitted!" (slides in from top, auto-dismiss 3s, bg #1A1A1A, text #FFDD00)
9. Reset form to blank state
10. On any error: show toast "Something went wrong. Try again." (bg #E24B4A, white text)
    Do NOT reset form on error

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLOBAL RULES (apply to all 4 pages)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NAVIGATION & TRANSITIONS
- Login → Dashboard: fade (opacity 0→1, 250ms)
- Dashboard → Task Detail: slide left (translateX 100%→0, 280ms ease-out)
- Task Detail → Dashboard: slide right (translateX 0→100%, 250ms ease-in)
- Dashboard → Create Task: slide up (translateY 100%→0, 300ms ease-out)
- Create Task → Dashboard: slide down (translateY 0→100%, 250ms ease-in)
- Use React Router v6 with location key for transition triggers

TOAST NOTIFICATIONS
- Slide in from top: translateY -60px→0, opacity 0→1, 250ms ease-out
- Auto dismiss after 3 seconds
- Success: bg #1A1A1A, text #FFDD00
- Error: bg #E24B4A, text #FFFFFF
- Max 1 toast at a time

TYPOGRAPHY
- Font: Inter (import from Google Fonts)
- Weights: 400 Regular, 500 Medium only
- All labels uppercase + letter-spacing 0.6px
- Body text: 13–14px, line-height 1.6

FORM ELEMENTS
- All inputs: bg #F5F5F5, no border, radius 8–10px
- Focus: box-shadow 0 0 0 2px #FFDD00
- Placeholder: #AAAAAA
- Error state: box-shadow 0 0 0 2px #E24B4A

TAP TARGETS
- Minimum 44×44px for all interactive elements
- Chips and pills: min-height 36px

LOADING / SKELETON
- Skeleton pulse animation: bg #F0F0F0 → #E0E0E0, keyframe 1.2s infinite
- Use for: task cards while loading, stats while loading

AUDIO RECORDING
- Use MediaRecorder API
- mimeType priority: 'audio/webm' → 'audio/mp4' (iOS fallback)
- Web Speech API for live transcription (SpeechRecognition)
- Whisper API fallback (POST to OpenAI) if SpeechRecognition unavailable
- VITE_OPENAI_API_KEY from env

ENVIRONMENT VARIABLES (.env.local)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_ZOHO_CLIQ_WEBHOOK_URL=
VITE_OPENAI_API_KEY=

SUPABASE TABLE: tasks
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
title           text NOT NULL
description     text
assigned_to     text
assigned_date   date
due_date        date
voice_transcript text
audio_url       text
screenshot_url  text
status          text DEFAULT 'pending'
created_at      timestamptz DEFAULT now()

STORAGE BUCKETS
- task-screenshots (public)
- task-audio (public)

ZOHO CLIQ WEBHOOK CONFIG  (src/config/webhooks.js)
export const webhooks = {
  default:    process.env.VITE_ZOHO_CLIQ_WEBHOOK_URL,
  "Dev Team": "YOUR_DEV_TEAM_WEBHOOK_URL",
  "Marketing":"YOUR_MARKETING_WEBHOOK_URL",
  "Operations":"YOUR_OPERATIONS_WEBHOOK_URL",
};

FILE STRUCTURE
src/
  pages/
    Login.jsx
    Dashboard.jsx
    TaskDetail.jsx
    CreateTask.jsx
  components/
    AppBar.jsx
    TaskCard.jsx
    FilterChips.jsx
    StatStrip.jsx
    VoiceRecorder.jsx
    ScreenshotUpload.jsx
    Toast.jsx
    SkeletonCard.jsx
    StatusSelector.jsx
  hooks/
    useAuth.js
    useTasks.js
    useTranscription.js
  config/
    supabase.js
    webhooks.js
  App.jsx
  main.jsx