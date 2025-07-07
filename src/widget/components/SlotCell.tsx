import React from 'react';
import { Slot } from '../../types/calendar';

interface Props {
  slot: Slot;
  onClick: (slot: Slot) => void;
}

export default function SlotCell({ slot, onClick }: Props) {
  const { status, price } = slot;
  return (
    <button
      type='button'
      className={`slot-cell ${status}`}
      onClick={() => onClick(slot)}
      disabled={status === 'booked'}
    >
      <span className='slot-time'>
        {slot.date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
      <span className='slot-price'>${price.toFixed(2)}</span>
    </button>
  );
}
