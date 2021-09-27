import React from "react";
import { useSelector } from "react-redux";
import JournalEntry from "./JournalEntry";

const JournalEntries = () => {
  // const entries = [];
  const { notes } = useSelector((state) => state.notes);
  return (
    <div className="journal__entries">
      {notes.map((note) => (
        <JournalEntry {...note} key={note.id} />
      ))}
    </div>
  );
};

export default JournalEntries;
