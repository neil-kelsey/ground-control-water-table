"use client"; // This is a client component

import React, { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import TableFilter from './tableFilter';

const TableComponent = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSensorId, setSelectedSensorId] = useState('');
  const [visibleRows, setVisibleRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filteredByDateData, setFilteredByDateData] = useState(data);

  useEffect(() => {
    // Now get the first and last array items so we can set the earliest date and the latest dates
    // We can use these values for the date range of the calendar - start date and end date
    const firstItem = data[0];
    const lastItem = data[data.length - 1];
    const startDateValue = firstItem.details.transmittedAt.iso;
    const endDateValue = lastItem.details.transmittedAt.iso;
    setStartDate(startDateValue);
    setEndDate(endDateValue);
  }, [data]); // Remove startDate and endDate from the dependency array

  useEffect(() => {
    // Filter data based on the startDate and endDate
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
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div>
      <TableFilter
        searchTerm={searchTerm}
        selectedSensorId={selectedSensorId}
        startDate={startDate}
        endDate={endDate}
        handleSearchChange={handleSearchChange}
        handleSensorIdChange={setSelectedSensorId}
        handleStartDateChange={setStartDate}
        handleEndDateChange={setEndDate}
        data={data}
      />
      {/* End of Search and filter panel */}
      <table cellSpacing={0} cellPadding={0} className="margin-bottom-md">
        <thead>
          <tr>
            <th>ID</th>
            <th>Location (Lat, Long)</th>
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
                  <p onClick={() => toggleVisibility(item.id)}>{visibleRows[item.id] ? <span className="link-selected">Hide details</span> : <span className="link">Show details</span>}</p>
                </td>
              </tr>
              {visibleRows[item.id] && Object.entries(item.details).map(([key, value]) => (
                <tr className="table-details" key={`${item.id}-${key}`}>
                  <td colSpan={5}>
                    <span className="margin-left-lg">
                      <strong className="capitilization">{key}: </strong>
                      {/* Temperature, height, speed, battery and oxygen as objects so handle the data in one way for them */}
                      {typeof value === 'object' ? `${value.value}${value.unit}` : value}
                      {/* Alarm is a boolean */}
                      {typeof value === 'boolean' ? value.toString() : <></>}
                    </span>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination margin-bottom-xxl">
        {filteredData.length > itemsPerPage && (
          <div>
            <label htmlFor="pageSelect">Page:</label>
            <select 
              id="pageSelect"
              className="margin-left-md"
              value={currentPage} 
              onChange={(e) => paginate(parseInt(e.target.value))}
            >
              {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
