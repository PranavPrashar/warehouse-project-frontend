import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import closeIcon from "../../assets/icons/close-24px.svg";
import "./DeleteInventoryModal.scss";

const DeleteInventoryModal = ({closeModal, selectedInventory}) => {

    // let history = useHistory();
    let navigate = useNavigate();

    const handleDeleteConfirmation = () => {
       axios.delete(`http://localhost:6060/inventory/delete/${selectedInventory.id}`)
        .then( response => {
            // console.log(response.data)
            // history.push("/")
            navigate("/")
        })
        .catch( error => {
            console.log(error)
        })
    }
    
    return (
        <div className="delete__inventory__modal--background">
            <div className="delete__inventory__modal--container">
                <div className="delete__inventory__modal--container--cancel">
                    <img onClick={() => {
                    closeModal(false);
                    }}  src={closeIcon} alt="cancel delete inventory modal"/>
                </div>
                <h1 className="delete__inventory__modal--container--title">Delete {selectedInventory.itemName} inventory?</h1>
                <p className="p1 delete__inventory__modal--container--body p1">Please confirm that you’d like to delete the {selectedInventory.itemName} from the list of inventorys. You won’t be able to undo this action.</p>
                <div className="delete__inventory__modal--container--footer">
                    <button 
                    className="delete__inventory__modal--container--footer--cancel"
                    onClick={() => {
                    closeModal(false);
                    }}>Cancel</button>
                    <button className="delete__inventory__modal--container--footer--delete"
                    onClick={() => {
                    handleDeleteConfirmation()
                    }}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteInventoryModal;