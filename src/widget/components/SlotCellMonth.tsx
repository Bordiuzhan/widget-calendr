import './SlotCellMonth.css';
import { Day } from '../../types/calendar';

interface SlotCellMonthProps {
  d: Day;
  isSelected?: boolean;
  selectedDate: Day[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Day[]>>;
  isFirstInRange?: boolean;
  isLastInRange?: boolean;
}

export default function SlotCellMonth(props: SlotCellMonthProps) {
  const {
    d,
    isSelected,
    setSelectedDate,
    selectedDate,
    isFirstInRange,
    isLastInRange,
  } = props;
  return (
    <div
      key={d.date.toISOString()}
      className={`day cell-month ${isSelected ? 'selected' : ''} ${isFirstInRange ? 'rounded-left' : ''} ${isLastInRange ? 'rounded-right' : ''}`}
    >
      <button
        type='button'
        className='cell-content'
        onClick={() => {
          if (
            selectedDate.some(
              (date) => date.date.getDate() === d.date.getDate(),
            )
          ) {
            setSelectedDate(
              selectedDate.filter(
                (date) => date.date.getDate() !== d.date.getDate(),
              ),
            );
          } else {
            setSelectedDate([...selectedDate, d]);
          }
        }}
      >
        <p className='cell-date'>{d.date.getDate()}</p>
        <p className='cell-price'>${d.price} / hora</p>
      </button>
    </div>
  );
}
