interface DayCell {
  day: number | null;
  date: string | null;
  label?: string;
  isCurrentMonth: boolean;
}

interface Task {
  id: string;
  text: string;
  date: string; // YYYY-MM-DD
  order: number;
  color?: string;
}

interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export type { DayCell, Task, Holiday };
