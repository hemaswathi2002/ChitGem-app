
import React, { useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CustomersContext } from '../../Context/CustomersContext';
import CustomersForm from './CustomersForm';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

export default function CustomersList(props) {
    const { customers, customerDispatch } = useContext(CustomersContext);
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
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

    const filteredCustomers = useMemo(() => {
        return customers.data.filter(customer =>
            customer.contact && customer.contact.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [customers.data, searchQuery]);

    return (
        <div>
            <h2>Customers - {customers.data.length}</h2>
            <input
                type="text"
                placeholder="Search by email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer, index) => (
                            <tr key={index}>
                                <td>{customer.name}</td>
                                <td>{customer.contact && customer.contact.email}</td>
                                <td>{customer.contact && customer.contact.mobile}</td>
                                <td>{customer.description}</td>
                                <td>
                                    <button onClick={() => handleEdit(customer._id)} style={{ backgroundColor: '#ffb6c1' }}>Edit</button>
                                    <button onClick={() => handleRemove(customer._id)} style={{ backgroundColor: '#ffb6c1' }}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Customer Form</ModalHeader>
                    <ModalBody>
                        <CustomersForm editId={editId} toggle={toggle} />
                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
}
