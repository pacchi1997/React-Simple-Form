import { useEffect, useState } from "react";
import useInput from "../hooks/custom-input-hook";
import InputComponent from "../reuseable/InputComponent";


const SimpleInputCustomHook = (props) => {
  //Name validation via custom hook
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    inputHandler: nameInputHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  //email validation via custom Hook
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    inputHandler: emailInputHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmail,
  } = useInput((value) => {
    var regEx = /\S+@\S+\.\S+/;
    return regEx.test(value);
  });

  const [formIsValid, setFormIsValid] = useState(false);

  //CSS for name error
  const nameStyle = nameInputHasError ? "form-control invalid" : "form-control";

  //CSS for email error
  const emailStyle = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  //form validation when dependency changes and button get visibile if form is valid.
  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid]);

  // submit handler
  const submitHandler = (event) => {
    event.preventDefault();

    const formData = {
      name: enteredName,
      email: enteredEmail,
    };
    console.log(formData);

    // when i submit the form, it wont show invalid for next entry.. since im disabling button no need extra validation.
    // below im reseting input value, and touched false for new entry.
    resetName();
    resetEmail();
  };

  return (
    <form>
      <InputComponent
        inputStyle={nameStyle}
        label="Name"
        inputType="text"
        inputValue={enteredName}
        inputOnChange={nameInputHandler}
        inputOnBlur={nameInputBlurHandler}
        isInvalid={nameInputHasError}
      />
  
      <InputComponent
        inputStyle={emailStyle}
        label="Email"
        inputType="text"
        inputValue={enteredEmail}
        inputOnChange={emailInputHandler}
        inputOnBlur={emailInputBlurHandler}
        isInvalid={emailInputHasError}
      />
      <div className="form-actions">
        <button disabled={!formIsValid} onClick={submitHandler}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInputCustomHook;
