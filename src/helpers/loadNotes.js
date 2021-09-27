import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
  const doc = await getDocs(collection(db, `${uid}`, "journal/notes"));
  const notes = [];
  doc.forEach((snap) => {
    notes.push({
      id: snap.id,
      ...snap.data(),
    });
  });

  return notes;
};
