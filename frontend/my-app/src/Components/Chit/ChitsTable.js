import React, { useContext, useState } from 'react';
import axios from 'axios';
import ChitDetails from './ChitsDetails';
import ChitForm from './ChitsForm';
import { ChitsContext } from '../../Context/ChitsContext';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'; // Import Reactstrap components
import { Link } from 'react-router-dom';

export default function ChitList() {
    const { chits, chitDispatch } = useContext(ChitsContext);
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [serverError, setServerError] = useState(null);
    const [selectedChitId, setSelectedChitId] = useState(null); 

    const toggle = () => setModal(!modal);
    const handleViewDetails = (id) => {
        setSelectedChitId(id); // Set the selected chit ID when "View Details" button is clicked
    };

    const handleRemove = async (id) => {
        const confirmation = window.confirm('Are you sure?');
        if (confirmation) {
            try {
                const response = await axios.delete(`http://localhost:3009/api/chits/${id}`,{
                    headers : {
                        Authorization : localStorage.getItem('token')
                    }
                });
                console.log(response.data);
                chitDispatch({ type: 'DELETE_CHIT', payload: id });
            } catch (err) {
                console.log(err);
                if (err.response) {
                    setServerError(err.response.data.message);
                } else {
                    setServerError('An error occurred. Please try again later.');
                }
            }
        }
    };

    const handleEdit = (id) => {
        setEditId(id);
        toggle();
    };

    return (
        <div style={{ marginTop: '80px' }}>
            <h2>Chits - {chits && chits.data && chits.data.length}</h2>
            {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
            <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>Chit Amount</th>
                            <th>Installments</th>
                            <th>Total Amount</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Gold Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chits && chits.data && chits.data.map(chit => (
                            <tr key={chit._id}>
                                <td>{chit.name}</td>
                                <td>{chit.email}</td>
                                <td>{chit.chitAmount}</td>
                                <td>{chit.installments}</td>
                                <td>{chit.totalAmount}</td>
                                <td>{chit.date?.startDate}</td> 
                                <td>{chit.date?.endDate}</td> 
                                <td>{chit.status}</td>
                                <td>{chit.goldPrice}</td>
                                <td>
                                <Link to={`/chits/${chit._id}`}>
    <Button style={{ border: '2px solid lightgreen', backgroundColor: 'white',color: 'deeppink' }} onClick={() => handleViewDetails(chit._id)}>View Details</Button>
</Link>
<Button style={{ border: '2px solid deeppink', backgroundColor: 'white',color: 'deeppink' }} onClick={() => handleEdit(chit._id)}>Edit</Button>{' '}
<Button style={{ border: '2px solid lightbrown', backgroundColor: 'white',color: 'deeppink' }} onClick={() => handleRemove(chit._id)}>Remove</Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Button color="success" onClick={toggle}>Add Chit</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Chit Form</ModalHeader>
                <ModalBody>
                    <ChitForm editId={editId} toggle={toggle} />
                </ModalBody>
            </Modal>
            {selectedChitId && (
                <ChitDetails chitId={selectedChitId} />
            )}
        </div>
    );
}
