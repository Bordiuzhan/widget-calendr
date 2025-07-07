import { useMemo, useState } from 'react';
import { VIEW_MODES, WEEKDAYS } from '../../constants';
import './Calendar.css';
import CalendarGrid from './CalendarGrid';
import generateMonth from '../../utils/generateMonth';
import { Day } from '../../types/calendar';
import CalendarHeader from './CalendarHeader';

export function Calendar() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  /*   const [currentWeek, setCurrentWeek] = useState(
    Math.ceil((now.getDate() - 1) / 7),
  ); */
  const [selectedDate, setSelectedDate] = useState<Day[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>(
    VIEW_MODES[0],
  );
  const weekStartsOnMonday = false;

  const goPrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

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
        currentMonth={currentMonth}
        currentYear={currentYear}
        goPrev={goPrev}
        goNext={goNext}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === 'month' ? (
        <CalendarGrid
          days={days}
          dayNames={dayNames}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ) : viewMode === 'week' ? (
        <CalendarGridWeek />
      ) : viewMode === 'day' ? (
        <div className='calendar-day-view'>
          View soon, this feature will be available.
        </div>
      ) : null}
    </div>
  );
}
