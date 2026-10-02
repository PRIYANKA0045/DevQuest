# ⚔️ CodeQuest — Gamified Software Engineering & Algorithmic Learning Platform

[![React](https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

**CodeQuest** is a full-stack, gamified coding platform engineered to make mastering data structures, algorithms, system design, and SQL addictive and engaging. Built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS v4**, and **Express.js**, it bridges the gap between competitive programming platforms (like LeetCode) and habit-forming gamification apps (like Duolingo).

---

## 📖 Table of Contents

- [✨ Key Features](#-key-features)
  - [🎯 Daily Mission Widget & Time-Sensitive Quests](#1-🎯-daily-mission-widget--time-sensitive-quests)
  - [💻 Interactive Problem Workspace](#2-💻-interactive-problem-workspace)
  - [📝 40-Question Assessment & Quiz Engine](#3-📝-40-question-assessment--quiz-engine)
  - [🏆 3D Podium Developer Leaderboard](#4-🏆-3d-podium-developer-leaderboard)
  - [🗺️ Visual Learning Roadmap](#5-🗺️-visual-learning-roadmap)
  - [🔥 Activity Streak & Contribution Heatmap](#6-🔥-activity-streak--contribution-heatmap)
  - [🏅 Reactive Achievement & Trophy System](#7-🏅-reactive-achievement--trophy-system)
  - [👤 Clean-Slate Accounts & Instant Multi-Profile Switcher](#8-👤-clean-slate-accounts--instant-multi-profile-switcher)
- [🏗️ Project Architecture & Tech Stack](#️-project-architecture--tech-stack)
- [📁 Folder Structure](#-folder-structure)
- [🚀 Quick Start (Run Locally in VS Code)](#-quick-start-run-locally-in-vs-code)
- [🛠️ Available Scripts](#️-available-scripts)
- [🔌 API Endpoints](#-api-endpoints)
- [👥 Pre-Configured Demo Accounts](#-pre-configured-demo-accounts)
- [❓ FAQ & Troubleshooting](#-faq--troubleshooting)
- [📄 License](#-license)

---

## ✨ Key Features

### 1. 🎯 Daily Mission Widget & Time-Sensitive Quests
- **Live Midnight Countdown**: Real-time ticking timer (`Resets in: HH:MM:SS`) resetting missions every 24 hours.
- **2x XP Multipliers**: Urgent bonus multiplier indicator encouraging daily consistency.
- **Curated Quests**: Three rotating daily tasks — *Problem of the Day*, *SQL Speed Sprint*, and *DSA Blitz Quiz*.
- **Master Chest Unlocks**: Completing all 3 daily tasks unlocks the Daily Master Mystery Chest for +200 Bonus XP and streak protection.

### 2. 💻 Interactive Problem Workspace
- **Algorithmic & Database Challenges**: Rich catalog covering Arrays, Hash Maps, Linked Lists, Binary Search, Dynamic Programming, Heaps, and Relational SQL.
- **In-Browser Code Execution**: Interactive editor supporting JavaScript and Python with instant test case evaluation.
- **Detailed Complexity Analysis**: Displays $O(n)$ time complexity, space complexity, examples, edge cases, and expandable hints.

### 3. 📝 40-Question Assessment & Quiz Engine
- **5 Technical Domains**:
  1. *Algorithms & Data Structures* (Trees, Graphs, Sorting, Big-O, Heaps)
  2. *Frontend & React Architecture* (Reconciliation, Hooks, Closures, DOM, Performance)
  3. *Backend & REST APIs* (JWT, Middleware, WebSockets, Status Codes, Microservices)
  4. *SQL & Relational Databases* (JOINs, NULL logic, ACID transactions, Group By, Indexes)
  5. *Distributed System Design* (CAP theorem, Cache-Aside, Consistent Hashing, Sharding)
- **6 Diverse Question Formats**: Single choice, multiple-select, code-output prediction, bug-spotting, syntax completion, and conceptual analysis.
- **3 Dynamic Modes**: *Practice Mode*, *Timed Speed Run* (30s timer), and *Exam Mode* (10 random questions).

### 4. 🏆 3D Podium Developer Leaderboard
- **Top-3 Visual Podium**: Highlights the top 3 competitive developers with distinct badges and Bitmoji avatars.
- **Filtering Dimensions**: Toggle between *Global*, *Country*, *Friends*, and *Weekly* leaderboards.
- **Sticky Active User Row**: Shows your real standing in the global ranking even as a Level 1 newcomer.

### 5. 🗺️ Visual Learning Roadmap
- **Structured Milestones**: Tracks step-by-step progress from *Programming Basics* to *Control Flow*, *Data Structures*, *Algorithms*, and *Advanced Distributed Topics*.
- **Dynamic Node Progression**: Automatically reflects real solved problems with live percentage gauges.

### 6. 🔥 Activity Streak & Contribution Heatmap
- **Daily Streak Tracker**: Visual streak counter with claim bonus flows (+50 XP daily check-in).
- **GitHub-Style Contribution Grid**: 26-week activity heatmap reflecting real coding activity.
- **Calendar History**: Monthly calendar highlighting check-in days.

### 7. 🏅 Reactive Achievement & Trophy System
- **Strictly Data-Driven**: Badges unlock only when you hit actual milestones (e.g., *First Steps* at 1 solved problem, *Problem Solver* at 50, *Streak Master* at 7-day streak).
- **Filter Tabs**: Filter by *All*, *Unlocked*, and *Locked* trophies with real-time requirement progress trackers.

### 8. 👤 Clean-Slate Accounts & Instant Multi-Profile Switcher
- **True Zero Progress for New Users**: Registering a new email starts fresh with **0 XP**, **Level 1**, **0 Streak**, **0 Solved**, **0 Badges**, and **0% Roadmap**.
- **Instant Developer Switching**: Switch between saved high-level developers (*Alex Rivers*, *Sophie Martin*, *Ethan Vance*, etc.) in 1 click from the navbar or leaderboard.

---

## 🏗️ Project Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Bundler & Dev Server** | [Vite 6](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/) with dark mode cybernetic aesthetics |
| **Icons & Visuals** | [Lucide React](https://lucide.dev/) + Vector SVG illustrations |
| **Avatars** | [DiceBear Fun-Emoji / Cartoon Bitmoji Engine](https://www.dicebear.com/) |
| **Backend Runtime** | [Node.js](https://nodejs.org/) (ES Modules) + [Express.js](https://expressjs.com/) |
| **AI Integration** | [Google Gemini API](https://ai.google.dev/) via `@google/genai` (optional) |
| **Data Persistence** | Dual-layer persistence: In-memory mock database + reactive browser `localStorage` |

---

## 📁 Folder Structure

```
codequest/
├── backend/
│   ├── data/
│   │   └── mockDb.ts            # Quizzes, challenges, and mock developer data
│   ├── routes/
│   │   └── apiRoutes.ts         # REST API endpoints for problems, quizzes, users
│   └── server.ts                # Express backend configuration
├── frontend/
│   ├── public/                  # Static assets & icons
│   └── src/
│       ├── components/
│       │   ├── BitmojiAvatar.tsx       # DiceBear cartoon avatar generator
│       │   ├── DailyMissionWidget.tsx  # Time-sensitive countdown & missions
│       │   ├── Navbar.tsx              # Navigation bar & 1-click account switcher
│       │   ├── RocketIllustration.tsx  # Custom auth illustration
│       │   └── Sidebar.tsx             # Collapsible menu navigation
│       ├── data/
│       │   └── quizData.ts             # 40-question comprehensive quiz catalog
│       ├── lib/
│       │   ├── authStore.ts            # Reactive accounts, XP leveling, & local storage
│       │   └── avatar.ts               # DiceBear avatar seed builder
│       ├── pages/
│       │   ├── AchievementsPage.tsx    # Reactive trophy showcase
│       │   ├── ChallengePage.tsx       # In-browser IDE & code editor
│       │   ├── CoursesPage.tsx         # Problem bank & curriculum
│       │   ├── DashboardPage.tsx       # Welcome center & daily goals
│       │   ├── LeaderboardPage.tsx     # 3D podium & global rankings
│       │   ├── LoginPage.tsx           # Authentication & quick switch
│       │   ├── ProfilePage.tsx         # Developer portfolio & stats
│       │   ├── QuizzesPage.tsx         # Interactive quiz engine
│       │   ├── RoadmapPage.tsx         # CS foundations curriculum map
│       │   ├── SettingsPage.tsx        # Profile configuration
│       │   ├── SignupPage.tsx          # Clean-slate user registration
│       │   ├── StatsPage.tsx           # Performance & accuracy breakdown
│       │   └── StreakPage.tsx          # Activity heatmap & streak calendar
│       ├── App.tsx                     # Top-level routing & state coordination
│       ├── index.css                   # Tailwind CSS v4 styling rules
│       └── main.tsx                    # React client entry point
├── .env.example                         # Environment configuration template
├── package.json                         # Dependencies & npm scripts
├── README.md                            # Complete documentation
├── server.ts                            # Unified full-stack server entry point
├── tsconfig.json                        # TypeScript configuration
└── vite.config.ts                       # Vite build & bundler configuration
```

---

## 🚀 Quick Start (Run Locally in VS Code)

### 1. Prerequisites
Ensure you have **Node.js** (v18 or v20+ recommended) and **npm** installed:
```bash
node -v
npm -v
```

### 2. Clone or Extract the Project
```bash
git clone https://github.com/your-username/codequest.git
cd codequest
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Up Environment Variables (Optional)
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
*(On Windows Command Prompt: `copy .env.example .env`)*

You can optionally add a Gemini API Key to enable AI coding hints:
```env
PORT=3000
GEMINI_API_KEY="your_optional_gemini_api_key"
```
*(Note: CodeQuest runs 100% locally with all problems, tests, streaks, and quizzes functional even without an API key!)*

### 5. Launch the Development Server
```bash
npm run dev
```

You will see:
```
🚀 CodeQuest server is running successfully!
   ➜ Local:   http://localhost:3000
   ➜ Network: http://127.0.0.1:3000
```

### 6. Open in Browser
Open your browser and navigate to:
```
http://localhost:3000
```

> ⚠️ **Important Note for Windows / Google Chrome**:  
> Always use **`http://localhost:3000`** (or `http://127.0.0.1:3000`).  
> **Do not** type `http://0.0.0.0:3000` into Chrome, as `0.0.0.0` is an internal server bind address and Chrome will block it with `ERR_ADDRESS_INVALID`.

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| **`npm run dev`** | Starts the unified Express backend + Vite dev server on port 3000 with HMR. |
| **`npm run build`** | Generates an optimized production build of the React app and bundles `server.ts`. |
| **`npm start`** | Runs the production-compiled server from `dist/server.cjs`. |
| **`npm run lint`** | Runs TypeScript type checking (`tsc --noEmit`) to verify zero compiler errors. |

---

## 🔌 API Endpoints

The built-in Express backend provides RESTful endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Returns server health status and API uptime |
| `GET` | `/api/quizzes` | Retrieves the list of technical quiz questions |
| `GET` | `/api/problems` | Retrieves all coding and database problems |
| `POST` | `/api/auth/login` | Authenticates or registers a user email |

---

## 👥 Pre-Configured Demo Accounts

For testing, several accounts with distinct progression levels are pre-configured:

| Developer | Email | Level | XP | Focus Area |
| :--- | :--- | :--- | :--- | :--- |
| **Alex Rivers** | `alex.rivers@codequest.dev` | Level 4 | 4,850 XP | Algorithms & Python |
| **Sophie Martin** | `sophie.martin@codequest.dev` | Level 3 | 1,660 XP | Frontend & TypeScript |
| **Ethan Vance** | `ethan.vance@codequest.dev` | Level 2 | 1,035 XP | SQL Databases & C++ |
| **John Builder** | `john.builder@codequest.dev` | Level 2 | 920 XP | Full Stack & Go |
| **Anna Tech** | `anna.tech@codequest.dev` | Level 2 | 860 XP | React & CSS |
| **✨ Clean Slate User** | *Any new email (e.g. `you@codequest.dev`)* | **Level 1** | **0 XP** | **Clean 0% starting slate** |

*(You can switch accounts instantly using the top-right profile dropdown in the navigation bar!)*

---

## ❓ FAQ & Troubleshooting

### Q: Why do I see `ERR_ADDRESS_INVALID` when opening the app?
**A:** You typed `0.0.0.0:3000` into your browser. In networking, `0.0.0.0` is an address used by servers to listen on all interfaces. Browsers on Windows/macOS require **`http://localhost:3000`** or **`http://127.0.0.1:3000`**.

### Q: Does a newly registered user have any pre-existing progress?
**A:** No. All newly registered users begin with a genuine clean slate: **Level 1, 0 XP, 0 streak, 0 solved problems, 0 badges, and 0% roadmap progress**.

### Q: How do I test the platform with sample progress?
**A:** Click on the profile badge in the top-right corner of the navbar or visit the **Leaderboard** page. Click on any developer (e.g., *Alex* or *Sophie*) to switch to their account and experience their stats, solved challenges, and streak history.

### Q: What if port 3000 is already in use?
**A:** Change `PORT=3001` in your `.env` file or stop the existing process using port 3000:
- Windows: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
- macOS/Linux: `lsof -i :3000` then `kill -9 <PID>`

---

## 📄 License

This project is licensed under the **MIT License** — you are free to use, modify, and distribute this software for personal and commercial projects.
