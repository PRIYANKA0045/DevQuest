# CodeQuest - Gamified Software Engineering Learning Platform

A full-stack interactive coding platform built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS v4**, and **Express.js**.

---

## 🚀 Quick Start in VS Code

### 1. Prerequisites
Make sure you have **Node.js** (version 18 or 20+ recommended) and **npm** installed on your system.
Verify in your terminal:
```bash
node -v
npm -v
```

---

### 2. Open the Project in VS Code
1. Open **Visual Studio Code**.
2. Go to **File > Open Folder...** and select the root directory of this project (`codequest` or repository folder).
3. Open an integrated terminal in VS Code:
   - Shortcut: `` Ctrl + ` `` (Windows/Linux) or `` Cmd + ` `` (macOS)
   - Or click **Terminal > New Terminal** in the top menu.

---

### 3. Install Dependencies
In the VS Code terminal, install all required packages:
```bash
npm install
```

---

### 4. Configure Environment Variables (Optional for AI features)
Copy the provided `.env.example` file to `.env`:
```bash
cp .env.example .env
```
*(On Windows Command Prompt: `copy .env.example .env`)*

- Open `.env` and add your **Google Gemini API Key** if you wish to use the embedded AI mentor / code review features:
  ```env
  GEMINI_API_KEY="your_actual_gemini_api_key_here"
  PORT=3000
  ```
*(Note: Core platform features, quizzes, coding problems, streaks, leaderboards, and daily missions run 100% locally even without an API key!)*

---

### 5. Run the Local Development Server
Start the full-stack server (Express backend + Vite frontend):
```bash
npm run dev
```

You will see output in the terminal:
```
🚀 CodeQuest backend server running on http://0.0.0.0:3000
```

---

### 6. Open in Browser
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🛠 Available Scripts

- **`npm run dev`**: Starts the combined Express backend and Vite development server on port 3000 with hot reload.
- **`npm run build`**: Compiles the React frontend via Vite and bundles the Node.js server with esbuild into `dist/`.
- **`npm start`**: Runs the compiled production build from `dist/server.cjs`.
- **`npm run lint`**: Checks TypeScript types and verifies no syntax or compilation issues (`tsc --noEmit`).

---

## 💡 Recommended VS Code Extensions

For the best developer experience, install these free VS Code extensions from the Marketplace:
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) - Auto-completion for Tailwind utility classes.
- **Prettier - Code formatter** (`esbenp.prettier-vscode`) - Automatic code formatting on save.
- **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`) - Handy React component snippets.

---

## ❓ Troubleshooting

- **Port 3000 already in use**:
  If another application is using port 3000, you can either terminate that process or set `PORT=3001` in your `.env` file.
  - Windows: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
  - macOS/Linux: `lsof -i :3000` then `kill -9 <PID>`
- **Node Modules cache error**:
  If you run into module resolution issues, clean and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
