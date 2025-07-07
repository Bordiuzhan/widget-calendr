import { Slot, SlotStatus } from '../types/calendar';

export function getWeekDates(anchor: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(anchor);
    d.setDate(anchor.getDate() + i);
    d.setHours(0, 0, 0, 0);
    return d;
  });
}

export function generateSlots(week: Date[], times: string[]): Slot[] {
  return week.flatMap((day) =>
    times.map((t) => {
      const [h, m] = t.split(':').map(Number);
      const date = new Date(day);
      date.setHours(h, m, 0, 0);
      return {
        date,
        price: 47.5,
        status: 'free' as SlotStatus,
      };
    }),
  );
}
