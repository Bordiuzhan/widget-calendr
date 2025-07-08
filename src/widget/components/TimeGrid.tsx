import './TimeGrid.css';
import { useEffect, useState } from 'react';
import { Slot } from '../../types/calendar';
import { generateSlots } from '../../utils/date';
import SlotCellTime from './SlotCellTime';

type TimeGridProps = {
  date: Date; // Дата для відображення слоту
};

/** 08:00 → 19:30 з кроком 30 хв */
const TIME_STEPS = (() => {
  const times: string[] = [];
  for (let h = 8; h < 20; h++) {
    times.push(`${String(h).padStart(2, '0')}:00`);
    times.push(`${String(h).padStart(2, '0')}:30`);
  }
  return times;
})();

export default function TimeGrid({ date }: TimeGridProps) {
  /* ───── генеруємо слоти для одного дня ───── */
  const [slots, setSlots] = useState<Slot[]>(() =>
    generateSlots([date], TIME_STEPS),
  );

  /* при зміні дня – перегенеруємо */
  useEffect(() => {
    setSlots(generateSlots([date], TIME_STEPS));
  }, [date]);
  console.log('TimeGrid {slots}:', slots);

  /* toggle «free / selected» */
  const toggle = (slot: Slot) => {
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
    <div className='day-grid-scroll'>
      {TIME_STEPS.map((t) => {
        const [hours, minutes] = t.split(':').map(Number);
        const slot = slots.find(
          (s) => s.date.getHours() === hours && s.date.getMinutes() === minutes,
        );
        if (!slot) return null;

        return (
          <SlotCellTime
            key={slot.date.toISOString()}
            slot={slot}
            onClick={toggle}
          />
        );
      })}
    </div>
  );
}
