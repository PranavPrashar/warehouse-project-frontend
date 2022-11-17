import React, { Component } from "react";
import "./AddNewWarehouse.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";
import error from "../../assets/icons/error-24px.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddNewWarehouse() {
  const [inputClass, setInputClass] = useState(null);
  const [errorLabel, setErrorLabel] = useState(
    "add-warehouse-form__error-hidden"
  );
  const navigate = useNavigate();

  const handleCancelClick = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (
      event.target[0].value &&
      event.target[1].value &&
      event.target[2].value &&
      event.target[3].value &&
      event.target[4].value &&
      event.target[5].value &&
      event.target[6].value &&
      event.target[7].value
    ) {
      axios
        .post("http://localhost:6060/warehouse", {
          name: event.target[0].value,
          address: event.target[1].value,
          city: event.target[2].value,
          country: event.target[3].value,
          contact: {
            name: event.target[4].value,
            position: event.target[5].value,
            phone: event.target[6].value,
            email: event.target[7].value,
          },
        })
        .then((response) => {
          // console.log(response);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (
      !event.target[0].value ||
      !event.target[1].value ||
      !event.target[2].value ||
      !event.target[3].value ||
      !event.target[4].value ||
      !event.target[5].value ||
      !event.target[6].value ||
      !event.target[7].value
    ) {
      setErrorLabel(null);
      setInputClass("add-warehouse-form__input--error");
      // this.setState({
      //   inputClass: "add-warehouse-form__input--error",
      //   errorLabel: null,
      // });
    }
  };
  return (
    <main className="add-warehouse">
      <div className="add-warehouse__title-wrapper">
        <img
          onClick={handleCancelClick}
          className="add-warehouse__back-arrow"
          src={backArrow}
          alt="Back Arrow"
        />
        <h1 className="add-warehouse__title">Add New Warehouse</h1>
      </div>

      <form
        className="add-warehouse-form"
        onSubmit={handleFormSubmit}
        type="submit"
        id="add-warehouse-form"
      >
        <section className="add-warehouse-form__article-wrapper">
          <article className="add-warehouse-form__warehouse-details">
            <h2>Warehouse Details</h2>

            <div className="add-warehouse-form__input-wrapper">
              <label className="add-warehouse-form__label" id="name">
                Warehouse Name
              </label>
              <input
                placeholder="Warehouse Name"
                htmlFor="name"
                name="name"
                className={`add-warehouse-form__input ${inputClass}`}
                type="text"
              ></input>
              <label
                className={`add-warehouse-form__error-label ${errorLabel}`}
                id="error"
              >
                <img
                  className={`add-warehouse-form__error-label--img`}
                  src={error}
                  alt="exclamation"
                />{" "}
                This field is required
              </label>
              <label className="add-warehouse-form__label" id="address">
                Street Address
              </label>
              <input
                placeholder="Street Address"
                htmlFor="address"
                name="address"
                className={`add-warehouse-form__input ${inputClass}`}
                type="text"
              ></input>
              <label
                className={`add-warehouse-form__error-label ${errorLabel}`}
                id="error"
              >
                <img
                  className={`add-warehouse-form__error-label--img`}
                  src={error}
                  alt="exclamation"
                />{" "}
                This field is required
              </label>
              <label className="add-warehouse-form__label" id="city">
                City
              </label>
              <input
                placeholder="City"
                htmlFor="city"
                name="city"
                className={`add-warehouse-form__input ${inputClass}`}
                type="text"
              ></input>
              <label
                className={`add-warehouse-form__error-label ${errorLabel}`}
                id="error"
              >
                <img
                  className={`add-warehouse-form__error-label--img`}
                  src={error}
                  alt="exclamation"
                />{" "}
                This field is required
              </label>
              <label className="add-warehouse-form__label" id="country">
                Country
              </label>
              <input
                placeholder="Country"
                htmlFor="country"
                name="country"
                className={`add-warehouse-form__input ${inputClass}`}
                type="text"
              ></input>
              <label
                className={`add-warehouse-form__error-label ${errorLabel}`}
                id="error"
              >
                <img
                  className={`add-warehouse-form__error-label--img`}
                  src={error}
                  alt="exclamation"
                />{" "}
                This field is required
              </label>
            </div>
          </article>

          <article className="add-warehouse-form__contact-details">
            <h2>Contact Details</h2>

            <div className="add-warehouse-form__input-wrapper">
              <label className="add-warehouse-form__label" id="name">
                Contact Name
              </label>
              <input
                placeholder="Contact Name"
                htmlFor="name"
                name="name"
                className={`add-warehouse-form__input ${inputClass}`}
                type="text"
              ></input>
              <label
                className={`add-warehouse-form__error-label ${errorLabel}`}
                id="error"
              >
                <img
                  className={`add-warehouse-form__error-label--img`}
                  src={error}
                  alt="exclamation"
                />{" "}
                This field is required
              </label>
              <label className="add-warehouse-form__label" id="position">
                Position
              </label>
              <input
                placeholder="Position"
                htmlFor="position"
                name="position"
                className={`add-warehouse-form__input ${inputClass}`}
                type="text"
              ></input>
              <label
                className={`add-warehouse-form__error-label ${errorLabel}`}
                id="error"
              >
                <img
                  className={`add-warehouse-form__error-label--img`}
                  src={error}
                  alt="exclamation"
                />{" "}
                This field is required
              </label>
              <label className="add-warehouse-form__label" id="phone">
                Phone Number
              </label>
              <input
                placeholder="Phone Number"
                htmlFor="phone"
                name="phone"
                className={`add-warehouse-form__input ${inputClass}`}
                type="tel"
              ></input>
              <label
                className={`add-warehouse-form__error-label ${errorLabel}`}
                id="error"
              >
                <img
                  className={`add-warehouse-form__error-label--img`}
                  src={error}
                  alt="exclamation"
                />{" "}
                This field is required
              </label>
              <label className="add-warehouse-form__label" id="email">
                Email
              </label>
              <input
                placeholder="Email"
                htmlFor="email"
                name="email"
                className={`add-warehouse-form__input ${inputClass}`}
                type="email"
              ></input>
              <label
                className={`add-warehouse-form__error-label ${errorLabel}`}
                id="error"
              >
                <img
                  className={`add-warehouse-form__error-label--img`}
                  src={error}
                  alt="exclamation"
                />{" "}
                This field is required
              </label>
            </div>
          </article>
        </section>

        <section className="add-warehouse-form__button-wrapper">
          <button
            className="add-warehouse-form__cancel-button"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            form="add-warehouse-form"
            className="add-warehouse-form__add-button"
          >
            + Add Warehouse
          </button>
        </section>
      </form>
    </main>
  );
}

