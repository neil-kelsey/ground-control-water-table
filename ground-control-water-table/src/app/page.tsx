"use client"; // This is a client component

import React, { useEffect, useState } from 'react';
import TableComponent from './components/table';
import riverSensorData from './data/river_sensor_data.json';
import { decodeAndMutateData } from './functions/decodeAndMutateData';
import Header from './components/header';
import { usePathname } from 'next/navigation';
import Footer from './components/footer';
import Loading from './components/loading';

const TablePage = () => {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    console.log('NeilTest - pathname', pathname);
    const [data, setData] = useState()
    useEffect(() => {
        setLoading(true);
        const data = decodeAndMutateData(riverSensorData);
        console.log('NeilTest - data', data);
        setData(data);
        setLoading(false);
    }, []); // Empty dependency array to run the effect only once

    return (
        <div>
            {/* If the loading start is true then show the loading component */}
            {loading ? <Loading /> : <></>}
            <Header pathname={pathname} />
            <div className="container margin-top-xxl">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Water table data</h1>
                        {data ? <TableComponent data={data} /> : <div>No data / loading component</div>}
                    </div>
                </div>
            </div>
            <Footer pathname={pathname} />
        </div>
    );
};

export default TablePage;