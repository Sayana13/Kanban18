import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

const UpdateCardModal = (props) => {
    const [modal, setModal] = useState(false);
    const [newName, setNewName] = useState(props.card.name);
    const [newDescription, setNewDescription] = useState(props.card.description);
    const [newStatus, setNewStatus] = useState(props.card.status);
    const [newPriority, setNewPriority] = useState(props.card.priority);

    const toggle = () => setModal(!modal);

    const saveButtonHandler = () => {
        const newCard = {...props.card, name: newName, description: newDescription, status: newStatus, priority: newPriority}
        props.editTask(newCard);
        setModal(!modal);
        console.log(newCard)
    };

    return (
        <div>
            <Button color="btn btn-outline-primary" onClick={toggle}>Update</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} charCode="X">Update card</ModalHeader>
                <ModalBody>
                    <Input placeholder="card name" value={newName}
                           onChange={(e) => setNewName(e.target.value)}/><br/>
                    <Input placeholder="card description"
                           value={newDescription}
                           onChange={(e) => setNewDescription(e.target.value)}/><br/>
                    <select className="form-select"
                            aria-label="Default select example"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}>
                        {props.columns.map(el => <option key={el._id}>{el}</option>)}
                    </select><br/>
                    <select className="form-select"
                            aria-label="Default select example"
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)}>
                        {props.priority.map(el => <option key={uuidv4()}>{el}</option>)}
                    </select>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={saveButtonHandler}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default UpdateCardModal;