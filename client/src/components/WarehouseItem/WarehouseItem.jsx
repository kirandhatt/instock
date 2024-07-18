import React from "react";
import "./WarehouseItem.scss";
import editIcon from "../../assets/images/icons/edit-24px.svg";
import { Link } from "react-router-dom";
import arrow from "../../assets/images/icons/chevron_right-24px.svg";
import DeleteModal from "../DeleteModal/DeleteModal";

function WarehouseItem({ warehouse, fetchWarehouses }) {
  return (
    <div className="warehouse-item">
      <div className="warehouse-item__info warehouse-item__info--warehouse">
        <h4 className="warehouse-item__label">WAREHOUSE</h4>
        <Link to={`/warehouse/${warehouse.id}`}>
          <p className="warehouse-item__warehouse-name">
            {warehouse.warehouse_name}
            <img src={arrow} alt="" className="warehouse-item__icon" />
          </p>
        </Link>
      </div>

      <div className="warehouse-item__info warehouse-item__info--address">
        <h4 className="warehouse-item__label">ADDRESS</h4>
        <p>
          {warehouse.address}, {warehouse.city}, {warehouse.country}
        </p>
      </div>

      <div className="warehouse-item__info warehouse-item__info--contact">
        <h4 className="warehouse-item__label">CONTACT NAME</h4>
        <p>{warehouse.contact_name}</p>
      </div>

      <div className="warehouse-item__info warehouse-item__info--contact-info">
        <h4 className="warehouse-item__label">CONTACT INFORMATION</h4>
        <div className="warehouse-item__contact-details">
          <p className="warehouse-item__tel">{warehouse.contact_phone}</p>
          <p className="warehouse-item__email">{warehouse.contact_email}</p>
        </div>
      </div>

      <div className="warehouse-item__info warehouse-item__info--actions">
        <h4 className="warehouse-item__label">ACTIONS</h4>
        <DeleteModal
          itemName={warehouse.warehouse_name}
          itemId={warehouse.id}
          itemType="warehouse"
          route="warehouses"
          typeOfList="list of warehouses"
          onDeleteSuccess={fetchWarehouses}
        />
        <Link to={`/warehouse/${warehouse.id}/edit`}>
          <img src={editIcon} alt="" className="warehouse-item__edit" />
        </Link>
      </div>
    </div>
  );
}

export default WarehouseItem;
