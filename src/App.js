import "./App.scss";
import "./styles/_global.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageHeader from "./components/PageHeader/PageHeader";
import WareHouseListComponent from "./components/WareHouseListComponent/WareHouseListComponent";
import AddNewWarehouse from "./components/AddNewWarehouse/AddNewWarehouse";
import WarehouseInventoryCard from "./components/WarehouseInventoryCard/WarehouseInventoryCard";
import AddInventoryItem from "./components/AddInventoryItem/AddInventoryItem";
import InventoryItemDetails from "./components/InventoryItemDetails/InventoryItemDetails";
import InventoryListComponent from "./components/InventoryListComponent/InventoryListComponent";
import EditWarehouse from './components/EditWarehouse/EditWarehouse'
import EditInventoryItem from './components/EditInventoryItem/EditInventoryItem'
import Footer from './components/Footer/Footer';


function App() {
  return (
    <BrowserRouter className="App">
      <PageHeader />
      <Routes>
        <Route path="/" exact element={<WareHouseListComponent/>} />
        <Route path="/addWarehouse" element={<AddNewWarehouse/>} />
        <Route
          path="/warehouse/:warehouseId"
          element={<WarehouseInventoryCard/>}
        />
        <Route path="/inventory/:itemID" element={<InventoryItemDetails/>} />
        <Route path="/Inventory" exact element={<InventoryListComponent/>} />
        <Route path="/addInventory" element={<AddInventoryItem/>} />

        <Route path="/edit/warehouse/:warehouseId/" element={<EditWarehouse/>} />
        <Route path="/edit/inventory/:inventoryId/" element={<EditInventoryItem/>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
