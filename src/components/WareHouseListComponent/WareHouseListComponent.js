import axios from "axios";
import React, { Component } from "react";
import "./WareHouseListComponent.scss";
import { NavLink } from "react-router-dom";
import WarehouseListCardComponent from "../WarehouseListCardComponent/WarehouseListCardComponent";
import WarehouseSortComponent from "../WarehouseSortComponent/WarehouseSortComponent";

export default class WareHouseListComponent extends Component {
  state = {
    warehouses: [],
    selectedWarehouse: [],
  };

  setSelectedWarehouse = (warehouseId) => {
    const selectedWarehouse = this.state.warehouses.find((warehouse) => warehouseId === warehouse.id)
    this.setState({
      selectedWarehouse: selectedWarehouse
    })
  }

  fetchWarehouseInventory = (warehouseId) => {
    axios
      .get(`http://localhost:6060/warehouse/${warehouseId}`)
      .then((response) => {
        // console.log(response.data);
      })
      .then((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    axios
      .get("http://localhost:6060/warehouse")
      .then((response) => {
        this.setState({ warehouses: response.data });
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
  render() {

    return (
      <>
        <div className="warehouse">
          <div className="warehouse__top">
            <h1 className="warehouse__top--header">Warehouses</h1>
            <div className="postion__right">
              <textarea
                placeholder="Search..."
                className="warehouse__top--search"
                rows={1}
              ></textarea>
              <div className="warehouse--button">
                <div className="warehouse__top--button">
                  <NavLink
                    to="/addWarehouse"
                    className="warehouse__top--button--text"
                  >
                    + Add New Warehouse
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className="warehouse__bottom">
            <WarehouseSortComponent />
            <WarehouseListCardComponent selectedWarehouse={this.state.selectedWarehouse} setSelectedWarehouse={this.setSelectedWarehouse} history={this.props.history} warehouses={this.state.warehouses} />
          </div>
        </div>
      </>
    );
  }
}
