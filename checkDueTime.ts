import { notifyDueTimeExpired } from "./server";
import dayjs from "dayjs";
import prismadb from "@/lib/prismadb";

async function checkDueTasks() {
  const now = dayjs().toISOString();

  // Buscar tareas cuyo dueTime ya haya pasado
  const expiredTasks = await prismadb.task.findMany({
    where: {
      dueTime: { lt: now },
      notified: false, // Para evitar notificar la misma tarea varias veces
    },
  });

  for (const task of expiredTasks) {
    notifyDueTimeExpired(task); // Enviar notificación al WebSocket

    // Marcar la tarea como notificada para no enviarla de nuevo
    await prismadb.task.update({
      where: { id: task.id },
      data: { notified: true },
    });
  }
}

// Revisar tareas cada 30 segundos
setInterval(checkDueTasks, 30000);

console.log("🔎 Revisión de dueTime activa cada 30 segundos.");
