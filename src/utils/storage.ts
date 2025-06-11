import type { Task } from "../types";

export function loadTasks(): Task[] {
  const saved = localStorage.getItem("calendar_tasks");
  return saved ? JSON.parse(saved) : [];
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem("calendar_tasks", JSON.stringify(tasks));
}
