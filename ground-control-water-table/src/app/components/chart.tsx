"use client"; // This is a client component

import React, { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { useToggle } from "../functions/useToggle";
import DateRange from '../components/dateRange';
import { FaBatteryFull } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { IoSpeedometerSharp } from "react-icons/io5";
import { IoAlarm } from "react-icons/io5";
import { FaWater } from "react-icons/fa";
import { MdHeight } from "react-icons/md";
import { SiOxygen } from "react-icons/si";

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
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                <h2 className="margin-bottom-md">Filters</h2>
                    <button className="map-button margin-bottom-lg" onClick={toggle}>Date range</button>
                    {visible ? (
                        <DateRange startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                    ) : (
                        <></>
                    )}
                    <ul className="filters">
                    <li className={chartType === "Temperature" ? "filter selected" : "filter"} onClick={() => filterClickHandler('Temperature')}><FaTemperatureHigh size={30} />Temperature</li>
                        <li className={chartType === "Battery" ? "filter selected" : "filter"} onClick={() => filterClickHandler('Battery')}><FaBatteryFull size={30} /> Battery</li>
                        <li className={chartType === "Speed" ? "filter selected" : "filter"} onClick={() => filterClickHandler('Speed')}><IoSpeedometerSharp size={30} />Speed</li>
                        <li className={chartType === "Alarm" ? "filter selected" : "filter"} onClick={() => filterClickHandler('Alarm')}><IoAlarm size={30} />Alarm</li>
                        <li className={chartType === "State" ? "filter selected" : "filter"} onClick={() => filterClickHandler('State')}><FaWater size={30} />State</li>
                        <li className={chartType === "Height" ? "filter selected" : "filter"} onClick={() => filterClickHandler('Height')}><MdHeight size={30} />Height</li>
                        <li className={chartType === "Oxygen" ? "filter selected" : "filter"} onClick={() => filterClickHandler('Oxygen')}><SiOxygen size={30} />Oxygen</li>
                    </ul>
                </div>
                <div className="col-md-10">
                    <div className="chart-container">
                        {chartType === 'Temperature' && temperatureChartData ? <span><AgChartsReact options={temperatureChartData} /></span> : <></>}
                        {chartType === 'Battery' && batteryChartData ? <span><AgChartsReact options={batteryChartData} /></span> : <></>}
                        {chartType === 'Speed' && speedChartData ? <span><AgChartsReact options={speedChartData} /></span> : <></>}
                        {chartType === 'Alarm' && alarmChartData ? <span><AgChartsReact options={alarmChartData} /></span> : <></>}
                        {chartType === 'State' && stateChartData ? <span><AgChartsReact options={stateChartData} /></span> : <></>}
                        {chartType === 'Height' && heightChartData ? <span><AgChartsReact options={heightChartData} /></span> : <></>}
                        {chartType === 'Oxygen' && oxygenChartData ? <span><AgChartsReact options={oxygenChartData} /></span> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart;