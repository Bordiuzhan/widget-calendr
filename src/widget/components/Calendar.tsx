import { useMemo, useState } from 'react';
import './Calendar.css';
import { Day } from '../../types/calendar';
import { VIEW_MODES, WEEKDAYS } from '../../constants';
import generateMonth from '../../utils/generateMonth';
import CalendarHeader from './CalendarHeader';
import { addDays, startOfWeek } from 'date-fns';
import DayGrid from './DayGrid';
import MonthGrid from './MonthGrid';
import TimeGrid from './TimeGrid';

export function Calendar() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Day[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>(
    VIEW_MODES[0],
  );
  const [baseDate, setBaseDate] = useState(
    () => startOfWeek(new Date(), { weekStartsOn: 0 }), // Починаємо з поточного тижня, неділя
  );
  const weekStartsOnMonday = false;
  console.log('Reloaded Calendar component');

  // Функції для перемикання місяців
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };
  // Функції для перемикання тижня
  const prevWeek = () => setBaseDate((d) => addDays(d, -7));
  const nextWeek = () => setBaseDate((d) => addDays(d, 7));

  const goPrev = viewMode === 'month' ? prevMonth : prevWeek;
  const goNext = viewMode === 'month' ? nextMonth : nextWeek;

  const dayNames = weekStartsOnMonday
    ? [...WEEKDAYS.slice(1), WEEKDAYS[0]]
    : WEEKDAYS;

  const days = useMemo(() => {
    if (viewMode === 'month') {
      return generateMonth(currentYear, currentMonth);
    }
    return [];
  }, [currentYear, currentMonth, viewMode]);

  return (
    <div className='calendar'>
      <h1 className='title'>
        Booking date & time slots at the Conservatory Studio
      </h1>
      <p className='subtitle'>Minimal booking time - 2 hours. </p>
      <CalendarHeader
        baseDate={baseDate}
        currentMonth={currentMonth}
        currentYear={currentYear}
        goPrev={goPrev}
        goNext={goNext}
        viewMode={viewMode}
        setViewMode={setViewMode}
        startOnMonday={weekStartsOnMonday}
      />

      {viewMode === 'month' ? (
        <MonthGrid
          days={days}
          dayNames={dayNames}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ) : viewMode === 'week' ? (
        <DayGrid baseDate={baseDate} />
      ) : viewMode === 'day' ? (
        <TimeGrid date={baseDate} />
      ) : null}
    </div>
  );
}
