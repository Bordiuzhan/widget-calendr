/**
 * Повертає номер тижня (1-based) для дати date.
 * При startOnMonday = true рахуємо тижні з Пн, інакше з Нд
 */
export function getWeekNumberInMonth(
  date: Date,
  startOnMonday = false,
): number {
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const offset = startOnMonday
    ? (firstOfMonth.getDay() + 6) % 7
    : firstOfMonth.getDay(); // зсув
  return Math.ceil((date.getDate() + offset) / 7);
}
