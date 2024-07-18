import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./DeleteModal.scss";
import closeIcon from "../../assets/images/icons/close-24px.svg";
import deleteIcon from "../../assets/images/icons/delete_outline-24px.svg";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import { api_URL } from "../../utils/const";

function DeleteModal({
  itemName,
  itemId,
  itemType,
  route,
  typeOfList,
  onDeleteSuccess,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const deleteItem = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete ${itemName} ${itemType}? You won't be able to undo this action.`
    );

    if (confirmed) {
      try {
        await axios.delete(`${api_URL}/api/${route}/${itemId}`);
        alert(`Successfully deleted ${itemName} ${itemType}`);
        closeModal();
        onDeleteSuccess();
      } catch (error) {
        alert(`Unable to delete ${itemType}`);
      }
    } else {
      closeModal();
    }
  };

  return (
    <div className="delete">
      <button className="delete__icon" onClick={openModal}>
        <img src={deleteIcon} alt="delete icon" />
      </button>
      <Modal
        className="delete__modal"
        overlayClassName="delete__overlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Modal"
      >
        <button className="delete__close-button" onClick={closeModal}>
          <img
            className="delete__close-icon"
            src={closeIcon}
            alt="close icon"
          />
        </button>
        <div className="delete__content">
          <div className="delete__text">
            <h1 className="delete__header">
              Delete {itemName} {itemType}?
            </h1>
            <p className="delete__text">
              Please confirm that you’d like to delete {itemName} from the{" "}
              {typeOfList}. You won’t be able to undo this action.
            </p>
          </div>
          <div className="delete__buttons">
            <SecondaryButton buttonText="Cancel" onClick={closeModal} />
            <DeleteButton buttonText="Delete" onClick={deleteItem} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteModal;
