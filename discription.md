
ROLE & GOAL
You are a senior full-stack developer. Build a mobile-first, web-based Task Assignment & Alert App using React (Vite) for the frontend, Supabase for the backend, the Web Speech API (or Whisper API) for audio transcription, and Zoho Cliq webhooks for notifications. The app should feel fast, clean, and usable in under one minute per task.

TECH STACK
- Frontend: React + Vite, TailwindCSS (mobile-first breakpoints)
- Backend / DB: Supabase (PostgreSQL + Storage + Auth)
- Transcription: Web Speech API (browser-native, fallback to OpenAI Whisper API)
- Notifications: Zoho Cliq Incoming Webhook
- Hosting: Vercel or Netlify (static export)

SUPABASE SCHEMA
Create a table called `tasks` with these columns:
- id: uuid, primary key, default gen_random_uuid()
- title: text, NOT NULL
- description: text, nullable
- assigned_to: text, nullable (person name or team name)
- assigned_date: date, nullable
- due_date: date, nullable
- voice_transcript: text, nullable
- audio_url: text, nullable (Supabase Storage public URL)
- screenshot_url: text, nullable (Supabase Storage public URL)
- status: text, default 'pending' (values: pending, in_progress, done)
- created_at: timestamptz, default now()

Create two Supabase Storage buckets:
- `task-audio` (public)
- `task-screenshots` (public)

AUTH
Implement a simple email/password login using Supabase Auth.
- Show a login screen first (/login route)
- After login, redirect to the task creation screen (/create)
- Protect the /create route (redirect to /login if not authenticated)
- Show the logged-in user's email in the header with a logout button

TASK CREATION FORM — /create
Build a single-page form with these fields in order:

1. Task Title (text input) — REQUIRED. Show a red asterisk. Block submission if empty.
2. Task Description (textarea, 4 rows) — optional
3. Assign To (searchable dropdown or text input with suggestions) — optional
   - Hardcode an initial list of people/teams: ["Alice", "Bob", "Carol", "Dev Team", "Marketing", "Operations"]
   - Allow free-text entry if the name is not in the list
4. Assigned Date (date picker) — optional
5. Due Date (date picker) — optional, must be >= Assigned Date if both are set
6. Screenshot Upload (file input, accept image/*) — optional
   - Show a thumbnail preview immediately after selection
7. Voice Note (audio recorder) — optional
   - Show a "Start Recording" button (microphone icon)
   - While recording: show a pulsing red indicator and a "Stop Recording" button
   - After stopping: show an audio playback widget