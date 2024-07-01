import React from 'react';

const NoteModifiers = ({ timeActive, setTimeActive, maxAccessCount, setMaxAccessCount, infiniteReads, setInfiniteReads }) => {
  return (
    <div className="mb-3">
      <label htmlFor="timeActive" className="form-label">Time Active</label>
      <select 
        id="timeActive" 
        className="form-select" 
        value={timeActive} 
        onChange={e => setTimeActive(e.target.value)}
      >
        <option value="5">5 minutes</option>
        <option value="10">10 minutes</option>
        <option value="15">15 minutes</option>
        <option value="30">30 minutes</option>
        <option value="60">1 hour</option>
        <option value="120">2 hours</option>
        <option value="180">3 hours</option>
        <option value="1440">1 day</option>
        <option value="2880">2 days</option>
        <option value="10080">1 week</option>
      </select>

      <div className="mt-3">
        <label htmlFor="maxAccessCount" className="form-label">No of Reads</label>
        <input 
          type="number" 
          id="maxAccessCount" 
          className="form-control" 
          value={maxAccessCount} 
          onChange={e => setMaxAccessCount(e.target.value)} 
          min="0" 
          max="99" 
          disabled={infiniteReads}
        />
      </div>

      <div className="form-check mt-2">
        <input 
          type="checkbox" 
          id="infiniteReads" 
          className="form-check-input" 
          checked={infiniteReads} 
          onChange={e => setInfiniteReads(e.target.checked)}
        />
        <label htmlFor="infiniteReads" className="form-check-label">Infinite Reads</label>
      </div>
    </div>
  );
};

export default NoteModifiers;
