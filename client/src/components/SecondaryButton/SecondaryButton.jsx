import React from "react";
import "./SecondaryButton.scss";

function SecondaryButton({ buttonText, onClick }) {
  return (
    <>
      <button className="secondary-button" onClick={onClick}>
        {buttonText}
      </button>
    </>
  );
}

export default SecondaryButton;
