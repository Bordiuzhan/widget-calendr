import './MonthGrid.css';
import { Day } from '../../types/calendar';
import SlotCellMonth from './SlotCellMonth';

interface MonthGridProps {
  days: Day[];
  dayNames: string[];
  selectedDate: Day[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Day[]>>;
}

export default function MonthGrid(props: MonthGridProps) {
  const { days, dayNames, selectedDate, setSelectedDate } = props;

  const sortedSelectedDate = selectedDate.sort((a, b) => {
    const fullDateA = new Date(
      a.date.getFullYear(),
      a.date.getMonth(),
      a.date.getDate(),
    );
    const fullDateB = new Date(
      b.date.getFullYear(),
      b.date.getMonth(),
      b.date.getDate(),
    );
    return fullDateA.getTime() - fullDateB.getTime();
  });

  const isFirstInRange = (d: Day) => {
    return (
      sortedSelectedDate.length > 0 &&
      d.date.getDate() === sortedSelectedDate[0].date.getDate()
    );
  };
  const isLastInRange = (d: Day) => {
    return (
      sortedSelectedDate.length > 0 &&
      d.date.getDate() ===
        sortedSelectedDate[sortedSelectedDate.length - 1].date.getDate()
    );
  };
  return (
    <div className='calendar-body'>
      <div className='grid-head'>
        {dayNames.map((d) => (
          <div key={d} className='day-name'>
            {d}
          </div>
        ))}
      </div>
      <div className='grid-body'>
        {days.map((d) => {
          const isSelected = selectedDate.some((date) => {
            return (
              date.date.getDate() === d.date.getDate() &&
              date.date.getMonth() === d.date.getMonth() &&
              date.date.getFullYear() === d.date.getFullYear()
            );
          });
          if (isSelected) {
            console.log(`Selected date: ${d.date.toDateString()}`);
          }

          return (
            <SlotCellMonth
              key={d.date.toISOString()}
              d={d}
              isSelected={isSelected}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              isFirstInRange={!!isFirstInRange(d)}
              isLastInRange={!!isLastInRange(d)}
            />
          );
        })}
      </div>
    </div>
  );
}
