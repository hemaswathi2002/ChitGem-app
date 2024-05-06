import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { startRemoveShop } from '../Actions/shops'
import'../../index.css'
import ShopsForm from './ShopsForm'


export default function ShopsTable() {
    const [modal, setModal] = useState(false)
    const [editId, setEditId] = useState('')
    const toggle = () => setModal(!modal)

    const shops = useSelector((state) => state.shops)
    console.log(shops,'shopData')


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleRemove = async (id) => {
        const confirmation = window.confirm('Are you sure?')
        if (confirmation) {
            try {
                dispatch(startRemoveShop(id))
            } catch (err) {
                console.log(err)
            }
        }
    }

    const handleEdit = (id) => {
        setEditId(id)
        toggle()
    }
    const handleAddShop = () => {
        setEditId('') 
        toggle() // Open the modal
    }
 return (
        <div>
            {shops &&
                <div>
                    <h2>shops - {shops.shop?.length}</h2>
                    <table className="styled-table">
                        <thead style={{ backgroundColor: 'lightpink' }}> 
                            <tr>
                                <th>Shop</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Area</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Pincode</th>
                                <th>Description</th>
                                <th>ApprovalStatus</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shops.shop.map(shop => (
                                <tr key={shop._id} className="table-row">
                                    <td>{shop.shopName}</td>
                                    <td>{shop.contact?.email}</td>
                                    <td>{shop.contact?.mobile}</td>
                                    <td>{shop.address?.area}</td>
                                    <td>{shop.address?.city}</td>
                                    <td>{shop.address?.state}</td>
                                    <td>{shop.address?.pincode}</td>
                                    <td>{shop.description}</td>
                                    <td>{shop.approvalStatus}</td>
                                    <td>
                                        <button className="edit-button" onClick={() => handleEdit(shop._id)}>Edit</button>
                                        {/* <button onClick={() => handleRemove(shop._id)}>Remove</button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Button color="danger" onClick={handleAddShop}>Add shop</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Shop Form</ModalHeader>
                        <ModalBody>
                            <ShopsForm editId={editId} toggle={toggle} />
                        </ModalBody>
                    </Modal>
                </div>
            }
        </div>
    )
}
