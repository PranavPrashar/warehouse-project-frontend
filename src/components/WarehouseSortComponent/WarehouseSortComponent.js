import React from "react";
import "./WarehouseSortComponent.scss";

import sortIcon from "../../assets/icons/sort-24px.svg";
function WarehouseSortComponent() {
  return (
    <>
      <div className="warehouse__sort--container">
        <div className="warehouse__sort">
          <div className="warehouse__sort--column">
            Warehouse
            <img src={sortIcon} alt="Sort Icon" />
          </div>
          <div className="warehouse__sort--column">
            Address <img src={sortIcon} alt="Sort Icon" />
          </div>
          <div className="warehouse__sort--column">
            Contact Name <img src={sortIcon} alt="Sort Icon" />
          </div>
          <div className="warehouse__sort--column">
            Contact Information <img src={sortIcon} alt="Sort Icon" />
          </div>
          <div className="warehouse__sort--column">Actions</div>
        </div>
      </div>
    </>
  );
}

export default WarehouseSortComponent;
