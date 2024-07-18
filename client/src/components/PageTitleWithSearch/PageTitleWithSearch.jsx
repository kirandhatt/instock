import { useNavigate } from "react-router-dom";
import "./PageTitleWithSearch.scss";
import SearchField from "../SearchField/SearchField.jsx";
import PrimaryButton from "../PrimaryButton/PrimaryButton.jsx";

function PageTitleWithSearch({ title, addLink, type }) {
  const navigate = useNavigate();

  const handleAddClick = (event) => {
    event.preventDefault();
    navigate(addLink);
  };

  return (
    <div className="page-title-search">
      <h1 className="page-title-search__header">{title}</h1>
      <div className="page-title-search__search-add">
        <SearchField />
        <PrimaryButton
          onClick={handleAddClick}
          buttonText={`+ Add New ${type}`}
        />
      </div>
    </div>
  );
}

export default PageTitleWithSearch;
