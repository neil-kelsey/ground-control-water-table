"use client"; // This is a client component

import React, { useEffect } from 'react';
import TableComponent from '../components/table';
import riverSensorData from '../data/river_sensor_data.json';
import { decodeAndMutateData } from '../functions/decodeAndMutateData';

const TablePage = () => {
    useEffect(() => {
        const data = decodeAndMutateData(riverSensorData);
        console.log('NeilTest - data', data);
    }, []); // Empty dependency array to run the effect only once

    return (
        <div>
            <h1>Table page</h1>
            <TableComponent />
        </div>
    );
};

export default TablePage;