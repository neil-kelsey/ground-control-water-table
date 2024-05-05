"use client"; // This is a client component

import React, { useEffect, useState } from 'react';
import TableComponent from '../components/table';
import riverSensorData from '../data/river_sensor_data.json';
import { decodeAndMutateData } from '../functions/decodeAndMutateData';

const TablePage = () => {
    const [data, setData] = useState()
    useEffect(() => {
        const data = decodeAndMutateData(riverSensorData);
        console.log('NeilTest - data', data);
        setData(data)
    }, []); // Empty dependency array to run the effect only once

    return (
        <div>
            <h1>Table page</h1>
            {data ? <TableComponent data={data} /> : <div>No data / loading component</div>}
        </div>
    );
};

export default TablePage;