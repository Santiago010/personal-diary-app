import { useState } from "react";

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const resetValues = (newFormState = initialState) => {
    setValues(newFormState);
  };

  return [values, handleInputChange, resetValues];
};

export default useForm;
