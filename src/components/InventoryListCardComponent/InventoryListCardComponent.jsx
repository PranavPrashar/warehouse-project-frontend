import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteInventoryModal from "../DeleteInventoryModal/DeleteInventoryModal";
import "./InventoryListCardComponent.scss";
import editLogo from "../../assets/icons/edit-24px.svg";
import deleteLogo from "../../assets/icons/delete_outline-24px.svg";
import rightChevron from "../../assets/icons/chevron_right-24px.svg";
import { Link } from "react-router-dom";

function InventoryListCardComponent(props) {
  // console.log("Inventory", props);
  const [openModal, setOpenModal] = useState(false);

  const handleInvDeleteClick = (inventoryId) => {
    props.setSelectedInventory(inventoryId);
    setOpenModal(true);
  };

  if (props.inventories) {
    return props.inventories.map((inventory) => {
      return (
        <article key={inventory.id} className="inv__cardcomponent">
          <section className="inv__cardcomponent__inventory">
            <div className="inv__cardcomponent__inventory__left">
              <div className="inv__cardcomponent__inventory__left--item">
                <h4 className="mobile__header">inventory item</h4>
                <Link to ={`/inventory/${inventory.id}`} className="inv__cardcomponent--textdecoration">
                  <h3 className="inv__cardcomponent__inventory__left--item--color">
                    {inventory.itemName}
                    <img src={rightChevron} alt="right chevron" />
                  </h3>
                </Link>
              </div>
              <div className="inv__cardcomponent__inventory__left--category">
                <h4 className="mobile__header">category</h4>
                <p>{inventory.category}</p>
              </div>
            </div>
            <div className="inv__cardcomponent__inventory__right">
              <div className="inv__cardcomponent__inventory__right--status">
                <h4 className="mobile__header">status</h4>
                <h4>{inventory.status}</h4>
              </div>
              <div className="inv__cardcomponent__inventory__right--qty">
                <h4 className="mobile__header">qty</h4>
                <p>{inventory.quantity}</p>
              </div>
              <div className="inv__cardcomponent__inventory__right--warehouse">
                <h4 className="mobile__header">warehouse</h4>
                <p>{inventory.warehouseName}</p>
              </div>
            </div>
          </section>
          <section className="inv__cardcomponent__action">
            <div className="inv__cardcomponent__action--img">
              <img
                onClick={() => {
                  handleInvDeleteClick(inventory.id);
                  console.log(props.selectedInventory);
                }}
                src={deleteLogo}
                alt="garbage logo"
              />
              {openModal && (
                <DeleteInventoryModal
                  selectedInventory={props.selectedInventory}
                  closeModal={setOpenModal}
                />
              )}
            </div>
            <NavLink
              to={`/edit/inventory/${inventory.id}/`}
              className="inv__cardcomponent__action--img"
            >
              <img src={editLogo} alt="pencil logo" />
            </NavLink>
          </section>
        </article>
      );
    });
  }
}

export default InventoryListCardComponent;
