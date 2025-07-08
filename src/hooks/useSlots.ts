// hooks/useSlots.ts
import { useEffect, useState } from 'react';
import { Slot } from '../types/calendar';
import { generateSlots } from '../utils/date';

export function useSlots(dates: Date[], times: string[]) {
  const [slots, setSlots] = useState<Slot[]>(() => generateSlots(dates, times));

  /* регенерація при зміні дат або списку часів */
  useEffect(() => {
    setSlots(generateSlots(dates, times));
  }, [dates, times]);

  /* toggle free / selected */
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

  return { slots, toggle };
}
