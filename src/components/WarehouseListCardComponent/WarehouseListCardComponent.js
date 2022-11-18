import React, { useState } from "react";
import DeleteWarehouseModal from "../DeleteWarehouseModal/DeleteWarehouseModal.jsx";
import "./WarehouseListCardComponent.scss";
import garbageLogo from "../../assets/icons/delete_outline-24px.svg";
import pencilLogo from "../../assets/icons/edit-24px.svg";
import rightChevron from "../../assets/icons/chevron_right-24px.svg";
import { NavLink, useNavigate } from "react-router-dom";

function WarehouseListCardComponent(props) {
  const navigate = useNavigate();
  // console.log("Warehouse", props);
  const handlePencilClick = (warehouseId) => {
    // props.history.push(`/edit/warehouse/${warehouseId}`)
    navigate(`/edit/warehouse/${warehouseId}`)
  }


  const [openModal, setOpenModal] = useState(false);

  const handleDeleteClick = (warehouseId) => {
    props.setSelectedWarehouse(warehouseId);
    setOpenModal(true);
  }

  if (props.warehouses) {
    return props.warehouses.map((warehouse) => {
      return (
          <div key={warehouse.id} className="cardcomponent">
            <div className="cardcomponent__container">
              <div className="cardcomponent__left">
                <div className="cardcomponent__left--warehouse">
                  <p className="cardcomponent__left--warehouse--header">
                    warehouse
                  </p>
                  <NavLink
                    to={`warehouse/${warehouse.id}`}
                    className="cardcomponent__left--warehouse--city__chevron"
                  >
                    <p className="cardcomponent__left--warehouse--city__chevron">
                      {warehouse.name}{" "}
                      <img src={rightChevron} alt="right chevron" />
                    </p>
                  </NavLink>
                </div>
                <div className="cardcomponent__left--address">
                  <p className="cardcomponent__left--address--header">
                    Address
                  </p>
                  <p className="cardcomponent__left--address--city">
                    {warehouse.address}
                  </p>
                </div>
              </div>
              <div className="cardcomponent__right">
                <div className="cardcomponent__right--contact">
                  <p className="cardcomponent__right--contact--header">
                    Contact Name
                  </p>
                  <p className="cardcomponent__right--contact--name">
                    {warehouse.contact.name}
                  </p>
                </div>
                <div className="cardcomponent__right--contactinfo">
                  <p className="cardcomponent__right--contactinfo--header">
                    contact information
                  </p>
                  <p className="cardcomponent__right--contactinfo--name">
                    {warehouse.contact.phone}
                  </p>
                  <p className="cardcomponent__right--contactinfo--name">
                    {warehouse.contact.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="cardcomponent__lower">
              <div className="cardcomponent__lower--img">
                <img onClick={() => {
                  handleDeleteClick(warehouse.id);
                  // console.log(props.selectedWarehouse);
                }}  src={garbageLogo} alt="garbage logo" />
                {openModal && <DeleteWarehouseModal selectedWarehouse={props.selectedWarehouse} closeModal={setOpenModal}/>}
              </div>
              <div className="cardcomponent__lower--img">
                <img onClick={() => {
                  handlePencilClick(warehouse.id)
                }} src={pencilLogo} alt="pencil logo" />
              </div>
            </div>
          </div>
      );
    });
  }
}

export default WarehouseListCardComponent;