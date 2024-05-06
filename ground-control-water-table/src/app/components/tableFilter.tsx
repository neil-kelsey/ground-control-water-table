import React from 'react';
import DateRange from './dateRange';

const TableFilter = ({
  searchTerm,
  selectedSensorId,
  startDate,
  endDate,
  handleSearchChange,
  handleSensorIdChange,
  handleStartDateChange,
  handleEndDateChange,
  data,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by ID"
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <select
        value={selectedSensorId}
        onChange={(e) => handleSensorIdChange(e.target.value)}
      >
        <option value="">All Sensor IDs</option>
        {Array.from(new Set(data.map(item => item.sensorId))).map(sensorId => (
          <option key={sensorId} value={sensorId}>{sensorId}</option>
        ))}
      </select>
      <DateRange
        startDate={startDate}
        setStartDate={handleStartDateChange}
        endDate={endDate}
        setEndDate={handleEndDateChange}
      />
    </div>
  );
};

export default TableFilter;
