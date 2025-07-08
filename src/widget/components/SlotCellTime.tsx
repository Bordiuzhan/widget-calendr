import './SlotCellTime.css';
import { Slot } from '../../types/calendar';

type SlotCellTimeProps = {
  slot: Slot;
  onClick: (slot: Slot) => void;
};

export default function SlotCellTime({ slot, onClick }: SlotCellTimeProps) {
  const { status, price } = slot;
  const [time, ampm] = slot.date
    .toLocaleTimeString('en-US', {
      hour: 'numeric', // 8, 9, 10…
      minute: '2-digit', // 00, 30
      hour12: true, // увімкнути AM/PM
    })
    .split(' ');
  return (
    <div className={`cell-day ${status}`}>
      <button
        type='button'
        className='cell-content'
        onClick={() => onClick(slot)}
        disabled={status === 'booked'}
      >
        <span className='slot-time'>
          {time}
          <sup className='slot-ampm'>{ampm}</sup>
        </span>
        <span className='slot-price'>${price.toFixed(2)}</span>
      </button>
    </div>
  );
}
