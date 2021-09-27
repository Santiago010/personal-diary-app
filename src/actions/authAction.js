import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { noteLogout } from "./notesAction";
import { finishLoading, startLoading, setError } from "./uiActions";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        dispatch(finishLoading());
        dispatch(
          setError(
            "No existe ningún usuario con el email y password ingresado, ¡intente nuevamente!"
          )
        );
      });
  };
};

export const StartRegisterWithEmailPasswordAndName = (
  email,
  password,
  name
) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })

      .catch((e) => {
        dispatch(finishLoading());
        dispatch(
          setError(
            "¡Ups! parece que hubo un problema vuelve a interlo mas tarde."
          )
        );
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
      dispatch(finishLoading());
    });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    const auth = getAuth();
    await auth.signOut();
    dispatch(noteLogout());
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});