// class AddNewWarehouse extends Component {
//   state = {
//     inputClass: null,
//     errorLabel: "add-warehouse-form__error-hidden",
//   };

//   handleFormSubmit = (event) => {
//     event.preventDefault();
//     // console.log("Add Warehouse Form Submitted");

//     if (
//       event.target[0].value &&
//       event.target[1].value &&
//       event.target[2].value &&
//       event.target[3].value &&
//       event.target[4].value &&
//       event.target[5].value &&
//       event.target[6].value &&
//       event.target[7].value
//     ) {
//       axios
//         .post("http://localhost:6060/warehouse", {
//           name: event.target[0].value,
//           address: event.target[1].value,
//           city: event.target[2].value,
//           country: event.target[3].value,
//           contact: {
//             name: event.target[4].value,
//             position: event.target[5].value,
//             phone: event.target[6].value,
//             email: event.target[7].value,
//           },
//         })
//         .then((response) => {
//           // console.log(response);
//           this.props.history.push("/")
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else if (
//       !event.target[0].value ||
//       !event.target[1].value ||
//       !event.target[2].value ||
//       !event.target[3].value ||
//       !event.target[4].value ||
//       !event.target[5].value ||
//       !event.target[6].value ||
//       !event.target[7].value
//     ) {
//       this.setState({
//         inputClass: "add-warehouse-form__input--error",
//         errorLabel: null,
//       });
//     }

//   };

//   render() {

//     const handleCancelClick = (event) => {
//       event.preventDefault();
//       this.props.history.push("/")
//     }
//     return (
//       <main className="add-warehouse">
//         <div className="add-warehouse__title-wrapper">
//           <img
//             onClick={handleCancelClick}
//             className="add-warehouse__back-arrow"
//             src={backArrow}
//             alt="Back Arrow"
//           />
//           <h1 className="add-warehouse__title">Add New Warehouse</h1>
//         </div>

//         <form
//           className="add-warehouse-form"
//           onSubmit={this.handleFormSubmit}
//           type="submit"
//           id="add-warehouse-form"
//         >
//           <section className="add-warehouse-form__article-wrapper">
//             <article className="add-warehouse-form__warehouse-details">
//               <h2>Warehouse Details</h2>

//               <div className="add-warehouse-form__input-wrapper">
//                 <label className="add-warehouse-form__label" id="name">
//                   Warehouse Name
//                 </label>
//                 <input
//                   placeholder="Warehouse Name"
//                   htmlFor="name"
//                   name="name"
//                   className={`add-warehouse-form__input ${this.state.inputClass}`}
//                   type="text"
//                 ></input>
//                 <label
//                   className={`add-warehouse-form__error-label ${this.state.errorLabel}`}
//                   id="error"
//                 >
//                   <img
//                     className={`add-warehouse-form__error-label--img`}
//                     src={error}
//                     alt="exclamation"
//                   />{" "}
//                   This field is required
//                 </label>
//                 <label className="add-warehouse-form__label" id="address">
//                   Street Address
//                 </label>
//                 <input
//                   placeholder="Street Address"
//                   htmlFor="address"
//                   name="address"
//                   className={`add-warehouse-form__input ${this.state.inputClass}`}
//                   type="text"
//                 ></input>
//                 <label
//                   className={`add-warehouse-form__error-label ${this.state.errorLabel}`}
//                   id="error"
//                 >
//                   <img
//                     className={`add-warehouse-form__error-label--img`}
//                     src={error}
//                     alt="exclamation"
//                   />{" "}
//                   This field is required
//                 </label>
//                 <label className="add-warehouse-form__label" id="city">
//                   City
//                 </label>
//                 <input
//                   placeholder="City"
//                   htmlFor="city"
//                   name="city"
//                   className={`add-warehouse-form__input ${this.state.inputClass}`}
//                   type="text"
//                 ></input>
//                 <label
//                   className={`add-warehouse-form__error-label ${this.state.errorLabel}`}
//                   id="error"
//                 >
//                   <img
//                     className={`add-warehouse-form__error-label--img`}
//                     src={error}
//                     alt="exclamation"
//                   />{" "}
//                   This field is required
//                 </label>
//                 <label className="add-warehouse-form__label" id="country">
//                   Country
//                 </label>
//                 <input
//                   placeholder="Country"
//                   htmlFor="country"
//                   name="country"
//                   className={`add-warehouse-form__input ${this.state.inputClass}`}
//                   type="text"
//                 ></input>
//                 <label
//                   className={`add-warehouse-form__error-label ${this.state.errorLabel}`}
//                   id="error"
//                 >
//                   <img
//                     className={`add-warehouse-form__error-label--img`}
//                     src={error}
//                     alt="exclamation"
//                   />{" "}
//                   This field is required
//                 </label>
//               </div>
//             </article>

//             <article className="add-warehouse-form__contact-details">
//               <h2>Contact Details</h2>

//               <div className="add-warehouse-form__input-wrapper">
//                 <label className="add-warehouse-form__label" id="name">
//                   Contact Name
//                 </label>
//                 <input
//                   placeholder="Contact Name"
//                   htmlFor="name"
//                   name="name"
//                   className={`add-warehouse-form__input ${this.state.inputClass}`}
//                   type="text"
//                 ></input>
//                 <label
//                   className={`add-warehouse-form__error-label ${this.state.errorLabel}`}
//                   id="error"
//                 >
//                   <img
//                     className={`add-warehouse-form__error-label--img`}
//                     src={error}
//                     alt="exclamation"
//                   />{" "}
//                   This field is required
//                 </label>
//                 <label className="add-warehouse-form__label" id="position">
//                   Position
//                 </label>
//                 <input
//                   placeholder="Position"
//                   htmlFor="position"
//                   name="position"
//                   className={`add-warehouse-form__input ${this.state.inputClass}`}
//                   type="text"
//                 ></input>
//                 <label
//                   className={`add-warehouse-form__error-label ${this.state.errorLabel}`}
//                   id="error"
//                 >
//                   <img
//                     className={`add-warehouse-form__error-label--img`}
//                     src={error}
//                     alt="exclamation"
//                   />{" "}
//                   This field is required
//                 </label>
//                 <label className="add-warehouse-form__label" id="phone">
//                   Phone Number
//                 </label>
//                 <input
//                   placeholder="Phone Number"
//                   htmlFor="phone"
//                   name="phone"
//                   className={`add-warehouse-form__input ${this.state.inputClass}`}
//                   type="tel"
//                 ></input>
//                 <label
//                   className={`add-warehouse-form__error-label ${this.state.errorLabel}`}
//                   id="error"
//                 >
//                   <img
//                     className={`add-warehouse-form__error-label--img`}
//                     src={error}
//                     alt="exclamation"
//                   />{" "}
//                   This field is required
//                 </label>
//                 <label className="add-warehouse-form__label" id="email">
//                   Email
//                 </label>
//                 <input
//                   placeholder="Email"
//                   htmlFor="email"
//                   name="email"
//                   className={`add-warehouse-form__input ${this.state.inputClass}`}
//                   type="email"
//                 ></input>
//                 <label
//                   className={`add-warehouse-form__error-label ${this.state.errorLabel}`}
//                   id="error"
//                 >
//                   <img
//                     className={`add-warehouse-form__error-label--img`}
//                     src={error}
//                     alt="exclamation"
//                   />{" "}
//                   This field is required
//                 </label>
//               </div>
//             </article>
//           </section>

//           <section className="add-warehouse-form__button-wrapper">
//             <button className="add-warehouse-form__cancel-button" onClick={handleCancelClick}>
//               Cancel
//             </button>
//             <button form="add-warehouse-form" className="add-warehouse-form__add-button">
//               + Add Warehouse
//             </button>
//           </section>
//           </form>
//       </main>
//     );
//   }
// }

export default AddNewWarehouse;
