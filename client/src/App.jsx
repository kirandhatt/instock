import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import WarehouseList from "./pages/WarehouseList/WarehouseList";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails";
import EditWarehouse from "./pages/EditWarehouse/EditWarehouse";
import InventoryList from "./pages/InventoryList/InventoryList";
import InventoryItemDetails from "./pages/InventoryItemDetails/InventoryItemDetails";
import AddNewItemForm from "./pages/AddNewInventoryItem/AddNewInventoryItem";
import Footer from "./components/Footer/Footer";
import "./App.scss";
import AddWarehouse from "./pages/AddWarehouse/AddWarehouse";
import EditItemForm from "./pages/EditInventoryItem/EditInventoryItem";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<WarehouseList />} />
          <Route path="/warehouse" element={<WarehouseList />} />
          <Route
            path="/warehouse/:warehouseId"
            element={<WarehouseDetails />}
          />
          <Route
            path="/warehouse/:warehouseId/edit"
            element={<EditWarehouse />}
          />
          <Route path="/warehouse/new" element={<AddWarehouse />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route
            path="/inventory/:inventoryItemId"
            element={<InventoryItemDetails />}
          />
          <Route
            path="/inventory/:inventoryItemId/edit"
            element={<EditItemForm />}
          />
          <Route path="/inventory/new" element={<AddNewItemForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
