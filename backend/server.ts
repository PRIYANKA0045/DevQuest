import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import apiRoutes from "./routes/apiRoutes";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Mount API router
app.use('/api', apiRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "CodeQuest Learning Platform",
    time: new Date().toISOString(),
    version: "2.5.0"
  });
});

export async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 CodeQuest backend server running on http://0.0.0.0:${PORT}`);
  });
}

// Auto-start if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export default app;
