import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { startRemoveShop } from '../Actions/shops';
import ShopsForm from './ShopsForm';


export default function ShopsTable() {
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('');
    const toggle = () => setModal(!modal);

    const shops = useSelector((state)=>{
        return state.shops
    })

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleRemove = async (id) => {
        const confirmation = window.confirm('Are you sure?');
        if (confirmation) {
            try {
                dispatch(startRemoveShop(id));
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleEdit = (id) => {
        setEditId(id);
        toggle();
    };

    return (
        <div>
            <h2>shops - {shops && shops.data && shops.data.length}</h2>
            <table>
                <thead>
                    <tr>
                    <th>setShopname</th>
                    <th>setArea</th>
                    <th>setPincode</th>
                    <th>setCity</th>
                    <th>setState</th>
                    <th>setEmail</th>
                    <th>setMobile</th>
                    <th>setDescription</th>
                    <th>setApprovalStatus</th>
                    </tr>
                </thead>
                <tbody>
                    {shops && shops.data && shops.data.map(shop => (
                        <tr key={shop._id}>
                           
                            <td>{shop.shopName}</td>
                            <td>{shop.address.area}</td>
                            <td>{shop.address.pincode}</td>
                            <td>{shop.address.city}</td>
                            <td>{shop.address.state}</td>
                            <td>{shop.contact.email}</td>
                            <td>{shop.contact.mobile}</td>
                            <td>{shop.description}</td>
                            <td>{shop.approvalStatus}</td>
                            <td>
                                <button onClick={() => handleEdit(shop._id)}>Edit</button>
                                <button onClick={() => handleRemove(shop._id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
<Button color="danger" onClick={toggle}>Add shop</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Shoop Form</ModalHeader>
                <ModalBody>
                    <ShopsForm editId={editId} toggle={toggle} />
                </ModalBody>
                </Modal>
        </div>
    );
}
