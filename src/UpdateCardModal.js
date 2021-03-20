import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';

const UpdateCardModal = (props) => {
    const [modal, setModal] = useState(false);
    const [newName, setNewName] = useState(props.card.name);
    const [newDescription, setNewDescription] = useState(props.card.description);
    const [newStatus, setNewStatus] = useState(props.card.status);
    const [newPriority, setNewPriority] = useState(props.card.priority);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="danger" onClick={toggle}>Update</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} charCode="X">Update card</ModalHeader>
                <ModalBody>
                    <Input placeholder='Card name' value={newName}
                           onChange={(e) => setNewName(e.target.value)}
                    /> <br/>
                    <Input placeholder='Card description' value={newDescription}
                           onChange={(e) => setNewDescription(e.target.value)}/> <br/>
                    <select className="form-select"
                            aria-label="Default select example"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}>
                        {props.columns.map(el => <option>{el}</option>)}
                    </select><br/>
                    <select className="form-select"
                            aria-label="Default select example"
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)}>
                        {props.priority.map(el => <option>{el}</option>)}
                    </select>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateCardModal;