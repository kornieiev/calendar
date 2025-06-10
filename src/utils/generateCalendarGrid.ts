import type { DayCell } from "../types/index";

export function generateCalendarGrid(year: number, month: number): DayCell[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const result: DayCell[] = [];

  // 1. Предыдущий месяц
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

  // Пустые ячейки до первого числа месяца
  const prevEmptyCells = firstDayOfMonth;
  for (let i = 0; i < prevEmptyCells; i++) {
    const day = daysInPrevMonth - prevEmptyCells + i + 1;
    const paddedMonth = String(prevMonth + 1).padStart(2, "0");
    const paddedDay = String(day).padStart(2, "0");
    const date = `${prevMonthYear}-${paddedMonth}-${paddedDay}`;
    const monthShort = new Date(prevMonthYear, prevMonth, day).toLocaleString(
      "en",
      { month: "short" }
    );
    const label = `${paddedDay} ${monthShort}`;
    result.push({ day, date, label, isCurrentMonth: false });
  }

  // 2. Текущий месяц
  for (let day = 1; day <= daysInMonth; day++) {
    const paddedMonth = String(month + 1).padStart(2, "0");
    const paddedDay = String(day).padStart(2, "0");
    const date = `${year}-${paddedMonth}-${paddedDay}`;
    const monthShort = new Date(year, month, day).toLocaleString("en", {
      month: "short",
    });
    const label = `${paddedDay} ${monthShort}`;
    result.push({ day, date, label, isCurrentMonth: true });
  }

  // 3. Следующий месяц
  // Сколько еще ячеек нужно до конца строки
  let nextDays = 0;
  while ((result.length + nextDays) % 7 !== 0) {
    nextDays++;
  }
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;
  for (let i = 1; i <= nextDays; i++) {
    const paddedMonth = String(nextMonth + 1).padStart(2, "0");
    const paddedDay = String(i).padStart(2, "0");
    const date = `${nextMonthYear}-${paddedMonth}-${paddedDay}`;
    const monthShort = new Date(nextMonthYear, nextMonth, i).toLocaleString(
      "en",
      { month: "short" }
    );
    const label = `${paddedDay} ${monthShort}`;
    result.push({ day: i, date, label, isCurrentMonth: false });
  }

  // 4. Добавляем еще одну строку из 7 ячеек следующего месяца
  const lastDay = nextDays;
  for (let i = 1; i <= 7; i++) {
    const day = lastDay + i;
    const paddedMonth = String(nextMonth + 1).padStart(2, "0");
    const paddedDay = String(day).padStart(2, "0");
    const date = `${nextMonthYear}-${paddedMonth}-${paddedDay}`;
    const monthShort = new Date(nextMonthYear, nextMonth, day).toLocaleString(
      "en",
      { month: "short" }
    );
    const label = `${paddedDay} ${monthShort}`;
    result.push({ day, date, label, isCurrentMonth: false });
  }

  return result;
}
