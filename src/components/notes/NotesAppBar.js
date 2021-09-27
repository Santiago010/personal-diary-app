import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote } from "../../actions/notesAction";

const NotesAppBar = ({ date }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };
  return (
    <div className="notes__appbar">
      <span>{noteDate.format("YYYY-MM-DD")}</span>
      <div>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
