import { WebSocketServer } from "ws";
import { createServer } from "http";
import prismadb from "@/lib/prismadb";
import dayjs from "dayjs";

const server = createServer();
const wss = new WebSocketServer({ server });

const clients = new Set<WebSocket>();

wss.on("connection", (ws: any) => {
  console.log("🔗 Cliente conectado");
  clients.add(ws);

  ws.on("close", () => {
    console.log("❌ Cliente desconectado");
    clients.delete(ws);
  });
});

// Función para notificar cuando una tarea expira
export function notifyDueTimeExpired(task: any) {
  const message = JSON.stringify({ type: "TASK_EXPIRED", task });
  clients.forEach((client) => client.send(message));
}

// Iniciar el servidor WebSocket en un puerto específico
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 WebSocket corriendo en wss://localhost:${PORT}`);
});
