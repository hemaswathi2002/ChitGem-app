import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRemoveJewels, startGetJewels } from '../Actions/Jewels';
import JewelForm from './JewelForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap'; // Import Reactstrap components
import '../../index.css';

export default function JewelsTable() {
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGetJewels());
    }, [dispatch]);

    const jewels = useSelector((state) => {
        return state.jewels;
    });

    const toggle = () => setModal(!modal);

    const handleRemove = (id) => {
        const userConfirm = window.confirm("Are you sure?");
        if (userConfirm) {
            dispatch(startRemoveJewels(id));
        }
    };

    return (

        <Container className="mt-4" style={{ paddingTop: '40px', paddingBottom: "60px" }}>
            <Row>
                {jewels && jewels.data && jewels.data.map((ele, index) => (
                    <Col lg="4" md="6" key={index} className="mb-4">
                        <div className="card shadow-sm h-100 d-flex flex-column justify-content-between">
                            <div className="card-body">
                                <div className="text-center mb-2">
                                    <img src={`http://localhost:3009/${ele.images}`} className="card-img-top" alt="..." style={{ width: '100%', maxWidth: '200px', height: 'auto' }} />
                                </div>
                                <div className="text-center">
                                    <p className="card-text">{ele.caption}</p>
                                    <p className="card-text">{ele.price}</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <Button onClick={() => {
                                    setEditId(ele._id);
                                    toggle();
                                }} color="primary">Edit</Button>{' '}
                                <Button onClick={() => {
                                    handleRemove(ele._id);
                                }} color="danger">Remove</Button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Jewel</ModalHeader>
                <ModalBody>
                    <JewelForm editId={editId} toggle={toggle} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Save Changes</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
}
