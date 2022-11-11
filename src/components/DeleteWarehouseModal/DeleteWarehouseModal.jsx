import axios from "axios";
import { useHistory } from "react-router-dom";
import React from "react";
import closeIcon from "../../assets/icons/close-24px.svg";
import "./DeleteWarehouseModal.scss";

const DeleteWarehouseModal = ({closeModal, selectedWarehouse}) => {

    let history = useHistory();

    const handleDeleteConfirmation = () => {

        axios.delete(`http://localhost:6060/warehouse/delete/${selectedWarehouse.id}`)
            .then( response => {
                console.log(response.data)
                
                history.go(0)
                // setTimeout(() => {
                //     history.push("/")
                // }, 2000)
                // console.log(response.data)
            })
            .catch( error => {
                console.log(error)
            })
    }
    
    return (
        <div className="delete__warehouse__modal--background">
            <div className="delete__warehouse__modal--container">
                <div className="delete__warehouse__modal--container--cancel">
                    <img onClick={() => {
                    closeModal(false);
                    }}  src={closeIcon} alt="cancel delete warehouse modal"/>
                </div>
                <h1 className="delete__warehouse__modal--container--title">Delete {selectedWarehouse.name} warehouse?</h1>
                <p className="p1 delete__warehouse__modal--container--body">Please confirm that you’d like to delete the {selectedWarehouse.name} from the list of warehouses. You won’t be able to undo this action.</p>
                <div className="delete__warehouse__modal--container--footer">
                    <button 
                    className="delete__warehouse__modal--container--footer--cancel"
                    onClick={() => {
                    closeModal(false);
                    }}>Cancel</button>
                    <button className="delete__warehouse__modal--container--footer--delete"
                    onClick={() => {
                    handleDeleteConfirmation()
                    }}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteWarehouseModal;