import { Link } from "react-router-dom";
import arrow from "../../assets/images/icons/chevron_right-24px.svg";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./WarehouseInventoryCard.scss";
import StatusTag from "../StatusTag/StatusTag";
import editIcon from "../../assets/images/icons/edit-24px.svg";

function WarehouseInventoryCard({
  warehouse,
  inventory,
  fetchWarehouseInventory,
}) {
  return (
    <div className="warehouse-inventory-card">
      <div className="warehouse-inventory-card__info warehouse-inventory-card__info--item">
        <h4 className="warehouse-inventory-card__label">INVENTORY ITEM</h4>
        <Link to={`/inventory/${inventory.id}`}>
          <p className="warehouse-inventory-card__item-name">
            {inventory.item_name} <img src={arrow} alt="" className="" />
          </p>
        </Link>
      </div>

      <div className="warehouse-inventory-card__info warehouse-inventory-card__info--category">
        <h4 className="warehouse-inventory-card__label">CATEGORY</h4>
        <p>{inventory.category}</p>
      </div>

      <div className="warehouse-inventory-card__info warehouse-inventory-card__info--status">
        <h4 className="warehouse-inventory-card__label">STATUS</h4>
        <StatusTag status={inventory.status} />
      </div>

      <div className="warehouse-inventory-card__info warehouse-inventory-card__info--qty">
        <h4 className="warehouse-inventory-card__label">QTY</h4>
        <p>{inventory.quantity}</p>
      </div>

      <div className="warehouse-inventory-card__info warehouse-inventory-card__info--actions">
        <h4 className="warehouse-card__label">ACTIONS</h4>
        <DeleteModal
          itemName={inventory.item_name}
          itemId={inventory.id}
          itemType="inventory"
          route="inventories"
          typeOfList="inventory list"
          onDeleteSuccess={fetchWarehouseInventory}
        />
        <Link to={`/warehouse/${warehouse.id}/edit`}>
          <img src={editIcon} alt="" className="warehouse-item__edit" />

        </Link>
      </div>
    </div>
  );
}

export default WarehouseInventoryCard;
