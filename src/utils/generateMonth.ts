import type { Day } from '../types/calendar.ts';

export default function generateMonth(year: number, month: number): Day[] {
  const result: Day[] = [];

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
  const endDayOfWeek = lastDayOfMonth.getDay();

  // Fill previous month's days
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    result.push({
      date,
      price: 0,
      label: 'prev',
    });
  }

  // Fill current month's days
  for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
    const date = new Date(year, month, d);
    result.push({
      date,
      price: 100,
    });
  }

  // Fill next month's days
  const nextDays = 6 - endDayOfWeek;
  for (let i = 1; i <= nextDays; i++) {
    const date = new Date(year, month + 1, i);
    result.push({
      date,
      price: 120,
      label: 'next',
    });
  }

  return result;
}
