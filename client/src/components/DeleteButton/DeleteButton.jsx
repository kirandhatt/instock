import React from "react";
import "./DeleteButton.scss";

function DeleteButton({ buttonText, onClick }) {
  return (
    <>
      <button className="delete-button" onClick={onClick}>
        {buttonText}
      </button>
    </>
  );
}

export default DeleteButton;
