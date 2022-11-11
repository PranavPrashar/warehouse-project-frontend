import React, { Component } from "react";
import "./AddInventoryItem.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";

class AddInventoryItem extends Component {
  state = {
    warehouses: null,
    inventory: null,
    errorClass: "add-inventory-form__error--hidden",
    category: null,
    unfilteredCategory: null
  };

  componentDidMount() {
    //Below code requires allInventoryItem endpoint
    axios
        .all([axios.get("http://localhost:6060/warehouse"),
            axios.get("http://localhost:6060/Inventory")])
        .then(
            axios.spread((...responses) => {
                const itemCategories = responses[1].data.map(((inventoryItem) => {
                  return ({
                    name: inventoryItem.category,
                    id: inventoryItem.id
                  })
                }));

                const categories = itemCategories.map(item => {
                  return item.name
                });
                const filteredCategories = categories.filter((category, i) => {
                  return categories.indexOf(category) === i;
                })
                // console.log(filteredCategories)






                // console.log(itemCategories);
                // console.log(responses)
                this.setState({
                    warehouses: responses[0].data,
                    inventory: itemCategories, 
                    category: filteredCategories,
                    unfilteredCategory: itemCategories 
                })
            })
        )


  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log("Add New Inventory Item Form Submitted");
    // console.log(event);

    const quantity = parseInt(event.target[5].value);

    const checkRadios = () => {
      if (!event.target[3].checked && !event.target[4].checked) {
        // console.log("No radio has been selected");
        return false;
      }

      if (event.target[3].checked) {
        return event.target[3].value;
      } else if (event.target[4].checked) {
        return event.target[4].value;
      }
    };

    if (!event.target[6].value) {
      this.setState({
        errorClass: "add-inventory-form__error"
      });
      return;
    }

    const selectedWarehouse = this.state.warehouses.find(
      (warehouse) => warehouse.name === event.target[6].value
    );


    const selectedWarehouseId = selectedWarehouse.id;

    if (
      event.target[0].value &&
      event.target[1].value &&
      event.target[2].value &&
      checkRadios() &&
      selectedWarehouseId &&
      event.target[5].value &&
      event.target[6].value
    ) {
      axios
        .post("http://localhost:6060/inventory", {
          warehouseId: selectedWarehouseId,
          warehouseName: event.target[6].value,
          itemName: event.target[0].value,
          description: event.target[1].value,
          category: event.target[2].value,
          status: checkRadios(),
          quantity: quantity,
        })
        .then((response) => {
          // console.log(response);
          this.props.history.push("/")
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (
      !event.target[0].value ||
      !event.target[1].value ||
      !event.target[2].value ||
      !checkRadios() ||
      !event.target[5].value ||
      !event.target[6].value
    ) {
      this.setState({
        errorClass: "add-inventory-form__error",
      });
    }
  };



  render() {

    const handleCancelClick = (event) => {
      event.preventDefault();
      this.props.history.goBack();
    }

    return (
      <main className="add-inventory">
        {/* 
                    Title Bar and Icon Container
                        Left Arrow Icon
                        Title/Header for Edit Warehouse
                    /End Title Bar and Icon container
                    
                    Form
                        Warehouse Details Article
                    /End Form
                */}

        <div className="add-inventory__title-wrapper">
          <img
            onClick={handleCancelClick}
            className="add-inventory__back-arrow"
            src={backArrow}
            alt="Back Arrow"
          />
          <h1 className="add-inventory__title">Add New Inventory Item</h1>
        </div>

        <form
          id="add-inventory-form"
          className="add-inventory-form"
          onSubmit={this.handleFormSubmit}
          type="submit"
        >
          <section className="add-inventory-form__article-wrapper">
            <article className="add-inventory-form__inventory-details">
              <h2>Item Details</h2>

              <div className="add-inventory-form__input-wrapper">
                <label className="add-inventory-form__label" id="name">
                  Item Name
                </label>
                <input
                  placeholder="Item Name"
                  htmlFor="name"
                  name="itemName"
                  className="add-inventory-form__input"
                  type="text"
                ></input>
                <label className="add-inventory-form__label" id="description">
                  Description
                </label>
                <input
                  placeholder="Please enter a brief item description..."
                  htmlFor="description"
                  name="description"
                  className="add-inventory-form__input add-inventory-form__input--description"
                  type="text"
                ></input>
                <label className="add-inventory-form__label" id="category">
                  Category
                </label>
                <select
                  htmlFor="category"
                  name="category"
                  className="add-inventory-form__input"
                  type="email"
                >
                  <option value="">Please Select</option>
                  {!this.state.category ? (
                    <option value="Loading...">Loading..</option>
                  ) : (
                    this.state.category.map((item) => {
                      return (
                        <option key={this.state.unfilteredCategory.id} value={`${item}`}>
                          {item}
                        </option>
                      );
                    })
                  )}
                </select>
              </div>
            </article>

            <article className="add-inventory-form__item-availability">
              <h2>Item Availability</h2>

              <div className="add-inventory-form__input-wrapper">
                <h3 className="add-inventory-form__status">Status</h3>
                <div
                  className="
                                add-inventory-form__radio-wrapper"
                >
                  <label
                    className="add-inventory-form__radio-label"
                    id="in-stock"
                  >
                    <input
                      placeholder="Contact Name"
                      htmlFor="in-stock"
                      name="stock-radio"
                      className="add-inventory-form__radio"
                      type="radio"
                      value="In Stock"
                    ></input>
                    In Stock
                  </label>

                  <label
                    className="add-inventory-form__radio-label"
                    id="out-stock"
                  >
                    <input
                      placeholder="Position"
                      htmlFor="out-of-stock"
                      name="stock-radio"
                      className="add-inventory-form__radio"
                      type="radio"
                      value="Out of Stock"
                    ></input>
                    Out of Stock
                  </label>
                </div>
                <label className="add-inventory-form__label" id="quantity">
                  Quantity
                </label>
                <input
                  placeholder="0"
                  htmlFor="quantity"
                  name="quantity"
                  className="add-inventory-form__input"
                  type="tel"
                ></input>
                <label
                  className="add-inventory-form__label add-inventory-form__label--warehouse"
                  id="warehouse"
                >
                  Warehouse
                </label>

                <select
                  htmlFor="warehouse"
                  name="warehouseName"
                  className="add-inventory-form__input add-inventory-form__input--warehouse"
                >
                  <option value="">Please Select</option>
                  {!this.state.warehouses ? (
                    <option value="Loading...">Loading..</option>
                  ) : (
                    this.state.warehouses.map((warehouse) => {
                      return (
                        <option key={warehouse.id} value={`${warehouse.name}`}>
                          {warehouse.name}
                        </option>
                      );
                    })
                  )}
                </select>
              </div>
            </article>
          </section>

          <section className="add-inventory-form__button-wrapper">
            <button onClick={handleCancelClick} className="add-inventory-form__cancel-button">
              Cancel
            </button>
            <button form="add-inventory-form" className="add-inventory-form__add-button">
              + Add Item
            </button>
          </section>
        </form>
        <h2 className={`${this.state.errorClass}`}>
          Please Fill Out All Form Fields
        </h2>
      </main>
    );
  }
}

export default AddInventoryItem;
