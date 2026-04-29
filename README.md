# Gen-AI Mentor Chat

A persona-based chatbot that lets you talk to three Scaler Academy mentors: **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**. The app uses Next.js, TypeScript, and Google Gemini, with each mentor carrying a different tone and focus.

## Highlights

- Switch between mentors without mixing conversation history
- Send the full thread to the backend for contextual replies
- Use quick-start suggestions to jump into a topic faster
- Handle loading, safety, and error states cleanly
- Responsive on desktop and mobile

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **AI**: Google Gemini API
- **Styling**: App-level CSS

## Setup

1. Install dependencies.

```bash
npm install
```

2. Create your local environment file.

```bash
copy .env.example .env.local
```

3. Add your Gemini API key.

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the app.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What the API Needs

You do not need a separate public API. The backend route talks to Google Gemini directly and only needs one secret:

- `GEMINI_API_KEY` in `.env.local`

The chat endpoint is `POST /api/chat`, and it expects:

```json
{
   "mentorId": "anshuman",
   "messages": [
      { "role": "user", "content": "Hi" },
      { "role": "assistant", "content": "Hello" },
      { "role": "user", "content": "How should I start learning product thinking?" }
   ]
}
```

The route returns:

```json
{ "message": "..." }
```

Behind the scenes, the app uses Gemini with mentor-specific system prompts, so the key thing you provide is the Gemini API key, not a custom model endpoint.

## Deployment

1. Push the repo to GitHub.
2. Import it in Vercel.
3. Add `GEMINI_API_KEY` in the Vercel environment settings.
4. Deploy.

## Project Structure

```
├── app/
│   ├── api/chat/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
├── prompts.md
└── reflection.md
```

## Personas

| Mentor | Focus |
|---|---|
| Anshuman Singh | Startup thinking, education vision, outcomes |
| Abhimanyu Saxena | DSA, system design, technical depth |
| Kshitij Mishra | Teaching, algorithms, interview prep |

## More Docs

- [`prompts.md`](./prompts.md) for the prompt design notes
- [`reflection.md`](./reflection.md) for the prompt engineering reflection
