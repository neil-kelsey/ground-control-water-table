"use client"; // This is a client component

import React, { useEffect, useState } from 'react';
import TableComponent from '../components/table';
import riverSensorData from '../data/river_sensor_data.json';
import { decodeAndMutateData } from '../functions/decodeAndMutateData';
import Header from '../components/header';
import { usePathname } from 'next/navigation';
import Footer from '../components/footer';

const TablePage = () => {
    const pathname = usePathname();
    console.log('NeilTest - pathname', pathname);
    const [data, setData] = useState()
    useEffect(() => {
        const data = decodeAndMutateData(riverSensorData);
        console.log('NeilTest - data', data);
        setData(data)
    }, []); // Empty dependency array to run the effect only once

    return (
        <div>
            <Header pathname={pathname} />
            <div className='container'>
                <h1>Table page</h1>
                {/* {data ? <TableComponent data={data} /> : <div>No data / loading component</div>} */}
            </div>
            <Footer pathname={pathname} />
        </div>
    );
};

export default TablePage;