// Calendar.jsx
import React, { useState } from 'react';
import './Calendar.css';

export function Calendar() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

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

  const monthNames = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];
  const dayNames = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const blanks = Array(firstDayIndex).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className='calendar'>
      <div className='header'>
        <button onClick={goPrev}>{'<'}</button>
        <div>
          {monthNames[currentMonth]} {currentYear}
        </div>
        <button onClick={goNext}>{'>'}</button>
      </div>
      <div className='body'>
        {dayNames.map((d) => (
          <div key={d} className='day-name'>
            {d}
          </div>
        ))}
        {blanks.map((_, i) => (
          <div key={`b${i}`} className='day cell empty'></div>
        ))}
        {days.map((d) => (
          <div key={d} className='day cell'>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
