import { WebSocketServer, WebSocket } from "ws";
import { createServer, Server } from "http";
import "./checkDueTime.js";
import { AppNotification } from "@/interfaces/notification.js";

type Task = { id: number; notified: boolean; dueTime: Date };

const server: Server = createServer();
const wss = new WebSocketServer({ server });

const clients: Set<WebSocket> = new Set();

wss.on("connection", (ws: WebSocket) => {
  console.log("🔗 Cliente conectado");
  clients.add(ws);

  ws.on("close", () => {
    console.log("❌ Cliente desconectado");
    clients.delete(ws);
  });
});

export function notifyDueTimeExpired(
  notification: AppNotification,
  task: Task
): void {
  const message = JSON.stringify({ type: "NOTIFICATION", notification, task });

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

const PORT: number = Number(process.env.PORT) || 3001;
server.listen(PORT, () => {
  console.log(`🚀 WebSocket corriendo en ws://localhost:${PORT}`);
});

console.log("⚡ Servidor iniciado correctamente, preparando intervalos...");
