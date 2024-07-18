import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { api_URL } from "../../utils/const";
import "./WarehouseDetails.scss";
import PageContainer from "../../components/PageContainer/PageContainer";
import PageTitle from "../../components/PageTitle/PageTitle";
import WarehouseInventoryList from "../../components/WarehouseInventoryList/WarehouseInventoryList";

function WarehouseDetails() {
  const { warehouseId } = useParams();

  const [warehouse, setWarehouse] = useState(null);

  const [inventoryList, setInventoryList] = useState([]);

  const fetchWarehouseDetails = async () => {
    try {
      const response = await axios.get(
        `${api_URL}/api/warehouses/${warehouseId}`
      );
      setWarehouse(response.data);
    } catch (error) {
      console.error("Failure fetching warehouse details", error);
    }
  };

  useEffect(() => {
    fetchWarehouseDetails();
  }, [warehouseId]);

  const fetchWarehouseInventory = async () => {
    try {
      const data = await axios.get(
        `${api_URL}/api/warehouses/${warehouseId}/inventories`
      );
      setInventoryList(Array.isArray(data.data) ? data.data : []);
    } catch (e) {
      console.error("Could not fetch list of inventories: ", e);
    }
  };

  useEffect(() => {
    if (warehouseId) {
      fetchWarehouseInventory();
    }
  }, [warehouseId]);

  if (!warehouse) {
    return <p>Getting warehouse information</p>;
  }

  const {
    id,
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = warehouse;

  return (
    <PageContainer>
      <section className="warehouse-details">
        <PageTitle
          title={warehouse_name}
          backLink="/"
          showEdit={true}
          editLink={`/warehouse/${id}/edit`}
        />
        <article className="warehouse-details__card">
          <div className="warehouse-details__address">
            <h4>WAREHOUSE ADDRESS:</h4>
            <p className="warehouse-details__text">
              {address}, <br className="warehouse-details__break" />
              {city}, {country}
            </p>
          </div>
          <div className="warehouse-details__contact-container">
            <div className="warehouse-details__contact warehouse-details__contact-name">
              <h4>CONTACT NAME:</h4>
              <p className="warehouse-details__text">
                {contact_name}
                <br />
                {contact_position}
              </p>
            </div>
            <div className="warehouse-details__contact">
              <h4>CONTACT INFORMATION:</h4>
              <p className="warehouse-details__text">
                {contact_phone}
                <br />
                {contact_email}
              </p>
            </div>
          </div>
        </article>

        <WarehouseInventoryList
          inventoryList={inventoryList}
          fetchWarehouseInventory={fetchWarehouseInventory}
          warehouse={warehouse}
        />
      </section>
    </PageContainer>
  );
}

export default WarehouseDetails;
