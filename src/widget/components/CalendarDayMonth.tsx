import { Day } from '../../types/calendar';

interface CalendarDayMonthProps {
  d: Day;
  isSelected?: boolean;
  selectedDate: Day[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Day[]>>;
  isFirstInRange?: boolean;
  isLastInRange?: boolean;
}

export default function CalendarDayMonth(props: CalendarDayMonthProps) {
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
      className={`day cell ${isSelected ? 'selected' : ''} ${isFirstInRange ? 'rounded-left' : ''} ${isLastInRange ? 'rounded-right' : ''}`}
    >
      <div
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
      </div>
    </div>
  );
}
