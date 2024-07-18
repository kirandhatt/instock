import React, { useEffect, useState } from "react";
import "./WarehouseList.scss";
import { api_URL } from "../../utils/const";
import axios from "axios";
import PageContainer from "../../components/PageContainer/PageContainer";
import PageTitleWithSearch from "../../components/PageTitleWithSearch/PageTitleWithSearch";
import WarehouseItem from "../../components/WarehouseItem/WarehouseItem";
import sortIcon from "../../assets/images/icons/sort-24px.svg";

function WarehouseList() {
  const [warehouseList, setWarehouseList] = useState([]);

  const fetchWarehouses = async () => {
    try {
      const { data } = await axios.get(`${api_URL}/api/warehouses`);
      setWarehouseList(data);
    } catch (e) {
      console.error("Could not fetch list of warehouses: ", e);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <PageContainer>
      <section className="warehouse-list">
        <PageTitleWithSearch
          title="Warehouses"
          addLink="/warehouse/new"
          type="Warehouse"
        />
        <div className="warehouse-list__grid">
          <div className="warehouse-list__header">
            <h4 className="warehouse-list__header-label">
              WAREHOUSE
              <img src={sortIcon} alt="" className="warehouse-list__icon" />
            </h4>
            <h4 className="warehouse-list__header-label">
              ADDRESS
              <img src={sortIcon} alt="" className="warehouse-list__icon" />
            </h4>
            <h4 className="warehouse-list__header-label">
              CONTACT NAME
              <img src={sortIcon} alt="" className="warehouse-list__icon" />
            </h4>
            <h4 className="warehouse-list__header-label">
              CONTACT INFORMATION
              <img src={sortIcon} alt="" className="warehouse-list__icon" />
            </h4>
            <h4 className="warehouse-list__header-label warehouse-list__header-label--align">
              ACTIONS
            </h4>
          </div>
          {warehouseList.map((warehouse) => (
            <WarehouseItem
              key={warehouse.id}
              warehouse={warehouse}
              fetchWarehouses={fetchWarehouses}
            />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

export default WarehouseList;
