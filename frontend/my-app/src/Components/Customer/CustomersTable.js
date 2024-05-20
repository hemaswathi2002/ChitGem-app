import React, { useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CustomersContext } from '../../Context/CustomersContext';
import CustomersForm from './CustomersForm';
import { Button, Modal, ModalHeader, ModalBody, Card, CardBody, CardTitle, CardSubtitle, CardText, Row, Col, Container, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function CustomersList(props) {
    const { customers, customerDispatch } = useContext(CustomersContext);
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const navigate = useNavigate();

    const toggle = () => setModal(!modal);

    const handleRemove = async (id) => {
        const confirmation = window.confirm('Are you sure?');
        if (confirmation) {
            try {
                await axios.delete(`http://localhost:3009/api/customers/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                customerDispatch({ type: 'DELETE_CUSTOMERS', payload: id });
                navigate('/chit');
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleEdit = (id) => {
        setEditId(id);
        toggle();
    };

    const handleAddCustomer = () => {
        setEditId('');
        toggle();
    };

    const filteredCustomers = useMemo(() => {
        let filtered = customers.data.filter(customer =>
            customer.contact && customer.contact.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (sortOrder === 'email') {
            filtered = filtered.sort((a, b) => a.contact.email.localeCompare(b.contact.email));
        } else if (sortOrder === 'name') {
            filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
        return filtered;
    }, [customers.data, searchQuery, sortOrder]);

    const handleView = (customerId) => {
        navigate(`/customers/${customerId}/chits`);
    };

    return (
        <div style={{ marginTop: '80px', justifyContent: 'center' }}>
            <h2>Customers - {customers.data.length}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginRight: 'auto' }}
                />
                <UncontrolledDropdown>
                    <DropdownToggle >
                        Sort by
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => setSortOrder('email')}>Email</DropdownItem>
                        <DropdownItem onClick={() => setSortOrder('name')}>Name (A-Z)</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
            <Container style={{ width: "480%", display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Row style={{ width: "100%" }}>
                    {filteredCustomers.map((customer) => (
                        <Col md="3" key={customer._id}>
                            <Card style={{ marginBottom: '20px', borderColor: '#800000', borderWidth: '2px' }}>
                                <CardBody>
                                    <CardTitle>{customer.name}</CardTitle>
                                    <CardSubtitle>{customer.address}</CardSubtitle>
                                    <CardText>Email: {customer.contact && customer.contact.email}</CardText>
                                    <CardText>Mobile: {customer.contact && customer.contact.mobile}</CardText>
                                    <Button onClick={() => handleEdit(customer._id)} color="primary" style={{ marginRight: '5px' }}>Edit</Button>
                                    <Button onClick={() => handleRemove(customer._id)} color="danger" style={{ marginRight: '5px' }}>Remove</Button>
                                    <Button onClick={() => handleView(customer._id)} color="info">View</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Button color="danger" onClick={handleAddCustomer}>Add Customer</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Customer Form</ModalHeader>
                <ModalBody>
                    <CustomersForm editId={editId} toggle={toggle} />
                </ModalBody>
            </Modal>
        </div>
    );
}
