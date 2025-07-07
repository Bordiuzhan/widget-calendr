import React from 'react';
import SlotCell from './SlotCell';
import { Slot } from '../../types/calendar';

type TimeGridProps = {
  week: Date[];
  times: string[];
  slots: Slot[];
  onSelect: (slot: Slot) => void;
};

export default function TimeGrid(props: TimeGridProps) {
  const { week, times, slots, onSelect } = props;
  return (
    <div className='grid'>
      <div className='grid-head'>
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

      <div className='grid-body'>
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
                <SlotCell
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
  );
}
