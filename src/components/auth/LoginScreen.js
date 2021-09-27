import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../actions/authAction";
import useForm from "../../hooks/useForm";
import validator from "validator";
import { removeError, setError } from "../../actions/uiActions";
import { useSelector } from "react-redux";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [values, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const { loading, msgError } = useSelector((state) => state.ui);

  const handleLogin = (ev) => {
    ev.preventDefault();

    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError("el email no es valido"));
      return false;
    } else if (password.length < 6) {
      dispatch(setError("el password no es valido"));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          className="auth__input"
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="password"
          autoComplete="off"
          value={password}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-primary btn-block"
          disabled={loading}
          type="submit"
        >
          Login
        </button>
        <div className="auth__social-network">
          <p>Login with social newtwork</p>
          <button
            className="google-btn"
            style={{ border: "none", outline: "none" }}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </button>
        </div>
        <Link className="links" to="/auth/register">
          Create new Account
        </Link>
      </form>
    </>
  );
};

export default LoginScreen;
