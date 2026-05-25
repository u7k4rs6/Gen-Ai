# Scaler Mentor Chat

> Chat with AI personas of Scaler Academy's founders and instructors — each with a distinct voice, focus, and teaching style.

Built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **Google Gemini 2.5 Flash**.

---

## Mentors

| Mentor | Role | Focus |
|---|---|---|
| **Anshuman Singh** | CEO & Co-founder, Scaler | Startup thinking, education vision, outcome-driven growth |
| **Abhimanyu Saxena** | Co-founder, Scaler / InterviewBit | DSA fundamentals, system design, FAANG prep |
| **Kshitij Mishra** | Instructor & Mentor, Scaler | Teaching algorithms, interview coaching, competitive programming |

Each mentor has a crafted system prompt that shapes their tone, knowledge depth, and response style — not just a name swap.

---

## Features

- Switch mentors mid-session without mixing conversation history
- Full thread sent to the backend for contextual, multi-turn replies
- Quick-start suggestions per mentor to jump into a topic immediately
- Graceful handling of loading, safety blocks, recitation flags, and errors
- Responsive layout for desktop and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| AI | Google Gemini 2.5 Flash |
| Deployment | Vercel |

---

## Getting Started

**1. Clone the repo**

```bash
git clone https://github.com/u7k4rs6/Gen-Ai.git
cd Gen-Ai
```

**2. Install dependencies**

```bash
npm install
```

**3. Add your Gemini API key**

Create `.env.local` in the project root:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Get a free key at [aistudio.google.com](https://aistudio.google.com).

**4. Run the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## API

The single backend route is `POST /api/chat`.

**Request**

```json
{
  "mentorId": "anshuman",
  "messages": [
    { "role": "user", "content": "How do you think about hiring?" }
  ]
}
```

`mentorId` must be one of: `anshuman`, `abhimanyu`, `kshitij`.  
`messages` is the full conversation history — the last message is sent to Gemini, the rest become chat history.

**Response**

```json
{ "message": "..." }
```

---

## Project Structure

```
├── app/
│   ├── api/chat/route.ts    # Gemini API handler
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ChatSession.tsx       # Main chat UI and state
│   ├── MentorSelector.tsx    # Mentor tab switcher
│   ├── MessageEntry.tsx      # Individual message bubble
│   └── StatusIndicator.tsx   # Typing indicator
├── lib/
│   └── mentors.ts            # Mentor configs and system prompts
├── prompts.md                # Prompt design notes
└── reflection.md             # Prompt engineering reflection
```

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add `GEMINI_API_KEY` under **Settings → Environment Variables**.
4. Deploy.

---

## Docs

- [`prompts.md`](./prompts.md) — prompt design rationale
- [`reflection.md`](./reflection.md) — prompt engineering reflection

---

Made by [u7k4rs6](https://github.com/u7k4rs6)
