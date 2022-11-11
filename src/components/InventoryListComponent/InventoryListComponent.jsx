import axios from "axios";
import React, { Component, useEffect } from "react";
import "./InventoryListComponent.scss";
import InventoryListCardComponent from "../InventoryListCardComponent/InventoryListCardComponent";
import searchIcon from "../../assets/icons/search-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function InventoryListComponent() {
  const [inventories, setinventories] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState([]);
  const history = useHistory();

  const setselectedInventory = (inventoryId) => {
    const selectedInventory = this.state.inventories.find(
      (inventory) => inventoryId === inventory.id
    );
    setSelectedInventory(selectedInventory);
  };

  const handleAddNewItemClick = (event) => {
    event.preventDefault();
    history.push("/addInventory");
  };

  useEffect(() => {
    axios // Fetching all inventory list from server
      .get(`http://localhost:6060/inventory`)
      .then((response) => {
        setinventories(response.data);
        // this.setState({ inventories: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <main className="inventory__page">
      <section className="inventory__page__header">
        <h1>Inventory</h1>
        <div className="inventory__page__header--search">
          <img
            className="inventory__page__header--search--icon"
            src={searchIcon}
            alt="Search Icon"
          />
          <input
            placeholder="Search..."
            className="inventory__page__header--search--box"
          />
        </div>
        <button
          onClick={handleAddNewItemClick}
          className="inventory__page__header--new--item"
        >
          {" "}
          + Add New Item
        </button>
      </section>
      <section className="inventory__page__titles">
        <h4 className="inventory__page__titles--header">
          inventory Item
          <img src={sortIcon} alt="Sort Icon" />
        </h4>
        <h4 className="inventory__page__titles--header">
          category
          <img src={sortIcon} alt="Sort Icon" />
        </h4>
        <h4 className="inventory__page__titles--header">
          status
          <img src={sortIcon} alt="Sort Icon" />
        </h4>
        <h4 className="inventory__page__titles--header">
          qty
          <img src={sortIcon} alt="Sort Icon" />
        </h4>
        <h4 className="inventory__page__titles--header">
          warehouse
          <img src={sortIcon} alt="Sort Icon" />
        </h4>
        <h4 className="inventory__page__titles--header">actions</h4>
      </section>
      <section className="inventory__page__content">
        <InventoryListCardComponent
          selectedInventory={selectedInventory}
          setSelectedInventory={setselectedInventory}
          inventories={inventories}
        />
      </section>
    </main>
  );
}

// class InventoryListComponent extends Component {
//   state = {
//     inventories: [],
//     selectedInventory: [],
//   };

//   setSelectedInventory = (inventoryId) => {
//     const selectedInventory = this.state.inventories.find(
//       (inventory) => inventoryId === inventory.id
//     );
//     this.setState({
//       selectedInventory: selectedInventory,
//     });
//   };

//   componentDidMount = () => {
//     axios // Fetching all inventory list from server
//       .get(`http://localhost:6060/inventory`)
//       .then((response) => {
//         this.setState({ inventories: response.data });
//         // console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   render() {
//     const handleAddNewItemClick = (event) => {
//       event.preventDefault();
//       this.props.history.push("/addInventory");
//     };

//     return (
//       <main className="inventory__page">
//         <section className="inventory__page__header">
//           <h1>Inventory</h1>
//           <div className="inventory__page__header--search">
//             <img
//               className="inventory__page__header--search--icon"
//               src={searchIcon}
//               alt="Search Icon"
//             />
//             <input
//               placeholder="Search..."
//               className="inventory__page__header--search--box"
//             />
//           </div>
//           <button
//             onClick={handleAddNewItemClick}
//             className="inventory__page__header--new--item"
//           >
//             {" "}
//             + Add New Item
//           </button>
//         </section>
//         <section className="inventory__page__titles">
//           <h4 className="inventory__page__titles--header">
//             inventory Item
//             <img src={sortIcon} alt="Sort Icon" />
//           </h4>
//           <h4 className="inventory__page__titles--header">
//             category
//             <img src={sortIcon} alt="Sort Icon" />
//           </h4>
//           <h4 className="inventory__page__titles--header">
//             status
//             <img src={sortIcon} alt="Sort Icon" />
//           </h4>
//           <h4 className="inventory__page__titles--header">
//             qty
//             <img src={sortIcon} alt="Sort Icon" />
//           </h4>
//           <h4 className="inventory__page__titles--header">
//             warehouse
//             <img src={sortIcon} alt="Sort Icon" />
//           </h4>
//           <h4 className="inventory__page__titles--header">actions</h4>
//         </section>
//         <section className="inventory__page__content">
//           <InventoryListCardComponent
//             selectedInventory={this.state.selectedInventory}
//             setSelectedInventory={this.setSelectedInventory}
//             inventories={this.state.inventories}
//           />
//         </section>
//       </main>
//     );
//   }
// }

export default InventoryListComponent;
