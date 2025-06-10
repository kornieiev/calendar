export interface DayCell {
  day: number | null;
  date: string | null;
  label?: string;
  isCurrentMonth: boolean;
}

interface Task {
  id: string;
  text: string;
  date: string; // YYYY-MM-DD
  order: number; // Порядок отображения в дне
}

export type { DayCell, Task };
