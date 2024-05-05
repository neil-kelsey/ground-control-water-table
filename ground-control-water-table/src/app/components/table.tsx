"use client"; // This is a client component

import React, { useState } from 'react';

const TableComponent  = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSensorId, setSelectedSensorId] = useState('');
    const [visibleRows, setVisibleRows] = useState({});

    // Filter data based on search term and selected sensor ID
    const filteredData = data.filter(item => {
        const matchesSearchTerm = item.id.includes(searchTerm);
        const matchesSensorId = selectedSensorId ? item.sensorId === selectedSensorId : true;
        return matchesSearchTerm && matchesSensorId;
    });
    // Function to toggle visibility for a specific item
    const toggleVisibility = itemId => {
        setVisibleRows(prevState => ({
        ...prevState,
        [itemId]: !prevState[itemId] || false,
        }));
    };
    return (
        <div>
            {/* Start Search and filter panel */}
            {/* Fill make this a separate component later */}
            <div>
                <input
                type="text"
                placeholder="Search by ID"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                />
                <select
                value={selectedSensorId}
                onChange={e => setSelectedSensorId(e.target.value)}
                >
                <option value="">All Sensor IDs</option>
                {Array.from(new Set(data.map(item => item.sensorId))).map(sensorId => (
                    <option key={sensorId} value={sensorId}>{sensorId}</option>
                ))}
                </select>
            </div>
            {/* End of Search and filter panel */}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Location</th>
                    <th>Sensor ID</th>
                    <th>Show details</th>
                </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                    <>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.latitude}, {item.longitude}</td>
                        <td>{item.sensorId}</td>
                        <td>
                            <p onClick={() => toggleVisibility(item.id)}>Show details</p>
                        </td>
                    </tr>
                    {visibleRows[item.id] && Object.entries(item.details).map(([key, value]) => (
                        <tr key={`${item.id}-${key}`}>
                        <td colSpan={4}>
                            <strong>{key}:</strong> 
                            {typeof value === 'object' ? JSON.stringify(value) : value}
                        </td>
                        </tr>
                    ))}
                    </>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent ;
