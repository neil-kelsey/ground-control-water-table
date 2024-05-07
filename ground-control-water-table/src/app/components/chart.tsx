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

        // This next bit is a bit hacky
        // There's a bug in filteredData where the first array item is returned empty
        // I couldn't figure out why, so I've sliced it off
        const filteredDataWithoutFirstItemTwo = filteredDataTwo.slice(1);
        setTemperatureChartData(prevState => ({
            ...prevState,
            data: filteredDataWithoutFirstItemTwo,
        }));
   
         // Now get the first and last array items so we can set the earliest date and the latest dates
        // We can use these values for the date range of the calendar - start date and end date
        const firstItem = filteredDataWithoutFirstItemTwo[0];
        const lastItem = filteredDataWithoutFirstItemTwo[filteredDataWithoutFirstItemTwo.length - 1];
        const startDateValue = firstItem.date;
        const endDateValue = lastItem.date;
        setStartDate(startDateValue);
        setEndDate(endDateValue);
    }, []); // Empty dependency array to run the effect only once

    const filterClickHandler = (itemName) => {
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

        // This next bit is a bit hacky
        // There's a bug in filteredData where the first array item is returned empty
        // I couldn't figure out why, so I've sliced it off
        const filteredDataWithoutFirstItem = filteredData.slice(1);
        { itemName === 'Temperature' ? 
            setTemperatureChartData(prevChart => ({
                ...prevChart,
                data: filteredDataWithoutFirstItem,
            }))
        : <></> }

        // Now filter out any data that doesn't fit within the startDate and endDate range
        const filterByDateRange = filteredDataWithoutFirstItem.filter(entry => {
            // Convert startDate and endDate strings to Date objects
            const startDateObject = new Date(startDate)
            const endDateObject = new Date(endDate)
            // Convert entry.date string to a Date object
            const entryDate = new Date(entry.date);
        
            // Compare entryDate with startDateObject and endDateObject
            return entryDate >= startDateObject && entryDate <= endDateObject;
        });
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
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2 col-sm-12">
                    <h2 className="margin-bottom-xl margin-left-lg">Filters</h2>
                    <button className="map-button margin-bottom-xl margin-left-lg" onClick={toggle}>{visible ? "Hide date range" : "Show date range" }</button>
                    {visible ? (
                        <DateRange startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                    ) : (
                        <></>
                    )}
                    <div className="filter-buttons">
                        <div className={chartType === "Temperature" ? "filter selected row" : "filter row"} onClick={() => filterClickHandler('Temperature')}>
                            <div className="col-md-4 col-sm-12 text-align-center">
                                <FaTemperatureHigh size={30} />
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <p className="margin-top-sm"><span className="mobile-invisible">Temperature</span></p>
                            </div>
                        </div>
                        <div className={chartType === "Battery" ? "filter selected row" : "filter row"} onClick={() => filterClickHandler('Battery')}>
                            <div className="col-md-4 col-sm-12 text-align-center">
                                <FaBatteryFull size={30} />
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <p className="margin-top-sm"><span className="mobile-invisible">Battery</span></p>
                            </div>
                        </div>
                        <div className={chartType === "Speed" ? "filter selected row" : "filter row"} onClick={() => filterClickHandler('Speed')}>
                            <div className="col-md-4 col-sm-12 text-align-center">
                                <IoSpeedometerSharp size={30} />
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <p className="margin-top-sm"><span className="mobile-invisible">Speed</span></p>
                            </div>
                        </div>
                        <div className={chartType === "Alarm" ? "filter selected row" : "filter row"} onClick={() => filterClickHandler('Alarm')}>
                            <div className="col-md-4 col-sm-12 text-align-center">
                                <IoAlarm size={30} />
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <p className="margin-top-sm"><span className="mobile-invisible">Alarm</span></p>
                            </div>
                        </div>
                        <div className={chartType === "State" ? "filter selected row" : "filter row"} onClick={() => filterClickHandler('State')}>
                            <div className="col-md-4 col-sm-12 text-align-center">
                                <FaWater size={30} />
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <p className="margin-top-sm"><span className="mobile-invisible">State</span></p>
                            </div>
                        </div>
                        <div className={chartType === "Height" ? "filter selected row" : "filter row"} onClick={() => filterClickHandler('Height')}>
                            <div className="col-md-4 col-sm-12 text-align-center">
                                <MdHeight size={30} />
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <p className="margin-top-sm"><span className="mobile-invisible">Height</span></p>
                            </div>
                        </div>
                        <div className={chartType === "Oxygen" ? "filter selected row" : "filter row"} onClick={() => filterClickHandler('Oxygen')}>
                            <div className="col-md-4 col-sm-12 text-align-center">
                                <SiOxygen size={30} />
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <p className="margin-top-sm"><span className="mobile-invisible">Oxygen</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-10 col-sm-12">
                    <div className="chart-container">
                        {chartType === 'Temperature' && temperatureChartData ? <AgChartsReact options={temperatureChartData} /> : <></>}
                        {chartType === 'Battery' && batteryChartData ? <AgChartsReact options={batteryChartData} /> : <></>}
                        {chartType === 'Speed' && speedChartData ? <AgChartsReact options={speedChartData} /> : <></>}
                        {chartType === 'Alarm' && alarmChartData ? <AgChartsReact options={alarmChartData} /> : <></>}
                        {chartType === 'State' && stateChartData ? <AgChartsReact options={stateChartData} /> : <></>}
                        {chartType === 'Height' && heightChartData ? <AgChartsReact options={heightChartData} /> : <></>}
                        {chartType === 'Oxygen' && oxygenChartData ? <AgChartsReact options={oxygenChartData} /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chart;