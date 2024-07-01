import React from 'react';

const NoNotesError = () => {
  return (
    <tr>
      <td colSpan="5" className="text-center text-danger">No Notes To Display</td>
    </tr>
  );
};

export default NoNotesError;