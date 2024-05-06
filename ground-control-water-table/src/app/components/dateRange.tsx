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
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-align-center">
                        <h2 className="margin-left-lg">Start date</h2>
                        <Calendar
                            date={new Date(startDate)}
                            onChange={handleSetStartDate}
                        />
                    </div>
                    <div className="col-md-6 text-align-center">
                        <h2 className="margin-left-lg">End date</h2>
                        <Calendar
                            date={new Date(endDate)}
                            onChange={handleSetEndDate}
                        />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default DateRange;
