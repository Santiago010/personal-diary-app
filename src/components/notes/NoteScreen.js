import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDeleting } from "../../actions/notesAction";
import useForm from "../../hooks/useForm";
import NotesAppBar from "./NotesAppBar";

const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const [values, handleInputChange, resetValues] = useForm(note);
  const { title, body, id } = values;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      resetValues(note);
      activeId.current = note.id;
    }
  }, [note, resetValues]);

  useEffect(() => {
    dispatch(activeNote(values.id, { ...values }));
  }, [values, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting(id));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar date={note.date} />
      <div className="notes__content">
        <input
          type="text"
          name="title"
          placeholder="Un titulo asombroso"
          className="notes__title-input"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          autoComplete="off"
          className="notes__textarea"
          placeholder="Que paso hoy?"
          onChange={handleInputChange}
          value={body}
        ></textarea>
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default NoteScreen;
