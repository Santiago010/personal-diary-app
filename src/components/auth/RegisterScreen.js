import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import validator from "validator";
import { useDispatch } from "react-redux";
import { setError, removeError } from "../../actions/uiActions";
import { useSelector } from "react-redux";
import { StartRegisterWithEmailPasswordAndName } from "../../actions/authAction";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { loading, msgError } = useSelector((state) => state.ui);

  const [values, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = values;

  const handleRegister = (ev) => {
    ev.preventDefault();

    if (isFormValid()) {
      dispatch(StartRegisterWithEmailPasswordAndName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("el nombre es requerido"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("el email no es valido"));
      return false;
    } else if (password !== password2 || password.length < 6) {
      dispatch(setError("el password no es valido"));
      return false;
    }
    dispatch(removeError());
    return true;
  };
  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        {msgError && <div className="auth__alert-error">{msgError} </div>}

        <input
          className="auth__input"
          onChange={handleInputChange}
          value={name}
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          className="auth__input"
          onChange={handleInputChange}
          value={email}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="auth__input"
          onChange={handleInputChange}
          value={password}
          type="password"
          name="password"
          placeholder="password"
        />
        <input
          className="auth__input"
          onChange={handleInputChange}
          value={password2}
          type="password"
          name="password2"
          placeholder="Confirm password"
        />
        <button
          className="btn btn-primary btn-block mb-5"
          disabled={loading}
          type="submit"
        >
          Register
        </button>
        <Link className="links" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
