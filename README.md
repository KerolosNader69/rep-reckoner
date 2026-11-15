<h1 align="center">Rep Reckoner</h1>

<p align="center">
  <strong>An AI fitness coach in your pocket</strong><br>
  <sub>Personalised workouts, an AI coach chat, nutrition and progress tracking</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-1d1d26?style=for-the-badge&logo=react&logoColor=FFD60A" alt="React" />
  <img src="https://img.shields.io/badge/Capacitor-1d1d26?style=for-the-badge&logo=capacitor&logoColor=FFD60A" alt="Capacitor" />
  <img src="https://img.shields.io/badge/Supabase-1d1d26?style=for-the-badge&logo=supabase&logoColor=FFD60A" alt="Supabase" />
  <img src="https://img.shields.io/badge/TypeScript-1d1d26?style=for-the-badge&logo=typescript&logoColor=FFD60A" alt="TypeScript" />
</p>

---

## The problem

Generic workout plans ignore the person doing them. Rep Reckoner adapts training to each user and answers fitness questions in plain language.

## Features

| Screen | What it does |
|:--|:--|
| Dashboard | Overview of the user's training |
| Workout recommendations | AI-generated plans from the user's profile and goals |
| AI Coach & Fitness Chat | Conversational coaching and Q&A |
| Exercises | Exercise library with detail pages and a workout guide |
| Workout log | Record sessions, sets and reps |
| Progress tracking | Charts of progress over time |
| Nutrition calculator | Daily nutrition estimates |
| Auth | Sign up and log in with Supabase Auth |

## How it works

- **Frontend:** React + TypeScript + Vite with Tailwind CSS and shadcn/ui components, React Router, TanStack Query and Recharts.
- **Mobile:** packaged for Android and iOS with Capacitor.
- **Backend:** Supabase for auth and data, plus three Supabase Edge Functions (`workout-recommendations`, `fitness-chatbot`, `fitness-ai-chat`) that call an LLM so API keys never reach the client.

## Project structure

```text
src/
  pages/           Dashboard, AiCoach, FitnessChat, Exercises, ExerciseDetail,
                   WorkoutLog, ProgressTracking, Login, SignUp
  components/      WorkoutRecommendations, WorkoutGuide, NutritionCalculator, ui/
  integrations/    Supabase client and generated types
supabase/
  functions/       workout-recommendations · fitness-chatbot · fitness-ai-chat
capacitor.config.ts
```

## Run locally

```bash
npm install
npm run dev          # web app with Vite
npm run build        # production build into dist/
npx cap sync         # copy the build into the Android / iOS projects
```

The Edge Functions read `OPENAI_API_KEY` from the Supabase project's secrets.

## Author

Built by **[Kerollos Nader](https://github.com/KerolosNader69)**.
