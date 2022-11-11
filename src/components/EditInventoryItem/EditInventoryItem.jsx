import React, { Component } from 'react'
import "./EditInventoryItem.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import axios from "axios";

class EditInventoryItem extends Component {
      state = {
        warehouses: [],
        inventory: [],
        isError: false,
        inventoryItemToEdit: false,
        itemName: "",
        description: "",
        status: "",
        quantity: 0,
        errorClass: "edit-inventory-form__error--hidden",
      };
    

      componentDidMount() {
        this.inventoryItemToEditDetails()

        axios.get('http://localhost:6060/inventory/')
             .then(res => {
                this.setState({
                    inventory: res.data
                })
             }).catch(err => {
                console.log(err)
             })

        axios.get('http://localhost:6060/warehouse/')
             .then(res => {
                this.setState({
                    warehouses: res.data
                })
             }).catch(err => {
                console.log(err)
             })     
      }
    
      handleFormSubmit = (event) => {
        event.preventDefault();    
        const quantity = parseInt(event.target[5].value);
        const checkRadios = () => {
          if (!event.target[3].checked && !event.target[4].checked) {
            console.log("No radio has been selected");
            return false;
          }
    
          if (event.target[3].checked) {
            return event.target[3].value;
          } else if (event.target[4].checked) {
            return event.target[4].value;
          }
        };
    
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
            const inventoryItemToEditId = this.props.match.params.inventoryId
          axios
            .put(`http://localhost:6060/inventory/edit/${inventoryItemToEditId}`, {
              warehouseId: selectedWarehouseId,
              warehouseName: event.target[6].value,
              itemName: event.target[0].value,
              description: event.target[1].value,
              category: event.target[2].value,
              status: checkRadios(),
              quantity: quantity,
            })
            .then((response) => {
              this.props.history.push("/")
            })
            .catch((error) => {
              console.log(error);
              this.setState({
                isError: true
              })
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
            errorClass: "edit-inventory-form__error",
          });
        }
      };
    
    inventoryItemToEditDetails = () => {
        const inventoryItemToEditId = this.props.match.params.inventoryId
        axios
          .get(`http://localhost:6060/inventory/${inventoryItemToEditId}`)
          .then(res => {
            this.setState({
                inventoryItemToEdit: true,
                itemName: res.data.itemName,
                description: res.data.description,
                status: res.data.status,
                quantity: res.data.quantity,
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    

      
      handleBackClick = (event) => {
        event.preventDefault();
        this.props.history.goBack();
      }

      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value,
        })
      }
      render() {


        return (
          <main className="edit-inventory">
            {this.state.inventoryItemToEdit ? (<>
                <div className="edit-inventory__title-wrapper">
          <img
            className="edit-inventory__back-arrow"
            src={backArrow}
            alt="Back Arrow"
            onClick={this.handleBackClick}
          />
          <h1 className="edit-inventory__title">Edit Inventory Item</h1>
        </div>

        <form
          className="edit-inventory-form"
          onSubmit={this.handleFormSubmit}
          type="submit"
        >
          <section className="edit-inventory-form__article-wrapper">
            <article className="edit-inventory-form__inventory-details">
              <h2>Item Details</h2>

              <div className="edit-inventory-form__input-wrapper">
                <label className="edit-inventory-form__label" id="name">
                  Item Name
                </label>
                <input
                  htmlFor="name"
                  name="itemName"
                  className="edit-inventory-form__input"
                  type="text"
                  onChange={this.handleChange}
                  value ={this.state.itemName}
                ></input>
                <label className="edit-inventory-form__label" id="description">
                  Description
                </label>
                <input
                  htmlFor="description"
                  name="description"
                  className="edit-inventory-form__input edit-inventory-form__input--description"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.description}
                ></input>
                <label className="edit-inventory-form__label" id="category">
                  Category
                </label>
                <select
                  htmlFor="category"
                  name="category"
                  className="edit-inventory-form__input"
                  type="text"
                >
                  <option value="">Please Select</option>
                  {!this.state.inventory ? (
                    <option value="Loading...">Loading..</option>
                  ) : (
                    this.state.inventory.map((item) => {
                      return (
                        <option key={item.id} value={`${item.itemName}`}>
                          {item.itemName}
                        </option>
                      );
                    })
                  )}
                </select>
              </div>
            </article>

            <article className="edit-inventory-form__item-availability">
              <h2>Item Availability</h2>

              <div className="edit-inventory-form__input-wrapper">
                <h3 className="edit-inventory-form__status">Status</h3>
                <div
                  className="
                                edit-inventory-form__radio-wrapper"
                >
                  <label
                    className="edit-inventory-form__radio-label"
                    id="in-stock"
                  >
                    <input
                      htmlFor="in-stock"
                      name="stock-radio"
                      className="edit-inventory-form__radio"
                      type="radio"
                      value="in stock"
                      onChange={this.handleChange}
                      
                    ></input>
                    In Stock
                  </label>

                  <label
                    className="edit-inventory-form__radio-label"
                    id="out-stock"
                  >
                    <input
                      htmlFor="out-of-stock"
                      name="stock-radio"
                      className="edit-inventory-form__radio"
                      type="radio"
                      value="Out of Stock"
                    ></input>
                    Out of Stock
                  </label>
                </div>
                <label className="edit-inventory-form__label" id="quantity">
                  Quantity
                </label>
                <input
                  htmlFor="quantity"
                  name="quantity"
                  className="edit-inventory-form__input"
                  type="tel"
                  onChange={this.handleChange}
                  value={this.state.quantity}
                ></input>
                <label
                  className="edit-inventory-form__label edit-inventory-form__label--warehouse"
                  id="warehouse"
                >
                  Warehouse
                </label>

                <select
                  htmlFor="warehouse"
                  name="warehouseName"
                  className="edit-inventory-form__input edit-inventory-form__input--warehouse"
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
          {this.state.isError && (<p className='isError'>Please fill out the fields</p>)}
          <section className="edit-inventory-form__button-wrapper">
            <button className="edit-inventory-form__cancel-button" onClick={this.handleBackClick}>
              Cancel
            </button>
            <button className="edit-inventory-form__edit-button">
              Save
            </button>
          </section>
        </form>
        <h2 className={`${this.state.errorClass}`}>
          Please Fill Out All Form Fields
        </h2>
            </>) : (<p>byanze</p>)}
            
          </main>
        );
      }
    }


export default EditInventoryItem
