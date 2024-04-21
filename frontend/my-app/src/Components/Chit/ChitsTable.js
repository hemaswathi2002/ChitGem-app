import React, { useContext, useState } from 'react'
import axios from 'axios'
import ChitForm from './ChitsForm'
import { ChitsContext } from '../../Context/ChitsContext'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

export default function ChitList() {
    const { chits, chitDispatch } = useContext(ChitsContext)
    const [modal, setModal] = useState(false)
    const [editId, setEditId] = useState('')
    const [serverError, setServerError] = useState(null)
    const toggle = () => setModal(!modal)

    const handleRemove = async (id) => {
        const confirmation = window.confirm('Are you sure?')
        if (confirmation) {
            try {
                const response = await axios.delete(`http://localhost:3009/api/chits/${id}`,{
                    headers : {
                        Authorization : localStorage.getItem('token')
                    }
                });
                console.log(response.data)
                chitDispatch({ type: 'DELETE_CHIT', payload: id })
            } catch (err) {
                console.log(err)
                if (err.response) {
                    setServerError(err.response.data.message) 
                } else {
                    setServerError('An error occurred. Please try again later.') 
                }
            }
        }
    }

    const handleEdit = (id) => {
        setEditId(id)
        toggle()
    }

    return (
        <div>
            <h2>Chits - {chits && chits.data && chits.data.length}</h2>
            {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Chit Amount</th>
                        <th>Installments</th>
                        <th>Total Amount</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Benefits</th>
                        <th>Terms and Conditions</th>
                        <th>Gold Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {chits && chits.data && chits.data.map(chit => (
                        <tr key={chit._id}>
                            <td>{chit.chitAmount}</td>
                            <td>{chit.installments}</td>
                            <td>{chit.totalAmount}</td>
                            <td>{chit.date?.startDate}</td> 
                            <td>{chit.date?.endDate}</td> 
                            <td>{chit.status}</td>
                            <td>{chit.benefits}</td>
                            <td>{chit.termsAndConditions}</td>
                            <td>{chit.goldPrice}</td>
                            <td>
                                <button onClick={() => handleEdit(chit._id)}>Edit</button>
                                <button onClick={() => handleRemove(chit._id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
            <Button color="danger" onClick={toggle}>Add Chit</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Chit Form</ModalHeader>
                <ModalBody>
                    <ChitForm editId={editId} toggle={toggle} />
                </ModalBody>
            </Modal>
        </div>
    )
}
