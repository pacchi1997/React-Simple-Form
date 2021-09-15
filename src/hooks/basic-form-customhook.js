import { useState } from "react";

export default function useBasicForm(validation) {
  const [enteredInput, setEnteredInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = validation(enteredInput);
  const inputIsInValid = !inputIsValid && isTouched;
  const inputCSS = inputIsInValid ? "form-control invalid" : "form-control";

  const inputHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredInput("");
    setIsTouched(false);
  };
  return {
    value: enteredInput,
    isValid: inputIsValid,
    hasError: inputIsInValid,
    inputCSS,
    inputHandler,
    inputBlurHandler,
    reset,
  };
}
