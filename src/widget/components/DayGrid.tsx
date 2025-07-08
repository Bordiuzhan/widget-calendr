import React, { useEffect, useMemo, useState } from 'react';
import './DayGrid.css';
import { Slot } from '../../types/calendar';
import { generateSlots, getWeekDates } from '../../utils/date';
import SlotCellTime from './SlotCellTime';

type DayGridProps = {
  baseDate?: Date;
};

export default function DayGrid(props: DayGridProps) {
  const { baseDate } = props;
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
  console.log('DayGrid {times}:', times);

  // Генеруємо слоти для кожного дня тижня
  const [slots, setSlots] = useState<Slot[]>(() => generateSlots(week, times));
  // Використовуємо useEffect для оновлення слотів при зміні тижня або часів
  useEffect(() => setSlots(generateSlots(week, times)), [week, times]);

  const onSelect = (slot: Slot) => {
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
    <div className='grid'>
      <div className='grid-head-day'>
        {week.map((d) => (
          <div key={d.toISOString()} className='head-cell'>
            {d.toLocaleDateString('en-GB', {
              weekday: 'short',
              day: '2-digit',
              month: '2-digit',
            })}
          </div>
        ))}
      </div>

      <div className='grid-scroll'>
        <div className='grid-body-day'>
          {times.map((t) => (
            <React.Fragment key={t}>
              {week.map((d) => {
                const slot = slots.find(
                  (s) =>
                    s.date.getHours() === Number(t.slice(0, 2)) &&
                    s.date.getMinutes() === Number(t.slice(3)) &&
                    s.date.toDateString() === d.toDateString(),
                )!;
                if (!slot) {
                  console.warn(
                    `No slot found for time ${t} on ${d.toDateString()}`,
                  );
                  return null;
                }
                return (
                  <SlotCellTime
                    key={slot.date.toISOString()}
                    slot={slot}
                    onClick={onSelect}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
