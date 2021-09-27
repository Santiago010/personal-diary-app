import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const {
      auth: { uid },
    } = getState();

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await addDoc(
      collection(db, `${uid}`, "journal/notes"),
      newNote
    );
    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const StartLoadingNotes = (uid) => {
  return (dispatch) => {
    loadNotes(uid).then((notes) => dispatch(setNote(notes)));
  };
};

export const setNote = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const {
      auth: { uid },
    } = getState();

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    await updateDoc(
      doc(db, `/${uid}/journal/notes/${note.id}`),
      noteToFirestore
    );

    dispatch(refreshNote(note.id, noteToFirestore));
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const {
      auth: { uid },
    } = getState();
    await deleteDoc(doc(db, `/${uid}/journal/notes/${id}`));
    // console.log(doc(db, `/${uid}/journal/notes/${id}`));
    dispatch(deleteNote(id));
  };
};

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
