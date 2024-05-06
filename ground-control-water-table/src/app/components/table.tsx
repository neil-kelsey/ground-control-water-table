"use client"; // This is a client component

import React, { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import DateRange from './dateRange';

const TableComponent = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSensorId, setSelectedSensorId] = useState('');
  const [visibleRows, setVisibleRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Number of items per page
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filteredByDateData, setFilteredByDateData] = useState(data);

  console.log('NeilTest - data', data);
  console.log('NeilTest - dates startDate', startDate);
  console.log('NeilTest - dates endDate', endDate);
  console.log('NeilTest - filteredByDateData', filteredByDateData);

  useEffect(() => {
    // Now get the first and last array items so we can set the earliest date and the latest dates
    // We can use these values for the date range of the calendar - start date and end date
    const firstItem = data[0];
    const lastItem = data[data.length - 1];
    const startDateValue = firstItem.details.transmittedAt.iso;
    const endDateValue = lastItem.details.transmittedAt.iso;
    console.log('NeilTest - dates - startDateValue', startDateValue);
    console.log('NeilTest - dates - endDateValue', endDateValue);
    setStartDate(startDateValue);
    setEndDate(endDateValue);
  }, [data]); // Remove startDate and endDate from the dependency array

  useEffect(() => {
    // Filter data based on the startDate and endDate
    console.log('NeilTest - useEffect - startDate', startDate);
    console.log('NeilTest - useEffect - endDate', endDate);
    setFilteredByDateData(
      startDate && endDate ? data.filter(item => {
        const itemDate = new Date(item.details.transmittedAt.iso);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      }) : data
    );
  }, [startDate, endDate, data]); // Whenever startDate, endDate, or data change, run this useEffect

  // Memoized filter function
  const filteredData = useMemo(() => {
    return filteredByDateData.filter(item => {
      const matchesSearchTerm = item.id.includes(searchTerm);
      const matchesSensorId = selectedSensorId ? item.sensorId === selectedSensorId : true;
      // If we're on page 500 and we change the filters so there are <500 pages we will return an empty table
      // So we need to return to page 1 after every filter change
      setCurrentPage(1);
      return matchesSearchTerm && matchesSensorId;
    });
  }, [filteredByDateData, searchTerm, selectedSensorId]);

  // Debounced onChange handler for search input
  const handleSearchChange = debounce(value => {
    setSearchTerm(value);
  }, 300);

  // Function to toggle visibility for a specific item
  const toggleVisibility = itemId => {
    setVisibleRows(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId] || false,
    }));
  };
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  console.log('NeilTest - currentItems', currentItems)
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div>
        {/* Start Search and filter panel */}
        {/* Fill make this a separate component later */}
      <div>
        <input
          type="text"
          placeholder="Search by ID"
          onChange={e => handleSearchChange(e.target.value)}
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
        <DateRange startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      </div>
      {/* End of Search and filter panel */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Sensor ID</th>
            <th>Date</th>
            <th>Show details</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <React.Fragment key={item.id}>
              <tr>
                <td>{item.id}</td>
                <td>{item.latitude}, {item.longitude}</td>
                <td>{item.sensorId}</td>
                <td>{item.details.transmittedAt.iso}</td>
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
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        {filteredData.length > itemsPerPage && (
          <ul className="pagination">
            {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
              <li key={i} className={i + 1 === currentPage ? 'active' : null}>
                <button onClick={() => paginate(i + 1)}>{i + 1}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
