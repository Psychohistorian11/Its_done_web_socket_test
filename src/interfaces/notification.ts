export interface AppNotification {
  id: string;
  message: string;
  createdAt: Date;
  read: boolean;
  userId: string;
  taskId?: number | null;
  task?: Task;
}

export interface Task {
  id: number;
  icon: string;
  name: string;
  color: string;
  description: string;
}
