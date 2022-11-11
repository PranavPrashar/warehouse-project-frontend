import React, { Component, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./InventoryItemDetails.scss";
import pencilLogo from "../../assets/icons/edit-24px-white.svg";
import arrowbackIcon from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
// import chevronRight from "../../assets/icons/chevron_right-24px.svg";
// import garbageLogo from "../../assets/icons/delete_outline-24px.svg";

export default function InventoryItemDetails() {
  const [currentProduct, setcurrentProduct] = useState([]);
  const params = useParams();
  const history = useHistory();

  const handleBackClick = (event) => {
    event.preventDefault();
    history.goBack();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:6060/inventory/${params.itemID}`)
      .then((response) => {
        // console.log(response.data);
        // this.setState({ currentProduct: response.data });
        setcurrentProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      <div className="inventoryitemdetails">
        <div className="inventoryitemdetails__top">
          <div className="inventoryitemdetails__top--left">
            <img
              onClick={handleBackClick}
              className="inventoryitemdetails__img"
              src={arrowbackIcon}
              alt="arrow back icon"
            />
            {currentProduct.itemName}
          </div>
          <div className="inventoryitemdetails__top--right">
            <Link
              to={`/edit/inventory/${params.itemID}`}
              className="inventoryitemdetails__top--right--button"
            >
              <img src={pencilLogo} alt="pencil icon" />
              <p>Edit</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="inventoryitemdetails__lower">
        <div className="inventoryitemdetails__lower--left">
          <p className="inventoryitemdetails--header">Inventory Description:</p>
          <p className="inventoryitemdetails--text">
            {currentProduct.description}
          </p>
          <p className="inventoryitemdetails--header">Category:</p>
          <p className="inventoryitemdetails--text">
            {currentProduct.category}
          </p>
        </div>
        <div className="inventoryitemdetails__lower--right">
          <div className="inventoryitemdetails__lower--right--top">
            <div>
              <p className="inventoryitemdetails--header">Status</p>
              {/* inventoryitemdetails__item--right--instock */}
              <p
                className={
                  currentProduct.status === "Out of Stock"
                    ? "inventoryitemdetails__item--right--outstock"
                    : "inventoryitemdetails__item--right--instock "
                }
              >
                <span className="">
                  {currentProduct.status === "Out of Stock"
                    ? "Out of Stock"
                    : "In Stock"}
                </span>
              </p>
            </div>
            <div>
              <p className="inventoryitemdetails--header">quantity</p>
              <p className="inventoryitemdetails--text">
                {currentProduct.quantity}
              </p>
            </div>
          </div>

          <div>
            <p className="inventoryitemdetails--header">Warehouse</p>
            <p className="inventoryitemdetails--text">
              {currentProduct.warehouseName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// export default class InventoryItemDetails extends Component {
//   state = {
//     currentProduct: [],
//   };
//   componentDidMount() {
//     // console.log(this.props.match.params.itemID);
//     axios
//       .get(`http://localhost:6060/inventory/${this.props.match.params.itemID}`)
//       .then((response) => {
//         // console.log(response.data);
//         this.setState({ currentProduct: response.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   render() {
//     const handleBackClick = (event) => {
//       event.preventDefault();
//       this.props.history.goBack();
//     };

//     return (
//       <>
//         <div className="inventoryitemdetails">
//           <div className="inventoryitemdetails__top">
//             <div className="inventoryitemdetails__top--left">
//               <img
//                 onClick={handleBackClick}
//                 className="inventoryitemdetails__img"
//                 src={arrowbackIcon}
//                 alt="arrow back icon"
//               />
//               {this.state.currentProduct.itemName}
//             </div>
//             <div className="inventoryitemdetails__top--right">
//               <Link
//                 to={`/edit/inventory/${this.props.match.params.itemID}`}
//                 className="inventoryitemdetails__top--right--button"
//               >
//                 <img src={pencilLogo} alt="pencil icon" />
//                 <p>Edit</p>
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="inventoryitemdetails__lower">
//           <div className="inventoryitemdetails__lower--left">
//             <p className="inventoryitemdetails--header">
//               Inventory Description:
//             </p>
//             <p className="inventoryitemdetails--text">
//               {this.state.currentProduct.description}
//             </p>
//             <p className="inventoryitemdetails--header">Category:</p>
//             <p className="inventoryitemdetails--text">
//               {this.state.currentProduct.category}
//             </p>
//           </div>
//           <div className="inventoryitemdetails__lower--right">
//             <div className="inventoryitemdetails__lower--right--top">
//               <div>
//                 <p className="inventoryitemdetails--header">Status</p>
//                 {/* inventoryitemdetails__item--right--instock */}
//                 <p
//                   className={
//                     this.state.currentProduct.status === "Out of Stock"
//                       ? "inventoryitemdetails__item--right--outstock"
//                       : "inventoryitemdetails__item--right--instock "
//                   }
//                 >
//                   <span className="">
//                     {this.state.currentProduct.status === "Out of Stock"
//                       ? "Out of Stock"
//                       : "In Stock"}
//                   </span>
//                 </p>
//               </div>
//               <div>
//                 <p className="inventoryitemdetails--header">quantity</p>
//                 <p className="inventoryitemdetails--text">
//                   {this.state.currentProduct.quantity}
//                 </p>
//               </div>
//             </div>

//             <div>
//               <p className="inventoryitemdetails--header">Warehouse</p>
//               <p className="inventoryitemdetails--text">
//                 {this.state.currentProduct.warehouseName}
//               </p>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
