import React from 'react';
import DateRange from './dateRange';
import { useToggle } from "../functions/useToggle";

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
  const [visible, toggle] = useToggle(false);
  return (
    <div className="filter-panel margin-bottom-md">
      <input
        type="text"
        placeholder="Search by ID"
        value={searchTerm}
        className="margin-right-md"
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <select
        className="sample"
        className="margin-right-md"
        value={selectedSensorId}
        onChange={(e) => handleSensorIdChange(e.target.value)}
      >
        <option value="">All Sensor IDs</option>
        {Array.from(new Set(data.map(item => item.sensorId))).map(sensorId => (
          <option key={sensorId} value={sensorId}>{sensorId}</option>
        ))}
      </select>
      <button onClick={toggle}>
        {visible ? (
          <span>Hide date range</span>
        ) : (
          <span>Show date range</span>
        )}
      </button>
      {visible ? (
        <DateRange
          startDate={startDate}
          setStartDate={handleStartDateChange}
          endDate={endDate}
          setEndDate={handleEndDateChange}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableFilter;
