import { useEffect, useState } from "react";

const SimpleInput = (props) => {
  
  const [nameInput, setNameInput] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

  //reusable logic to check name input is not empty
  const enteredNameIsValid = nameInput.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const nameStyle = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  //reusable logic for email
  var regEx = /\S+@\S+\.\S+/;
  const enteredEmailIsValid = regEx.test(emailInput);
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
  const emailStyle = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  //Whole form validation when dependency changes
  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid]);

  //Name validation
  const nameInputHandler = (event) => {
    setNameInput(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  // email validation
  const emailInputHandler = (event) => {
    setEmailInput(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = {
      name: nameInput,
      email: emailInput,
    };
    console.log(formData);

    setEnteredNameTouched(false); // when i submit the form, it wont show invalid for next entry.. since im disabling button no need extra validation.
    setEnteredEmailTouched(false);
    setNameInput("");
    setEmailInput("");
  };

  return (
    <form>
      <div className={nameStyle}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameInput}
          onChange={nameInputHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputIsInvalid ? (
          <p className="error-text">Name is Invalid</p>
        ) : (
          " "
        )}
      </div>

      <div className={emailStyle}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={emailInput}
          onChange={emailInputHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputIsInvalid ? (
          <p className="error-text">Email is invalid</p>
        ) : (
          " "
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} onClick={submitHandler}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
