import React from 'react';

const NotesSection = ({ notes, setNotes }) => {
  return (
    <div className="mt-4">
      <h5>Notes</h5>
      <textarea
        className="form-control"
        placeholder="Additional notes (if any)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
      />
    </div>
  );
};

export default NotesSection