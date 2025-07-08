import './CalendarHeader.css';
import { MONTHS } from '../../constants';
import { getWeekNumberInMonth } from '../../utils/getWeekNumberInMonth';

type CalendarHeaderProps = {
  baseDate: Date;
  currentMonth: number;
  currentYear: number;
  goPrev: () => void;
  goNext: () => void;
  viewMode?: 'month' | 'week' | 'day';
  setViewMode: (mode: 'month' | 'week' | 'day') => void;
  startOnMonday?: boolean;
};

export default function CalendarHeader(props: CalendarHeaderProps) {
  const {
    baseDate,
    currentMonth,
    currentYear,
    goPrev,
    goNext,
    viewMode = 'month',
    setViewMode,
    startOnMonday = false,
  } = props;

  const weekNum = getWeekNumberInMonth(baseDate, startOnMonday);

  const label = `Week ${weekNum}, ${baseDate.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })}`;
  return (
    <div className='calendar-header'>
      <div className='calendar-header__navigation'>
        <button type='button' onClick={goPrev} className='calendar-nav__button'>
          {'<'}
        </button>
        <div className='calendar-nav__month-year'>
          {viewMode === 'month' ? (
            <span className='calendar-nav__month-label'>
              {MONTHS[currentMonth]} {currentYear}
            </span>
          ) : (
            <span className='calendar-nav__week-label'>{label}</span>
          )}
        </div>
        <button type='button' onClick={goNext} className='calendar-nav__button'>
          {'>'}
        </button>
      </div>

      <div className='calendar-header__controls'>
        <div className='calendar-view-toggle'>
          <span className='calendar-view-toggle__label'>View:</span>
          <button
            type='button'
            className={`calendar-view-toggle__btn ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            Month
          </button>
          <button
            type='button'
            className={`calendar-view-toggle__btn ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            Week
          </button>
          <button
            type='button'
            className={`calendar-view-toggle__btn ${viewMode === 'day' ? 'active' : ''}`}
            onClick={() => setViewMode('day')}
          >
            Day
          </button>
        </div>
        <div className='calendar-filter'>
          <select
            className='calendar-filter__select'
            id='filter-select'
            name='filter-select'
            onChange={(e) => console.log(e.target.value)}
          >
            <option value='1'>Show Only Free day</option>
          </select>
        </div>
      </div>
    </div>
  );
}
