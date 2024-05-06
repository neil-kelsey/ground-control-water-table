"use client"; // This is a client component

import React, { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { useToggle } from "../functions/useToggle";
import DateRange from '../components/dateRange';

const Chart = ({ data }) => {
    const [visible, toggle] = useToggle(false);
    const [startDate, setStartDate] = useState(new Date().toISOString());
    const [endDate, setEndDate] = useState(new Date().toISOString());
    console.log('NeilTest - dates - startDate', startDate);
    console.log('NeilTest - dates - endDate', endDate);
    console.log('NeilTest - chart - data testtest', data);
    const [chartOptions, setChartOptions] = useState({
        // Data: Data to be displayed in the chart
        data: [
            { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
            { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
            { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
            { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
            { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
            { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
        ],
        // Series: Defines which chart type and data to use
        series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
      });

    useEffect(() => {
        console.log('NeilTest test');
    }, []); // Empty dependency array to run the effect only once

    // Maybe we make this a separate file? - chartFilterFunction
    const filterClickHandler = (itemName) => {
        console.log('NeilTest - filterClickHandler - itemValue', itemName);
        console.log('NeilTest - filterClickHandler - data', data);
        console.log('NeilTest - filterClickHandler - startDate', startDate);
        console.log('NeilTest - filterClickHandler - endDate', endDate);
        console.log('NeilTest - filterClickHandler - startDate data type', typeof startDate);
    }

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
                    <li onClick={() => filterClickHandler('Battery')}>Battery</li>
                    <li onClick={() => filterClickHandler('Temperature')}>Temperature</li>
                    <li onClick={() => filterClickHandler('Speed')}>Speed</li>
                    <li onClick={() => filterClickHandler('Alarm')}>Alarm</li>
                    <li onClick={() => filterClickHandler('State')}>State</li>
                    <li onClick={() => filterClickHandler('Height')}>Height</li>
                    <li onClick={() => filterClickHandler('Oxygen')}>Oxygen</li>
                </ul>
            </div>
            <div className="main">
                <div className="fullHeight">
                    <span>Temperature<AgChartsReact options={chartOptions} /></span>
                </div>
            </div>
        </div>
    );
};

export default Chart;