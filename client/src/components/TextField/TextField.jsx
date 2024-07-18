import React from "react";
import "./TextField.scss";
import errorIcon from "../../assets/images/icons/error-24px.svg";
import classNames from "classnames";

function TextField({
  label,
  name,
  placeholder,
  value,
  onChange,
  hasError,
  id,
  validationType,
}) {
  const isEmpty = value.trim() === "";

  const inputClasses = classNames("text-field", {
    "text-field--error": hasError && isEmpty,
  });


  function formatPhoneNumber(phoneNumber) {
    const phonePattern = /^\+(\d{1,2})\s?\((\d{3})\)\s?(\d{3})-(\d{4})$/;
  
    return phonePattern.test(phoneNumber);
  }
  

  const validate = () => {
    switch (validationType) {
      case "phone":
        return formatPhoneNumber(value);
      case "email":
        return value.includes("@");
      default:
        return !isEmpty;
    }
  };

  const isValid = validate();

  return (
    <div className="form-group">
      <label htmlFor="textField"> {label}</label>
      <input
        type="text"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClasses}
      />

      {hasError && !isValid && (
        <span className="error-message">
          {" "}
          <img src={errorIcon} alt="Error icon" />
          {validationType === "phone"
            ? "Please enter a valid phone number"
            : validationType === "email"
            ? "Please enter a valid email"
            : `${label} is required`}
        </span>
      )}
    </div>
  );
}

export default TextField;
