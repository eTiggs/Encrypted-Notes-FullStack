import React from 'react';

const TableHeading = () => {
  return (
    <thead>
      <tr>
        <th className="table-column-small">Select</th>
        <th className="table-column">Note Name</th>
        <th className="table-column">Expiry Date/Time</th>
        <th className="table-column">Reads Remaining</th>
        <th className="table-column-link">Link</th>
      </tr>
    </thead>
  );
};

export default TableHeading;