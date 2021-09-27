import { getAuth } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { login } from "../actions/authAction";
import { StartLoadingNotes } from "../actions/notesAction";
import LoadingScreen from "../components/extras/LoadingScreen";
import JournalScreen from "../components/journal/JournalScreen";
import AuthRouter from "./AuthRouter";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  const dispatch = useDispatch();

  const [checkingUser, setCheckingUser] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLogged(true);

        dispatch(StartLoadingNotes(user.uid));
      } else {
        setIsLogged(false);
      }
      setCheckingUser(false);
    });
  }, [dispatch, setCheckingUser, setIsLogged]);

  if (checkingUser) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <>
        <Switch>
          <PublicRoute
            isAuthenticated={isLogged}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            isAuthenticated={isLogged}
            path="/"
            component={JournalScreen}
          />
        </Switch>
      </>
    </Router>
  );
};

export default AppRouter;
