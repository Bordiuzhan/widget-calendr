import { useState, useMemo, useEffect } from 'react';
import './WeeklyCalendar.css';
import { Slot } from '../../types/calendar';
import { generateSlots, getWeekDates } from '../../utils/date';
import TimeGrid from './TimeGrid';
import { addDays, startOfWeek } from 'date-fns';
import WeekNav from './WeekNav';

export default function WeeklyCalendar() {
  const [baseDate, setBaseDate] = useState(
    () => startOfWeek(new Date(), { weekStartsOn: 0 }), // Починаємо з поточного тижня, неділя
  );

  // Отримуємо дати тижня, починаючи з baseDate або поточної дати
  // Використовуємо useMemo для оптимізації, щоб не перераховувати
  const week = useMemo(() => getWeekDates(baseDate ?? new Date()), [baseDate]);
  // Генеруємо часи для кожного слоту
  // Використовуємо useMemo для оптимізації, щоб не перераховувати
  // Починаємо з 8:00 і закінчуємо на 20:00 з кроком 30 хвилин
  // Формат часу - HH:MM
  const times = useMemo(() => {
    const startHour = 8;
    const endHour = 20;
    const stepMin = 30;

    const total = ((endHour - startHour) * 60) / stepMin;

    return Array.from({ length: total }, (_, idx) => {
      const minsFromStart = idx * stepMin;
      const hours = startHour + Math.floor(minsFromStart / 60);
      const mins = minsFromStart % 60;
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    });
  }, []);
  // Генеруємо слоти для кожного дня тижня
  const [slots, setSlots] = useState<Slot[]>(() => generateSlots(week, times));
  // Використовуємо useEffect для оновлення слотів при зміні тижня або часів
  useEffect(() => setSlots(generateSlots(week, times)), [week, times]);

  const prevWeek = () => setBaseDate((d) => addDays(d, -7));
  const nextWeek = () => setBaseDate((d) => addDays(d, 7));

  // Функція для перемикання статусу слоту
  // Якщо слот заброньований, нічого не робимо
  // Якщо слот вільний, то змінюємо його статус на "selected"
  // Якщо слот вже вибраний, то змінюємо його статус на "free
  const toggleSlot = (slot: Slot) => {
    if (slot.status === 'booked') return;
    setSlots((prev) =>
      prev.map((s) =>
        s.date.getTime() === slot.date.getTime()
          ? { ...s, status: s.status === 'selected' ? 'free' : 'selected' }
          : s,
      ),
    );
  };

  return (
    <div className='weekly-cal'>
      <WeekNav baseDate={baseDate} onPrev={prevWeek} onNext={nextWeek} />
      <TimeGrid week={week} times={times} slots={slots} onSelect={toggleSlot} />
    </div>
  );
}
