import React from 'react'

export default function InputComponent(props) {

  return (
    <div className={props.inputStyle}>
        <label htmlFor={props.label}>Your {props.label}</label>
        <input
          type={props.inputType}
          id={props.label}
          value={props.inputValue}
          onChange={props.inputOnChange}
          onBlur={props.inputOnBlur}
        />
        {props.isInvalid ? <p className="error-text">{props.label} is Invalid</p> : " "}
      </div>
  )
}
