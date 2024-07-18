import React from "react";
import "./PrimaryButton.scss";

function PrimaryButton(props) {
  return (
    <>
      <button
        className={`primary-button ${props.buttonExtraClass}`}
        onClick={props.onClick}
      >
        {props.children}
        <p className={`primary-button__text ${props.textExtraClass}`}>
          {props.buttonText}
        </p>
      </button>
    </>
  );
}

export default PrimaryButton;
