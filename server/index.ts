import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Define o caminho da pasta public de forma robusta
  const staticPath = process.env.NODE_ENV === "production"
    ? path.join(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

  console.log(`[Server] Serving static files from: ${staticPath}`);

  // Serve arquivos estáticos (CSS, JS, Imagens)
  app.use(express.static(staticPath));

  // Middleware para lidar com o roteamento do React (SPA)
  // Qualquer rota que não for um arquivo estático retornará o index.html
  app.get("*", (req, res) => {
    // Evita loop infinito se o index.html não existir
    res.sendFile(path.join(staticPath, "index.html"), (err) => {
      if (err) {
        res.status(404).send("Erro: index.html não encontrado na pasta " + staticPath);
      }
    });
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`[Server] Rodando em http://localhost:${port}/`);
  });
}

startServer().catch((err) => {
  console.error("[Server] Erro ao iniciar:", err);
});
