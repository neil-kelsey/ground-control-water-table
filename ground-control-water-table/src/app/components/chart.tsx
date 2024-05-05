"use client"; // This is a client component

import React, { useState } from 'react';
import { useToggle } from "../functions/useToggle";
import DateRange from '../components/dateRange';

const Chart = ({ data }) => {
    const [visible, toggle] = useToggle(false);
    const [startDate, setStartDate] = useState(new Date().toISOString());
    const [endDate, setEndDate] = useState(new Date().toISOString());
    console.log('NeilTest - dates - startDate', startDate);
    console.log('NeilTest - dates - endDate', endDate);
    console.log('NeilTest - chart - data', data);
    return (
        <div>
            <div className="left">
                <h1>AG Chart component</h1>
                <p onClick={toggle}>Date range</p>
                {visible ? (
                    <DateRange startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                ) : (
                    <></>
                )}
                <h2>Filters</h2>
                <ul>
                    <li>Battery</li>
                    <li>Temperature</li>
                    <li>Speed</li>
                    <li>Alarm</li>
                    <li>State</li>
                    <li>Height</li>
                    <li>Oxygen</li>
                </ul>
            </div>
            <div className="main">
                <div className="fullHeight">
                    <p>Stuff will go here</p>
                </div>
            </div>
        </div>
    );
};

export default Chart;