import dayjs from "dayjs";
import prismadb from "./src/lib/prismadb";

async function checkDueTasks() {
  const now = dayjs().toISOString();

  const expiredTasks = await prismadb.task.findMany({
    where: {
      dueTime: { lt: now },
      notified: false,
    },
  });

  if (expiredTasks.length > 0) {
    const { notifyDueTimeExpired } = await import("./server.js");
    for (const task of expiredTasks) {
      const notification = await prismadb.notification.create({
        data: {
          message: `Tarea ${task.id} vencida el ${task.dueTime.toISOString()}`,
          userId: "Cristian",
          taskId: task.id,
        },
      });

      await prismadb.task.update({
        where: { id: task.id },
        data: { notified: true },
      });

      notifyDueTimeExpired(notification, task);
    }
  }
}

// Revisar tareas cada 30 segundos
setInterval(checkDueTasks, 30000);

console.log("🔎 Revisión de dueTime activa cada 30 segundos.");
