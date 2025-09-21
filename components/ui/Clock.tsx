import React, { useState, useEffect } from 'react';
import { IconClock } from '../../constants';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="flex items-center px-3 py-2 text-sm font-medium text-neutral-dark dark:text-neutral-d-dark">
      <IconClock className="w-5 h-5 mr-1.5 opacity-80" />
      <span>
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};

export default Clock;
