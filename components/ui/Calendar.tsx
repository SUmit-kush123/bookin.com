
import React, { useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '../../constants';

interface CalendarProps {
  selectedStartDate: string | null;
  selectedEndDate: string | null;
  onDateSelect: (date: Date) => void;
  blockedDates: string[];
}

const Calendar: React.FC<CalendarProps> = ({ selectedStartDate, selectedEndDate, onDateSelect, blockedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const blockedDatesSet = new Set(blockedDates);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = selectedStartDate ? new Date(selectedStartDate) : null;
  const end = selectedEndDate ? new Date(selectedEndDate) : null;
  if (start) start.setUTCHours(0,0,0,0);
  if (end) end.setUTCHours(0,0,0,0);


  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button type="button" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-2 rounded-full hover:bg-secondary dark:hover:bg-neutral-d-extralight">
          <IconChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-neutral-dark dark:text-neutral-d-dark">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button type="button" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-2 rounded-full hover:bg-secondary dark:hover:bg-neutral-d-extralight">
          <IconChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return (
      <div className="grid grid-cols-7 text-center text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mb-2">
        {days.map(day => <div key={day}>{day}</div>)}
      </div>
    );
  };

  const renderCells = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="p-1"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      const cellDateString = cellDate.toISOString().split('T')[0];
      const isPast = cellDate < today;
      const isBlocked = blockedDatesSet.has(cellDateString);
      const isDisabled = isPast || isBlocked;
      
      const isStart = start && cellDate.getTime() === start.getTime();
      const isEnd = end && cellDate.getTime() === end.getTime();
      const isInRange = start && end && cellDate > start && cellDate < end;

      let cellClasses = 'w-9 h-9 flex items-center justify-center rounded-full text-sm transition-colors duration-150';
      if (isDisabled) {
        cellClasses += ' text-neutral-extralight dark:text-neutral-d-extralight/50 line-through cursor-not-allowed';
      } else {
        cellClasses += ' hover:bg-primary/20 dark:hover:bg-accent/20 cursor-pointer';
      }

      if (isStart || isEnd) {
        cellClasses += ' bg-primary dark:bg-accent text-white font-bold';
      } else if (isInRange) {
        cellClasses += ' bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent-light';
      } else {
        cellClasses += ' text-neutral-dark dark:text-neutral-d-dark';
      }


      cells.push(
        <div key={day} className={`p-0.5 flex justify-center items-center ${isInRange || isEnd ? 'bg-primary/5 dark:bg-accent/5' : ''} ${isStart ? 'rounded-l-full' : ''} ${isEnd ? 'rounded-r-full' : ''}`}>
             <button type="button" disabled={isDisabled} onClick={() => !isDisabled && onDateSelect(cellDate)} className={cellClasses}>
                {day}
            </button>
        </div>
      );
    }

    return <div className="grid grid-cols-7">{cells}</div>;
  };

  return (
    <div className="p-4 bg-white dark:bg-neutral-d-light/50 border border-neutral-extralight dark:border-neutral-d-extralight rounded-lg">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
