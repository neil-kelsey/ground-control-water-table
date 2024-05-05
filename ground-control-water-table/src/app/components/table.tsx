"use client"; // This is a client component

import React from 'react';

const TableComponent  = ({ data }) => {
  return (
    <div>
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
          {data.map(item => (
            <>
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.latitude}, {item.longitude}</td>
                <td>{item.sensorId}</td>
                <td>
                  <p>Show details</p>
                </td>
              </tr>
              {Object.entries(item.details).map(([key, value]) => (
                <tr>
                  <td colSpan={4} key={key}>
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
