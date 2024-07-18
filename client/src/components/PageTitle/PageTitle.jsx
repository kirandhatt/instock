import { Link, useNavigate } from "react-router-dom";
import "./PageTitle.scss";
import arrowIcon from "../../assets/images/icons/arrow_back-24px.svg";
import editIcon from "../../assets/images/icons/edit-white-24px.svg";
import PrimaryButton from "../PrimaryButton/PrimaryButton.jsx";

function PageTitle({ backLink, title, showEdit, editLink }) {
  const navigate = useNavigate();

  const handleEditClick = (event) => {
    event.preventDefault();
    navigate(editLink);
  };

  return (
    <div className="page-title">
      <div className="page-title__container">
        <Link className="page-title__back-link" to={backLink}>
          <img
            className="page-title__back-icon"
            src={arrowIcon}
            alt="back icon"
          />
        </Link>
        <h1 className="page-title__header">{title}</h1>
      </div>
      {showEdit && (
        <PrimaryButton
          buttonExtraClass="page-title__edit-button"
          onClick={handleEditClick}
          buttonText="Edit"
          textExtraClass="page-title__edit-text"
        >
          <img
            className="page-title__edit-icon"
            src={editIcon}
            alt="edit icon"
          />
        </PrimaryButton>
      )}
    </div>
  );
}

export default PageTitle;
