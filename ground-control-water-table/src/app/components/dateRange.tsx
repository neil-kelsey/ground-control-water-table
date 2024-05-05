import { useState } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRange = ({ startDate, setStartDate, endDate, setEndDate }) => {
    const handleSetStartDate = (date) => {
        const isoDateString = date.toISOString();
        setStartDate(isoDateString);
    };
    const handleSetEndDate = (date) => {
        const isoDateString = date.toISOString();
        setEndDate(isoDateString);
    };

    return (
        <div className='date-picker'>
            <Calendar
                date={new Date(startDate)}
                onChange={handleSetStartDate}
            />
            <Calendar
                date={new Date(endDate)}
                onChange={handleSetEndDate}
            />
        </div>
    );
};

export default DateRange;
