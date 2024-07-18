import editIcon from "../../assets/images/icons/edit-24px.svg";
import { Link } from "react-router-dom";
import arrow from "../../assets/images/icons/chevron_right-24px.svg";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./InventoryCard.scss";
import StatusTag from "../StatusTag/StatusTag";

function InventoryCard({ inventory, fetchInventory }) {
  return (
    <div className="inventory-card">
      <div className="inventory-card__info inventory-card__info--item">
        <h4 className="inventory-card__label">INVENTORY ITEM</h4>
        <Link to={`/inventory/${inventory.id}`}>
          <p className="inventory-card__item-name">
            {inventory.item_name} <img src={arrow} alt="" className="" />
          </p>
        </Link>
      </div>

      <div className="inventory-card__info inventory-card__info--category">
        <h4 className="inventory-card__label">CATEGORY</h4>
        <p>{inventory.category}</p>
      </div>

      <div className="inventory-card__info inventory-card__info--status">
        <h4 className="inventory-card__label">STATUS</h4>
        <StatusTag status={inventory.status} />
      </div>

      <div className="inventory-card__info inventory-card__info--qty">
        <h4 className="inventory-card__label">QTY</h4>
        <p>{inventory.quantity}</p>
      </div>

      <div className="inventory-card__info inventory-card__info--warehouse">
        <h4 className="inventory-card__label">WAREHOUSE</h4>
        <p>{inventory.warehouse_name}</p>
      </div>

      <div className="inventory-card__info inventory-card__info--actions">
        <h4 className="inventory-card__label">ACTIONS</h4>
        <DeleteModal
          itemName={inventory.item_name}
          itemId={inventory.id}
          itemType="inventory"
          route="inventories"
          typeOfList="inventory list"
          onDeleteSuccess={fetchInventory}
        />
        <Link to={`/inventory/${inventory.id}/edit`}>
          <img src={editIcon} alt="" className="inventory-item__edit" />
        </Link>
      </div>
    </div>
  );
}

export default InventoryCard;
