import { useState } from "react";

function useFormFields(initialFormState) {
  const [form, setForm] = useState(initialFormState);
  const [repeatP, setRepeatP] = useState("");

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };
  const handleRepeatPassword = event => {
    setRepeatP(event.target.value);
  };

  const resetForm = () => {
    setForm(initialFormState);
    setRepeatP("");
  };

  return [form, handleChange, resetForm, repeatP, handleRepeatPassword];
}

export default useFormFields;
