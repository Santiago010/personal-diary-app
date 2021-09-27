// {
//     notes : [],
//     active : null,
//     active : {
//         id : "12345678",
//         title : "",
//         body : "",
//         imageUrl : "",
//         date : 1234567
//     }
// }

import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

export const authNotes = (state = initialState, actions) => {
  switch (actions.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...actions.payload,
        },
      };
    case types.notesAddNew:
      return {
        ...state,
        notes: [actions.payload, ...state.notes],
      };
    case types.notesLoad:
      return {
        ...state,
        notes: [...actions.payload],
      };
    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === actions.payload.id ? actions.payload.note : note
        ),
      };
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== actions.payload),
      };

    case types.notesLogoutCleaning:
      return {
        ...state,
        active: null,
        notes: [],
      };
    default:
      return state;
  }
};
