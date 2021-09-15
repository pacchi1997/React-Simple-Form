import { useEffect, useState } from "react";
import useBasicForm from "../hooks/basic-form-customhook";
import InputComponent from "../reuseable/InputComponent";

const BasicForm = (props) => {
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameIsInValid,
    inputCSS: firstNameCSS,
    inputHandler: firstNameHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useBasicForm((input) => input.trim() !== "");

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameIsInValid,
    inputCSS: lastNameCSS,
    inputHandler: lastNameHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetlastName,
  } = useBasicForm((input) => input.trim() !== "");

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailIsInValid,
    inputCSS: emailCSS,
    inputHandler: emailHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useBasicForm((input) => {
    var regEx = /\S+@\S+\.\S+/;
    return regEx.test(input);
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [dataStorage,setDataStorage]= useState([]);

  useEffect(() => {
    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [firstNameIsValid, lastNameIsValid, emailIsValid]);

  const submitHandler = (event) => {
    event.preventDefault();
     
    const currentFormData={
      firstName,
      lastName,
      email
    }
    setDataStorage((prev)=>{
      return [...prev,currentFormData];
    })

    console.log(currentFormData);
    console.log(dataStorage);
    resetFirstName();
    resetlastName();
    resetEmail();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <InputComponent 
        inputStyle={firstNameCSS}
        label="First Name"
        inputType="text"
        inputValue={firstName}
        inputOnChange={firstNameHandler}
        inputOnBlur={firstNameBlurHandler}
        isInvalid={firstNameIsInValid}
        />
        <InputComponent 
        inputStyle={lastNameCSS}
        label="Last Name"
        inputType="text"
        inputValue={lastName}
        inputOnChange={lastNameHandler}
        inputOnBlur={lastNameBlurHandler}
        isInvalid={lastNameIsInValid}
        />
      </div>
      <InputComponent 
        inputStyle={emailCSS}
        label="email"
        inputType="text"
        inputValue={email}
        inputOnChange={emailHandler}
        inputOnBlur={emailBlurHandler}
        isInvalid={emailIsInValid}
        />
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
