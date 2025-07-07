type CalendarGridWeekProps = {
  currentWeek: Date[];
  selectedDate: Date[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Date[]>>;
  isFirstInRange?: (date: Date) => boolean;
  isLastInRange?: (date: Date) => boolean;
};

export default function CalendarGridWeek(props: CalendarGridWeekProps) {
  const {
    currentWeek,
    selectedDate,
    setSelectedDate,
    isFirstInRange,
    isLastInRange,
  } = props;

  return (
    <div className='calendar-body'>
      {dayNames.map((d) => (
        <div key={d} className='day-name'>
          {d}
        </div>
      ))}
}
