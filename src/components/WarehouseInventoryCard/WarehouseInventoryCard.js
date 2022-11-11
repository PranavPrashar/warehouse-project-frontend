import React, { Component } from "react";
import "./WarehouseInventoryCard.scss";

import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import garbageLogo from "../../assets/icons/delete_outline-24px.svg";
import pencilLogo from "../../assets/icons/edit-24px.svg";

import axios from "axios";
import { NavLink, useHistory, useParams } from "react-router-dom";
import WarehouseInventoryComponent from "../WarehouseInventoryComponent/WarehouseInventoryComponent";
import InventorySortComponent from "../InventorySortComponent/InventorySortComponent";
import { useState, useEffect } from "react";

function WarehouseInventoryCard() {
  const [currentWareHouse, setCurrentWareHouse] = useState([]);
  const [warehouseInventory, setwarehouseInventory] = useState([]);
  const history = useHistory();
  const params = useParams();
  // console.log(params.warehouseId);

  const handlePencilClick = (inventoryItemId) => {
    history.push(`/edit/inventory/${inventoryItemId}`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:6060/warehouse/search/${params.warehouseId}`)
      .then((response) => {
        // console.log("Warehouse Data", response.data);
        // this.setState({ currentWarehouse: response.data });
        setCurrentWareHouse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:6060/warehouse/${params.warehouseId}`)
      .then((response) => {
        // console.log(response.data);
        // this.setState({ warehouseInventory: response.data });
        setwarehouseInventory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      <div className="warehouseinventorycard__container">
        <WarehouseInventoryComponent
          history={history}
          warehouseInfo={currentWareHouse}
        />
        <div className="warehouseinventorycard">
          <div className="warehouseinventorycard__top">
            <p className="warehouseinventorycard--header">Warehouse Address</p>
            <p className="warehouseinventorycard--address">
              {/* 33 Pearl Street SW, Washington, USA */}
              {currentWareHouse.address}
              {/* {this.state.currentWarehouse.address} */}
            </p>
          </div>
          <div className="warehouseinventorycard__bottom">
            <div className="warehouseinventorycard__bottom--left">
              <p className="warehouseinventorycard--header">Contact Name</p>
              <p className="warehouseinventorycard--address">
                {/* Graeme Lyon */}
                {/* {this.state.currentWarehouse.contact?.name} */}
                {currentWareHouse.contact?.name}
              </p>
              <p className="warehouseinventorycard--address">
                Warehouse Manager
                {/* {this.state.currentWarehouse.contact?.postion} */}
                {currentWareHouse.contact?.postion}
              </p>
            </div>
            <div className="warehouseinventorycard__bottom--right">
              <p className="warehouseinventorycard--header">
                Contact Information
              </p>
              <p className="warehouseinventorycard--address">
                {currentWareHouse.contact?.phone}
              </p>
              <p className="warehouseinventorycard--address">
                {currentWareHouse.contact?.email}
              </p>
            </div>
          </div>
        </div>
        <InventorySortComponent />
        <div className="warehouseinventorycard__item">
          {warehouseInventory.map((item) => {
            return (
              <div key={item.id}>
                <div className="warehouseinventorycard__item--left">
                  <div className="warehouseinventorycard__item--left--container">
                    <p className="warehouseinventorycard--header">
                      Inventory Item
                    </p>
                    <p className="warehouseinventorycard__item--left--link">
                      <NavLink
                        to={`/inventory/${item.id}`}
                        className="warehouseinventorycard__item--left--link"
                      >
                        {item.itemName}
                        <img
                          src={chevronRight}
                          alt="chevron right"
                          className="chevron__icon"
                        />
                      </NavLink>
                    </p>
                  </div>
                  <div className="warehouseinventorycard__item--left-category">
                    <p className="warehouseinventorycard--header">Category</p>
                    <p className="warehouseinventorycard--address">
                      {item.category}
                    </p>
                  </div>
                </div>
                <div className="warehouseinventorycard__item--right">
                  <div className="warehouseinventorycard__item--right--status">
                    <p className="warehouseinventorycard--header">Status</p>
                    {/* warehouseinventorycard__item--right--instock */}
                    <p
                      className={
                        item.status === "Out of Stock"
                          ? "warehouseinventorycard__item--right--outstock"
                          : "warehouseinventorycard__item--right--instock "
                      }
                    >
                      <span className="">
                        {item.status === "Out of Stock"
                          ? "Out of Stock"
                          : "In Stock"}
                      </span>
                    </p>
                  </div>
                  <div className="warehouseinventorycard__item--right--qty">
                    <p className="warehouseinventorycard--header">qty</p>
                    <p className="warehouseinventorycard--address">
                      {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="warehouseinventorycard__item--button">
                  <div className="warehouseinventorycard__item--button--img">
                    <img src={garbageLogo} alt="garbage logo" />
                  </div>
                  <div className="warehouseinventorycard__item--button--img">
                    <img
                      className="warehouseinventorycard__img"
                      onClick={() => {
                        handlePencilClick(item.id);
                      }}
                      src={pencilLogo}
                      alt="pencil logo"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default WarehouseInventoryCard;

// class WarehouseInventoryCard extends Component {
//   state = {
//     currentWarehouse: [],
//     warehouseInventory: [],
//   };

//   componentDidMount() {
//     // console.log(this.props.match.params.warehouseId);
//     axios
//       .get(
//         `http://localhost:6060/warehouse/search/${this.props.match.params.warehouseId}`
//       )
//       .then((response) => {
//         // console.log("Warehouse Data", response.data);
//         this.setState({ currentWarehouse: response.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     axios
//       .get(
//         `http://localhost:6060/warehouse/${this.props.match.params.warehouseId}`
//       )
//       .then((response) => {
//         // console.log(response.data);
//         this.setState({ warehouseInventory: response.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   render() {
//     const handlePencilClick = (inventoryItemId) => {
//       this.props.history.push(`/edit/inventory/${inventoryItemId}`);
//     };

//     return (
//       <>
//         <div className="warehouseinventorycard__container">
//           <WarehouseInventoryComponent
//             history={this.props.history}
//             warehouseInfo={this.state.currentWarehouse}
//           />
//           <div className="warehouseinventorycard">
//             <div className="warehouseinventorycard__top">
//               <p className="warehouseinventorycard--header">
//                 Warehouse Address
//               </p>
//               <p className="warehouseinventorycard--address">
//                 {/* 33 Pearl Street SW, Washington, USA */}
//                 {this.state.currentWarehouse.address}
//               </p>
//             </div>
//             <div className="warehouseinventorycard__bottom">
//               <div className="warehouseinventorycard__bottom--left">
//                 <p className="warehouseinventorycard--header">Contact Name</p>
//                 <p className="warehouseinventorycard--address">
//                   {/* Graeme Lyon */}
//                   {this.state.currentWarehouse.contact?.name}
//                 </p>
//                 <p className="warehouseinventorycard--address">
//                   Warehouse Manager
//                   {this.state.currentWarehouse.contact?.postion}
//                 </p>
//               </div>
//               <div className="warehouseinventorycard__bottom--right">
//                 <p className="warehouseinventorycard--header">
//                   Contact Information
//                 </p>
//                 <p className="warehouseinventorycard--address">
//                   {this.state.currentWarehouse.contact?.phone}
//                 </p>
//                 <p className="warehouseinventorycard--address">
//                   {this.state.currentWarehouse.contact?.email}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <InventorySortComponent />
//           <div className="warehouseinventorycard__item">
//             {this.state.warehouseInventory.map((item) => {
//               return (
//                 <div key={item.id}>
//                   <div className="warehouseinventorycard__item--left">
//                     <div className="warehouseinventorycard__item--left--container">
//                       <p className="warehouseinventorycard--header">
//                         Inventory Item
//                       </p>
//                       <p className="warehouseinventorycard__item--left--link">
//                         <NavLink
//                           to={`/inventory/${item.id}`}
//                           className="warehouseinventorycard__item--left--link"
//                         >
//                           {item.itemName}
//                           <img
//                             src={chevronRight}
//                             alt="chevron right"
//                             className="chevron__icon"
//                           />
//                         </NavLink>
//                       </p>
//                     </div>
//                     <div className="warehouseinventorycard__item--left-category">
//                       <p className="warehouseinventorycard--header">Category</p>
//                       <p className="warehouseinventorycard--address">
//                         {item.category}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="warehouseinventorycard__item--right">
//                     <div className="warehouseinventorycard__item--right--status">
//                       <p className="warehouseinventorycard--header">Status</p>
//                       {/* warehouseinventorycard__item--right--instock */}
//                       <p
//                         className={
//                           item.status === "Out of Stock"
//                             ? "warehouseinventorycard__item--right--outstock"
//                             : "warehouseinventorycard__item--right--instock "
//                         }
//                       >
//                         <span className="">
//                           {item.status === "Out of Stock"
//                             ? "Out of Stock"
//                             : "In Stock"}
//                         </span>
//                       </p>
//                     </div>
//                     <div className="warehouseinventorycard__item--right--qty">
//                       <p className="warehouseinventorycard--header">qty</p>
//                       <p className="warehouseinventorycard--address">
//                         {item.quantity}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="warehouseinventorycard__item--button">
//                     <div className="warehouseinventorycard__item--button--img">
//                       <img src={garbageLogo} alt="garbage logo" />
//                     </div>
//                     <div className="warehouseinventorycard__item--button--img">
//                       <img
//                         className="warehouseinventorycard__img"
//                         onClick={() => {
//                           handlePencilClick(item.id);
//                         }}
//                         src={pencilLogo}
//                         alt="pencil logo"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default WarehouseInventoryCard;
