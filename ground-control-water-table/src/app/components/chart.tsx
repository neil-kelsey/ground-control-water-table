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

    // Which chart do we want to show by default, by default I chose temperature
    const [chartType, setChartType] = useState('Temperature');
    const [temperatureChartData, setTemperatureChartData] = useState({
        data: [], // initilize with empty array
        series: [{ type: 'line', xKey: 'date', yKey: 'temperature' }]
    });
    const [batteryChartData, setBatteryChartData] = useState({
        data: [], // initilize with empty array
        series: [{ type: 'bar', xKey: 'date', yKey: 'battery' }]
    });
    const [speedChartData, setSpeedChartData] = useState({
        data: [], // initilize with empty array
        series: [{ type: 'line', xKey: 'date', yKey: 'speed' }]
    });
    const [alarmChartData, setAlarmChartData] = useState({
        data: [], // initilize with empty array
        series: [{ type: 'line', xKey: 'date', yKey: 'alarm' }]
    });
    const [stateChartData, setStateChartData] = useState({
        data: [], // initilize with empty array
        series: [{ type: 'line', xKey: 'date', yKey: 'state' }]
    });
    const [heightChartData, setHeightChartData] = useState({
        data: [], // initilize with empty array
        series: [{ type: 'line', xKey: 'date', yKey: 'height' }]
    });
    const [oxygenChartData, setOxygenChartData] = useState({
        data: [], // initilize with empty array
        series: [{ type: 'line', xKey: 'date', yKey: 'oxygen' }]
    });

    console.log('NeilTest - chart data - temperatureChartData', temperatureChartData);
    console.log('NeilTest - chart data - batteryChartData', batteryChartData);
    console.log('NeilTest - chart data - speedChartData', speedChartData);
    console.log('NeilTest - chart data - heightChartData', heightChartData);
    console.log('NeilTest - chart data - alarmChartData', alarmChartData);

    useEffect(() => {
        const filteredDataTwo = data.flatMap(obj => {
            return Object.values(obj).flatMap(entry => {
                if (Array.isArray(entry)) {
                    return entry.map(item => ({
                        date: item.transmittedAt.iso,
                        temperature: item.temperature.value
                    }));
                }
            });
        });
        console.log('NeilTest - useEffect - filteredDataTwo', filteredDataTwo);

        // This next bit is a bit hacky
        // There's a bug in filteredData where the first array item is returned empty
        // I couldn't figure out why, so I've sliced it off
        const filteredDataWithoutFirstItemTwo = filteredDataTwo.slice(1);
        console.log('NeilTest - useEffect - filteredDataWithoutFirstItemTwo', filteredDataWithoutFirstItemTwo);

        setTemperatureChartData(prevState => ({
            ...prevState,
            data: filteredDataWithoutFirstItemTwo,
        }));
        console.log('NeilTest - temperatureChartData', temperatureChartData);

         // Now get the first and last array items so we can set the earliest date and the latest dates
        // We can use these values for the date range of the calendar - start date and end date
        const firstItem = filteredDataWithoutFirstItemTwo[0];
        const lastItem = filteredDataWithoutFirstItemTwo[filteredDataWithoutFirstItemTwo.length - 1];
        const startDateValue = firstItem.date;
        const endDateValue = lastItem.date;
        console.log('NeilTest - dates - startDateValue', startDateValue);
        console.log('NeilTest - dates - endDateValue', endDateValue);
        setStartDate(startDateValue);
        setEndDate(endDateValue);
    }, []); // Empty dependency array to run the effect only once

    // Maybe we make this a separate file? - chartFilterFunction
    const filterClickHandler = (itemName) => {
        console.log('NeilTest - filterClickHandler - itemValue', itemName);
        console.log('NeilTest - filterClickHandler - data', data);
        console.log('NeilTest - filterClickHandler - startDate', startDate);
        console.log('NeilTest - filterClickHandler - endDate', endDate);
        console.log('NeilTest - filterClickHandler - startDate data type', typeof startDate);
        
        setChartType(itemName);
        const filteredData = data.flatMap(obj => {
            return Object.values(obj).flatMap(entry => {
                if (Array.isArray(entry)) {
                    return entry.map(item => ({
                        date: item.transmittedAt.iso,
                        ...(itemName === 'Temperature' ? { temperature: item.temperature.value } : {}),
                        ...(itemName === 'Battery' ? { battery: item.battery.value } : {}),
                        ...(itemName === 'Speed' ? { speed: parseFloat(item.speed.value) } : {}), // convert string value to a number
                        ...(itemName === 'Alarm' ? { alarm: item.alarm } : {}),
                        ...(itemName === 'State' ? { state: item.state.value } : {}),
                        ...(itemName === 'Height' ? { height: parseFloat(item.height.value) } : {}), // convert string value to a number
                        ...(itemName === 'Oxygen' ? { oxygen: item.oxygen.value } : {})
                    }));
                }
            });
        });
        console.log('NeilTest - filterClickHandler - filteredData', filteredData);

        // This next bit is a bit hacky
        // There's a bug in filteredData where the first array item is returned empty
        // I couldn't figure out why, so I've sliced it off
        const filteredDataWithoutFirstItem = filteredData.slice(1);
        console.log('NeilTest - filterClickHandler - filteredDataWithoutFirstItem', filteredDataWithoutFirstItem);
    
        { itemName === 'Temperature' ? 
            setTemperatureChartData(prevChart => ({
                ...prevChart,
                data: filteredDataWithoutFirstItem,
                series: [{ type: 'line', xKey: 'date', yKey: 'temperature' }]
            }))
        : <></> }

        // Now filter out any data that doesn't fit within the startDate and endDate range
        const filterByDateRange = filteredDataWithoutFirstItem.filter(entry => {
            // Convert startDate and endDate strings to Date objects
            const startDateObject = new Date(startDate)
            const endDateObject = new Date(endDate)
            console.log('NeilTest - filterClickHandler - typeof startDateObject', typeof startDateObject )
            
            // Convert entry.date string to a Date object
            const entryDate = new Date(entry.date);
        
            // Compare entryDate with startDateObject and endDateObject
            return entryDate >= startDateObject && entryDate <= endDateObject;
        });
        console.log('NeilTest - filterClickHandler - filterByDateRange', filterByDateRange);

        { itemName === 'Temperature' ? 
        setTemperatureChartData(prevChart => ({
            ...prevChart,
            data: filterByDateRange,
            series: [{ type: 'line', xKey: 'date', yKey: 'temperature' }]
        }))
        : <></> }

        { itemName === 'Battery' ? 
            setBatteryChartData(prevChart => ({
                ...prevChart,
                data: filterByDateRange,
                series: [{ type: 'bar', xKey: 'date', yKey: 'battery' }]
            }))
        : <></> }

        { itemName === 'Speed' ? 
            setSpeedChartData(prevChart => ({
                ...prevChart,
                data: filterByDateRange,
                series: [{ type: 'line', xKey: 'date', yKey: 'speed' }]
            }))
        : <></> }

        { itemName === 'Alarm' ? 
            setAlarmChartData(prevChart => ({
                ...prevChart,
                data: filterByDateRange,
                series: [{ type: 'bar', xKey: 'date', yKey: 'alarm' }]
            }))
        : <></> }

        { itemName === 'State' ? 
            setStateChartData(prevChart => ({
                ...prevChart,
                data: filterByDateRange,
                series: [{ type: 'bar', xKey: 'date', yKey: 'state' }]
            }))
        : <></> }

        { itemName === 'Height' ? 
            setHeightChartData(prevChart => ({
                ...prevChart,
                data: filterByDateRange,
                series: [{ type: 'bar', xKey: 'date', yKey: 'height' }]
            }))
        : <></> }

        { itemName === 'Oxygen' ? 
            setOxygenChartData(prevChart => ({
                ...prevChart,
                data: filterByDateRange,
                series: [{ type: 'bar', xKey: 'date', yKey: 'oxygen' }]
            }))
        : <></> }

        console.log('NeilTest - filterClickHandler - temperatureChartData', temperatureChartData)
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
                    {chartType === 'Temperature' && temperatureChartData ? <span>Temperature<AgChartsReact options={temperatureChartData} /></span> : <></>}
                    {chartType === 'Battery' && batteryChartData ? <span>Battery<AgChartsReact options={batteryChartData} /></span> : <></>}
                    {chartType === 'Speed' && speedChartData ? <span>Speed<AgChartsReact options={speedChartData} /></span> : <></>}
                    {chartType === 'Alarm' && alarmChartData ? <span>Alarm<AgChartsReact options={alarmChartData} /></span> : <></>}
                    {chartType === 'State' && stateChartData ? <span>State<AgChartsReact options={stateChartData} /></span> : <></>}
                    {chartType === 'Height' && heightChartData ? <span>Height<AgChartsReact options={heightChartData} /></span> : <></>}
                    {chartType === 'Oxygen' && oxygenChartData ? <span>Oxygen<AgChartsReact options={oxygenChartData} /></span> : <></>}
                </div>
            </div>
        </div>
    );
};

export default Chart;