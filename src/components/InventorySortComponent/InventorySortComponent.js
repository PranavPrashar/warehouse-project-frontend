import React from "react";
import sortIcon from "../../assets/icons/sort-24px.svg";
function InventorySortComponent() {
  return (
    <>
      <div className="warehouse__sort--container">
        <div className="warehouse__sort">
          <div className="warehouse__sort--column">
            Inventory Item
            <img src={sortIcon} alt="Sort Icon" />
          </div>
          <div className="warehouse__sort--column">
            Category <img src={sortIcon} alt="Sort Icon" />
          </div>
          <div className="warehouse__sort--column">
            Status <img src={sortIcon} alt="Sort Icon" />
          </div>
          <div className="warehouse__sort--column">
            Quantity <img src={sortIcon} alt="Sort Icon" />
          </div>
          <div className="warehouse__sort--column">Actions</div>
        </div>
      </div>
    </>
  );
}

export default InventorySortComponent;
