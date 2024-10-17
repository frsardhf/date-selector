import React, { useState, useMemo } from 'react';
import Dropdown from './Dropdown';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DEFAULT_LABELS = {
  year: 'Select Year',
  month: 'Select Month',
  day: 'Select Date'
};

const DateSelector = () => {
  const currentYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState(DEFAULT_LABELS);

  const options = useMemo(() => ({
    year: Array.from({ length: 100 }, (_, i) => (currentYear - i).toString()),
    month: MONTHS,
    day: getDaysArray(selectedDate.year, selectedDate.month)
  }), [currentYear, selectedDate.year, selectedDate.month]);

  function getDaysArray(year, month) {
    if (year !== DEFAULT_LABELS.year && month !== DEFAULT_LABELS.month) {
      const daysInMonth = new Date(parseInt(year), MONTHS.indexOf(month) + 1, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    }
    return Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  }

  const handleDateChange = (type) => (value) => {
    setSelectedDate(prev => {
      const newDate = { ...prev, [type]: value };
      if (type !== 'day') {
        newDate.day = 'Select Date';
      }
      return newDate;
    });
  };

  const getSelectedDateString = () => {
    const { year, month, day } = selectedDate;
    return Object.values(selectedDate).every(value => !Object.values(DEFAULT_LABELS).includes(value))
      ? `${day} ${month} ${year}`
      : 'Please select a date';
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Date Selector</h2>
      <div className="flex justify-between gap-2 mb-4">
        {Object.entries(options).map(([key, values]) => (
          <Dropdown
            key={key}
            label={selectedDate[key]}
            options={values}
            onSelect={handleDateChange(key)}
          />
        ))}
      </div>
      <p className="text-lg font-semibold text-center">{getSelectedDateString()}</p>
    </div>
  );
};

export default DateSelector;