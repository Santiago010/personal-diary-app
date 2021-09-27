import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notesAction";

const JournalEntry = ({ id, date, title, body }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();

  const handleActive = () => {
    dispatch(activeNote(id, { date, title, body }));
  };

  return (
    <div
      className="journal__entry pointer animate__animated  animate__bounceInLeft"
      onClick={handleActive}
    >
      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDate.format("dddd")}</span>
        <h4>{noteDate.format("Do")}</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
