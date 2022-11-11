import { Link } from "react-router-dom";
// import pencilIcon from "../../assets/icons/edit-24px.svg";
import pencilIcon from "../../assets/icons/edit-24px-white.svg";
import arrowbackIcon from "../../assets/icons/arrow_back-24px.svg";
import "./WarehouseInventoryComponent.scss";

function WarehouseInventoryComponent(props) {
  const handleBackClick = (event) => {
    event.preventDefault();
    props.history.push("/");
  };

  if (Object.keys(props.warehouseInfo).length !== 0) {
    return (
      <>
        <div className="warehouseinventory">
          <div className="warehouseinventory__top">
            <div className="warehouseinventory__top--left">
              <img
                onClick={handleBackClick}
                className="warehouseinventory__img"
                src={arrowbackIcon}
                alt="arrow back icon"
              />
              {props.warehouseInfo.city}
            </div>
            <Link
              to={`/edit/warehouse/${props.warehouseInfo.id}`}
              className="removeTextdecoration"
            >
              <div className="warehouseinventory__top--right">
                <img src={pencilIcon} alt="pencil icon" />
                <p className="warehouseinventory__top--right--button">Edit</p>
              </div>
            </Link>
          </div>
        </div>
        <div>{/* <WarehouseInventoryCard /> */}</div>
      </>
    );
  }
}

export default WarehouseInventoryComponent;
