import { Day } from '../../types/calendar';
import CalendarDayMonth from './CalendarDayMonth';

interface CalendarGridProps {
  days: Day[];
  dayNames: string[];
  selectedDate: Day[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Day[]>>;
}

export default function CalendarGrid(props: CalendarGridProps) {
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
  console.log('Sorted selected dates:', sortedSelectedDate);

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
      {dayNames.map((d) => (
        <div key={d} className='day-name'>
          {d}
        </div>
      ))}
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
          <CalendarDayMonth
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
  );
}
