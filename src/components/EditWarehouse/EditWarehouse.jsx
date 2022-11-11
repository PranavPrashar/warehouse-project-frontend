import React, { Component } from "react";
import axios from "axios";
import "./EditWarehouse.scss";
import error from "../../assets/icons/error-24px.svg";
import backArrow from "../../assets/icons/arrow_back-24px.svg";

import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditWarehouse() {
  const [warehouseToEdit, setwarehouseToEdit] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [contact_name, setcontact_name] = useState("");
  const [contact_position, setcontact_position] = useState("");
  const [contact_phone, setcontact_phone] = useState("");
  const [contact_email, setcontact_email] = useState("");
  const [submitError, setsubmitError] = useState(false);
  const [inputClass, setinputClass] = useState(null);
  const [errorLabel, seterrorLabel] = useState(
    "edit-warehouse-form__error-hidden"
  );

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    warehouseToEditDetails();
  });
  const handleBackClick = (event) => {
    event.preventDefault();
    history.goBack();
  };
  const handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleContactName = (event) => {
    setcontact_name(event.target.value);
  };

  const handleContactPosition = (event) => {
    setcontact_position(event.target.value);
  };

  // submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log("Edit Warehouse Form Submitted");
    const warehouseToEditId = params.warehouseId;

    if (
      name &&
      address &&
      city &&
      country &&
      contact_name &&
      contact_position &&
      contact_phone &&
      contact_email
    ) {
      const updatedItem = {
        name: name,
        address: address,
        city: city,
        country: country,
        contact: {
          name: contact_name,
          position: contact_position,
          phone: contact_phone,
          email: contact_email,
        },
      };

      axios
        .put(
          `http://localhost:6060/warehouse/${warehouseToEditId}`,
          updatedItem
        )
        .then((response) => {
          // console.log(response);
          history.push("/");
        })
        .catch((error) => {
          // this.setState({ submitError: true });
          setsubmitError(true);
          // console.log(error);
        });

      // Form reset
      this.setState({
        name: "",
        address: "",
        city: "",
        country: "",
        contact_name: "",
        contact_position: "",
        contact_phone: "",
        contact_email: "",
      });
    } else if (
      !name ||
      !address ||
      !city ||
      !country ||
      !contact_name ||
      !contact_position ||
      !contact_phone ||
      !contact_email
    ) {
      setinputClass("edit-warehouse-form__input--error");
      seterrorLabel(null);
      setsubmitError(true);
    }
  };

  const warehouseToEditDetails = () => {
    const warehouseToEditId = params.warehouseId;
    axios
      .get(`http://localhost:6060/warehouse/search/${warehouseToEditId}`)
      .then((response) => {
        setwarehouseToEdit(true);
        setName(response.data.name);
        setAddress(response.data.address);
        setCity(response.data.city);
        setCountry(response.data.country);
        setcontact_name(response.data.contact.name);
        setcontact_position(response.data.contact.position);
        setcontact_phone(response.data.contact.phone);
        setcontact_email(response.data.contact.email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form">
      {warehouseToEdit ? (
        <main className="edit-warehouse">
          <div className="edit-warehouse__title-wrapper">
            <img
              onClick={handleBackClick}
              className="edit-warehouse__back-arrow"
              src={backArrow}
              alt="Back Arrow"
            />
            <h1 className="edit-warehouse__title">Edit Warehouse</h1>
          </div>

          <form
            className="edit-warehouse-form"
            onSubmit={handleFormSubmit}
            type="submit"
          >
            <section className="edit-warehouse-form__article-wrapper">
              <article className="edit-warehouse-form__warehouse-details">
                <h2>Warehouse Details</h2>

                <div className="edit-warehouse-form__input-wrapper">
                  <label className="edit-warehouse-form__label" id="name">
                    Warehouse Name
                  </label>
                  <input
                    // placeholder={this.state.name}
                    htmlFor="name"
                    name="name"
                    className={`edit-warehouse-form__input ${inputClass}`}
                    type="text"
                    onChange={handleNameChange}
                    value={name}
                  ></input>
                  <label
                    className={`edit-warehouse-form__error-label ${errorLabel}`}
                    id="error"
                  >
                    <img
                      className={`edit-warehouse-form__error-label--img`}
                      src={error}
                      alt="exclamation"
                    />{" "}
                    This field is required
                  </label>
                  <label className="edit-warehouse-form__label" id="editress">
                    Street editress
                  </label>
                  <input
                    // placeholder={this.state.address}
                    htmlFor="address"
                    name="address"
                    className={`edit-warehouse-form__input ${inputClass}`}
                    type="text"
                    onChange={handleAddressChange}
                    value={address}
                  ></input>
                  <label
                    className={`edit-warehouse-form__error-label ${errorLabel}`}
                    id="error"
                  >
                    <img
                      className={`edit-warehouse-form__error-label--img`}
                      src={error}
                      alt="exclamation"
                    />{" "}
                    This field is required
                  </label>
                  <label className="edit-warehouse-form__label" id="city">
                    City
                  </label>
                  <input
                    // placeholder={city}
                    htmlFor="city"
                    name="city"
                    className={`edit-warehouse-form__input ${inputClass}`}
                    type="text"
                    onChange={handleCityChange}
                    value={city}
                  ></input>
                  <label
                    className={`edit-warehouse-form__error-label ${errorLabel}`}
                    id="error"
                  >
                    <img
                      className={`edit-warehouse-form__error-label--img`}
                      src={error}
                      alt="exclamation"
                    />{" "}
                    This field is required
                  </label>
                  <label className="edit-warehouse-form__label" id="country">
                    Country
                  </label>
                  <input
                    // placeholder={this.state.warehouseToEdit.country}
                    htmlFor="country"
                    name="country"
                    className={`edit-warehouse-form__input ${inputClass}`}
                    type="text"
                    onChange={handleCountryChange}
                    value={country}
                  ></input>
                  <label
                    className={`edit-warehouse-form__error-label ${errorLabel}`}
                    id="error"
                  >
                    <img
                      className={`edit-warehouse-form__error-label--img`}
                      src={error}
                      alt="exclamation"
                    />{" "}
                    This field is required
                  </label>
                </div>
              </article>

              <article className="edit-warehouse-form__contact-details">
                <h2>Contact Details</h2>

                <div className="edit-warehouse-form__input-wrapper">
                  <label className="edit-warehouse-form__label" id="name">
                    Contact Name
                  </label>
                  <input
                    // placeholder={this.state.warehouseToEdit.contact.name}
                    htmlFor="name"
                    name="contact_name"
                    className={`edit-warehouse-form__input ${inputClass}`}
                    type="text"
                    onChange={handleContactName}
                    value={contact_name}
                  ></input>
                  <label
                    className={`edit-warehouse-form__error-label ${errorLabel}`}
                    id="error"
                  >
                    <img
                      className={`edit-warehouse-form__error-label--img`}
                      src={error}
                      alt="exclamation"
                    />{" "}
                    This field is required
                  </label>
                  <label className="edit-warehouse-form__label" id="position">
                    Position
                  </label>
                  <input
                    // placeholder={this.state.warehouseToEdit.contact.position}
                    htmlFor="position"
                    name="contact_position"
                    className={`edit-warehouse-form__input ${inputClass}`}
                    type="text"
                    onChange={handleContactPosition}
                    value={contact_position}
                  ></input>
                  <label
                    className={`edit-warehouse-form__error-label ${errorLabel}`}
                    id="error"
                  >
                    <img
                      className={`edit-warehouse-form__error-label--img`}
                      src={error}
                      alt="exclamation"
                    />{" "}
                    This field is required
                  </label>
                  <label className="edit-warehouse-form__label" id="phone">
                    Phone Number
                  </label>
                  <input
                    // placeholder={this.state.warehouseToEdit.contact.phone}
                    htmlFor="phone"
                    name="contact_phone"
                    className={`edit-warehouse-form__input ${inputClass}`}
                    type="tel"
                    onChange={handleChange}
                    value={contact_phone}
                  ></input>
                  <label
                    className={`edit-warehouse-form__error-label ${errorLabel}`}
                    id="error"
                  >
                    <img
                      className={`edit-warehouse-form__error-label--img`}
                      src={error}
                      alt="exclamation"
                    />{" "}
                    This field is required
                  </label>
                  <label className="edit-warehouse-form__label" id="email">
                    Email
                  </label>
                  <input
                    // placeholder={this.state.warehouseToEdit.contact.email}
                    htmlFor="email"
                    name="contact_email"
                    className={`edit-warehouse-form__input ${inputClass}`}
                    type="email"
                    onChange={handleChange}
                    value={contact_email}
                  ></input>
                  <label
                    className={`edit-warehouse-form__error-label ${errorLabel}`}
                    id="error"
                  >
                    <img
                      className={`edit-warehouse-form__error-label--img`}
                      src={error}
                      alt="exclamation"
                    />{" "}
                    This field is required
                  </label>
                </div>
              </article>
            </section>
            {submitError && (
              <p className="submitError">
                Cannot edit this warehouse, please fill out all fields
              </p>
            )}
            <section className="edit-warehouse-form__button-wrapper">
              <button
                className="edit-warehouse-form__cancel-button"
                onClick={handleBackClick}
              >
                Cancel
              </button>
              <button className="edit-warehouse-form__edit-button">Save</button>
            </section>
          </form>
          <p className="edit-warehouse__copyright">
            InStock Inc. All Rights Reserved
          </p>
        </main>
      ) : (
        <p>Page Loading...</p>
      )}
    </div>
  );
}

// class EditWarehouse extends Component {
//   state = {
//     warehouseToEdit: false,
//     name: "",
//     address: "",
//     city: "",
//     country: "",
//     contact_name: "",
//     contact_position: "",
//     contact_phone: "",
//     contact_email: "",
//     submitError: false,
//     inputClass: null,
//     errorLabel: "edit-warehouse-form__error-hidden",
//   };

//   warehouseToEditDetails = () => {
//     const warehouseToEditId = this.props.match.params.warehouseId;
//     axios
//       .get(`http://localhost:6060/warehouse/search/${warehouseToEditId}`)
//       .then((res) => {
//         this.setState({
//           warehouseToEdit: true,
//           name: res.data.name,
//           address: res.data.address,
//           city: res.data.city,
//           country: res.data.country,
//           contact_name: res.data.contact.name,
//           contact_position: res.data.contact.position,
//           contact_phone: res.data.contact.phone,
//           contact_email: res.data.contact.email,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   componentDidMount() {
//     this.warehouseToEditDetails();
//   }

//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   // submit
//   handleFormSubmit = (event) => {
//     event.preventDefault();
//     console.log("Edit Warehouse Form Submitted");
//     const warehouseToEditId = this.props.match.params.warehouseId;

//     if (
//       this.state.name &&
//       this.state.address &&
//       this.state.city &&
//       this.state.country &&
//       this.state.contact_name &&
//       this.state.contact_position &&
//       this.state.contact_phone &&
//       this.state.contact_email
//     ) {
//       const updatedItem = {
//         name: this.state.name,
//         address: this.state.address,
//         city: this.state.city,
//         country: this.state.country,
//         contact: {
//           name: this.state.contact_name,
//           position: this.state.contact_position,
//           phone: this.state.contact_phone,
//           email: this.state.contact_email,
//         },
//       };

//       axios
//         .put(
//           `http://localhost:6060/warehouse/${warehouseToEditId}`,
//           updatedItem
//         )
//         .then((response) => {
//           console.log(response);
//           this.props.history.push("/");
//         })
//         .catch((error) => {
//           this.setState({ submitError: true });
//           console.log(error);
//         });

//       // Form reset
//       this.setState({
//         name: "",
//         address: "",
//         city: "",
//         country: "",
//         contact_name: "",
//         contact_position: "",
//         contact_phone: "",
//         contact_email: "",
//       });
//     } else if (
//       !this.state.name ||
//       !this.state.address ||
//       !this.state.city ||
//       !this.state.country ||
//       !this.state.contact_name ||
//       !this.state.contact_position ||
//       !this.state.contact_phone ||
//       !this.state.contact_email
//     ) {
//       this.setState({
//         inputClass: "edit-warehouse-form__input--error",
//         errorLabel: null,
//         submitError: true,
//       });
//     }
//   };

//   render() {
//     const handleBackClick = (event) => {
//       event.preventDefault();
//       this.props.history.goBack();
//     };
//     return (
//       <div className="form">
//         {this.state.warehouseToEdit ? (
//           <main className="edit-warehouse">
//             <div className="edit-warehouse__title-wrapper">
//               <img
//                 onClick={handleBackClick}
//                 className="edit-warehouse__back-arrow"
//                 src={backArrow}
//                 alt="Back Arrow"
//               />
//               <h1 className="edit-warehouse__title">Edit Warehouse</h1>
//             </div>

//             <form
//               className="edit-warehouse-form"
//               onSubmit={this.handleFormSubmit}
//               type="submit"
//             >
//               <section className="edit-warehouse-form__article-wrapper">
//                 <article className="edit-warehouse-form__warehouse-details">
//                   <h2>Warehouse Details</h2>

//                   <div className="edit-warehouse-form__input-wrapper">
//                     <label className="edit-warehouse-form__label" id="name">
//                       Warehouse Name
//                     </label>
//                     <input
//                       // placeholder={this.state.name}
//                       htmlFor="name"
//                       name="name"
//                       className={`edit-warehouse-form__input ${this.state.inputClass}`}
//                       type="text"
//                       onChange={this.handleChange}
//                       value={this.state.name}
//                     ></input>
//                     <label
//                       className={`edit-warehouse-form__error-label ${this.state.errorLabel}`}
//                       id="error"
//                     >
//                       <img
//                         className={`edit-warehouse-form__error-label--img`}
//                         src={error}
//                         alt="exclamation"
//                       />{" "}
//                       This field is required
//                     </label>
//                     <label className="edit-warehouse-form__label" id="editress">
//                       Street editress
//                     </label>
//                     <input
//                       // placeholder={this.state.address}
//                       htmlFor="address"
//                       name="address"
//                       className={`edit-warehouse-form__input ${this.state.inputClass}`}
//                       type="text"
//                       onChange={this.handleChange}
//                       value={this.state.address}
//                     ></input>
//                     <label
//                       className={`edit-warehouse-form__error-label ${this.state.errorLabel}`}
//                       id="error"
//                     >
//                       <img
//                         className={`edit-warehouse-form__error-label--img`}
//                         src={error}
//                         alt="exclamation"
//                       />{" "}
//                       This field is required
//                     </label>
//                     <label className="edit-warehouse-form__label" id="city">
//                       City
//                     </label>
//                     <input
//                       // placeholder={this.state.city}
//                       htmlFor="city"
//                       name="city"
//                       className={`edit-warehouse-form__input ${this.state.inputClass}`}
//                       type="text"
//                       onChange={this.handleChange}
//                       value={this.state.city}
//                     ></input>
//                     <label
//                       className={`edit-warehouse-form__error-label ${this.state.errorLabel}`}
//                       id="error"
//                     >
//                       <img
//                         className={`edit-warehouse-form__error-label--img`}
//                         src={error}
//                         alt="exclamation"
//                       />{" "}
//                       This field is required
//                     </label>
//                     <label className="edit-warehouse-form__label" id="country">
//                       Country
//                     </label>
//                     <input
//                       // placeholder={this.state.warehouseToEdit.country}
//                       htmlFor="country"
//                       name="country"
//                       className={`edit-warehouse-form__input ${this.state.inputClass}`}
//                       type="text"
//                       onChange={this.handleChange}
//                       value={this.state.country}
//                     ></input>
//                     <label
//                       className={`edit-warehouse-form__error-label ${this.state.errorLabel}`}
//                       id="error"
//                     >
//                       <img
//                         className={`edit-warehouse-form__error-label--img`}
//                         src={error}
//                         alt="exclamation"
//                       />{" "}
//                       This field is required
//                     </label>
//                   </div>
//                 </article>

//                 <article className="edit-warehouse-form__contact-details">
//                   <h2>Contact Details</h2>

//                   <div className="edit-warehouse-form__input-wrapper">
//                     <label className="edit-warehouse-form__label" id="name">
//                       Contact Name
//                     </label>
//                     <input
//                       // placeholder={this.state.warehouseToEdit.contact.name}
//                       htmlFor="name"
//                       name="contact_name"
//                       className={`edit-warehouse-form__input ${this.state.inputClass}`}
//                       type="text"
//                       onChange={this.handleChange}
//                       value={this.state.contact_name}
//                     ></input>
//                     <label
//                       className={`edit-warehouse-form__error-label ${this.state.errorLabel}`}
//                       id="error"
//                     >
//                       <img
//                         className={`edit-warehouse-form__error-label--img`}
//                         src={error}
//                         alt="exclamation"
//                       />{" "}
//                       This field is required
//                     </label>
//                     <label className="edit-warehouse-form__label" id="position">
//                       Position
//                     </label>
//                     <input
//                       // placeholder={this.state.warehouseToEdit.contact.position}
//                       htmlFor="position"
//                       name="contact_position"
//                       className={`edit-warehouse-form__input ${this.state.inputClass}`}
//                       type="text"
//                       onChange={this.handleChange}
//                       value={this.state.contact_position}
//                     ></input>
//                     <label
//                       className={`edit-warehouse-form__error-label ${this.state.errorLabel}`}
//                       id="error"
//                     >
//                       <img
//                         className={`edit-warehouse-form__error-label--img`}
//                         src={error}
//                         alt="exclamation"
//                       />{" "}
//                       This field is required
//                     </label>
//                     <label className="edit-warehouse-form__label" id="phone">
//                       Phone Number
//                     </label>
//                     <input
//                       // placeholder={this.state.warehouseToEdit.contact.phone}
//                       htmlFor="phone"
//                       name="contact_phone"
//                       className={`edit-warehouse-form__input ${this.state.inputClass}`}
//                       type="tel"
//                       onChange={this.handleChange}
//                       value={this.state.contact_phone}
//                     ></input>
//                     <label
//                       className={`edit-warehouse-form__error-label ${this.state.errorLabel}`}
//                       id="error"
//                     >
//                       <img
//                         className={`edit-warehouse-form__error-label--img`}
//                         src={error}
//                         alt="exclamation"
//                       />{" "}
//                       This field is required
//                     </label>
//                     <label className="edit-warehouse-form__label" id="email">
//                       Email
//                     </label>
//                     <input
//                       // placeholder={this.state.warehouseToEdit.contact.email}
//                       htmlFor="email"
//                       name="contact_email"
//                       className={`edit-warehouse-form__input ${this.state.inputClass}`}
//                       type="email"
//                       onChange={this.handleChange}
//                       value={this.state.contact_email}
//                     ></input>
//                     <label
//                       className={`edit-warehouse-form__error-label ${this.state.errorLabel}`}
//                       id="error"
//                     >
//                       <img
//                         className={`edit-warehouse-form__error-label--img`}
//                         src={error}
//                         alt="exclamation"
//                       />{" "}
//                       This field is required
//                     </label>
//                   </div>
//                 </article>
//               </section>
//               {this.state.submitError && (
//                 <p className="submitError">
//                   Cannot edit this warehouse, please fill out all fields
//                 </p>
//               )}
//               <section className="edit-warehouse-form__button-wrapper">
//                 <button
//                   className="edit-warehouse-form__cancel-button"
//                   onClick={handleBackClick}
//                 >
//                   Cancel
//                 </button>
//                 <button className="edit-warehouse-form__edit-button">
//                   Save
//                 </button>
//               </section>
//             </form>
//             <p className="edit-warehouse__copyright">
//               InStock Inc. All Rights Reserved
//             </p>
//           </main>
//         ) : (
//           <p>Page Loading...</p>
//         )}
//       </div>
//     );
//   }
// }

export default EditWarehouse;
