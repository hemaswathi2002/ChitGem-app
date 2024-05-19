import React, { useContext, useState } from 'react'
import axios from 'axios'
import ChitForm from './ChitsForm'
import { ChitsContext } from '../../Context/ChitsContext'
import { Button, Modal, ModalHeader, ModalBody, Card, CardBody, CardTitle, CardText } from 'reactstrap'
import { Link } from 'react-router-dom'

export default function ChitList() {
    const { chits, chitDispatch } = useContext(ChitsContext)
    const [modal, setModal] = useState(false)
    const [editId, setEditId] = useState('')
    const [serverError, setServerError] = useState(null)
    const [selectedChitId, setSelectedChitId] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

    const toggle = () => setModal(!modal)
    const handleViewDetails = (id) => {
        setSelectedChitId(id)
    }

    const handleRemove = async (id) => {
        const confirmation = window.confirm('Are you sure?')
        if (confirmation) {
            try {
                const response = await axios.delete(`http://localhost:3009/api/chits/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                })
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

    const filteredChits = chits && chits.data && chits.data.filter((chit) => {
        const searchTerms = [chit.name,chit.email, chit.chitAmount.toString(), chit.status]
        return searchTerms.some(term => term.toLowerCase().includes(searchQuery.toLowerCase()))
    })

    return (
        <div style={{ marginTop: '80px' }}>
            <h2>Chits - {filteredChits && filteredChits.length}</h2>
            {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
            <div className="row">
                <input
                    type="text"
                    placeholder="Search by name  email, chit amount, or status"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px' }}
                />
                {filteredChits &&
                    filteredChits.map((chit) => (
                        <div key={chit._id} className="col-md-4 mb-4">
                            <Card>
                                <CardBody>
                                    <CardTitle>{chit.name}</CardTitle>
                                    <CardText>
                                        <strong>Email:</strong> {chit.email}
                                        <br />
                                        <strong>Chit Amount:</strong> {chit.chitAmount}
                                        <br />
                                        <strong>Installments:</strong> {chit.installments}
                                        <br />
                                        <strong>Total Amount:</strong> {chit.totalAmount}
                                        <br />
                                        <strong>Start Date:</strong> {chit.date?.startDate}
                                        <br />
                                        <strong>End Date:</strong> {chit.date?.endDate}
                                        <br />
                                        <strong>Status:</strong> {chit.status}
                                    </CardText>
                                    <Button style={{ marginRight: '5px' }} onClick={() => handleEdit(chit._id)}>
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleRemove(chit._id)}>Remove</Button>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
            </div>

            <Button color="success" onClick={toggle}>
                Add Chit
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Chit Form</ModalHeader>
                <ModalBody>
                    <ChitForm editId={editId} toggle={toggle} />
                </ModalBody>
            </Modal>
        </div>
    )
}
