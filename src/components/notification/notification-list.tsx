import { AppNotification } from "@/interfaces/notification";
import { useEffect, useState } from "react";

export function NotificationListDemo() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notification?count=${false}`);

        if (!response.ok) {
          console.error("Error fetching notifications");
          return;
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleTaskClick = (taskId: number) => {
    console.log("Redirigiendo a la tarea con ID:", taskId);
    // Aquí iría la lógica de navegación o manejo de la tarea
  };

  return (
    <div className="w-full  bg-white border rounded-lg shadow-md">
      <div className="p-4 border-b font-semibold text-lg text-gray-700">
        Notificaciones
      </div>
      <div className="divide-y">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start p-4 gap-3 ${
                notification.task ? "cursor-pointer hover:bg-gray-100" : ""
              }`}
              onClick={() =>
                notification.task && handleTaskClick(notification.task.id)
              }
            >
              {/* Ícono de la tarea si existe */}
              {notification.task && (
                <div
                  className="w-10 h-10 flex items-center justify-center text-xl font-semibold rounded-full"
                  style={{ backgroundColor: notification.task.color }}
                >
                  {notification.task.icon}
                </div>
              )}

              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
                <span className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>

                {/* Información de la tarea si existe */}
                {notification.task && (
                  <div className="mt-2 p-2 border rounded-md bg-gray-50">
                    <p className="text-sm font-semibold">
                      {notification.task.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {notification.task.description || "Sin descripción"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center p-4">
            No hay notificaciones
          </p>
        )}
      </div>
    </div>
  );
}
