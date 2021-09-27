import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/authAction";
import { startNewNote } from "../../actions/notesAction";
import JournalEntries from "./JournalEntries";

const SideBar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleAddEntry = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__main-sidebar-navbar">
        <h3 className="mt-5 animate__animated animate__flash">
          <i className="far fa-moon"></i>
          <span>{name}</span>
        </h3>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="journal__new-entry" onClick={handleAddEntry}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">new entry</p>
      </div>
      <JournalEntries />
    </aside>
  );
};

export default SideBar;
