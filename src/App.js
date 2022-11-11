import "./App.scss";
import "./styles/_global.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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
      <Switch>
        <Route path="/" exact component={WareHouseListComponent} />
        <Route path="/addWarehouse" component={AddNewWarehouse} />
        <Route
          path="/warehouse/:warehouseId"
          component={WarehouseInventoryCard}
        />
        <Route path="/inventory/:itemID" component={InventoryItemDetails} />
        <Route path="/Inventory" exact component={InventoryListComponent} />
        <Route path="/addInventory" component={AddInventoryItem} />

        <Route path="/edit/warehouse/:warehouseId/" component={EditWarehouse} />
        <Route path="/edit/inventory/:inventoryId/" component={EditInventoryItem} />

      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
