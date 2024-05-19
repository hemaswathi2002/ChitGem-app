import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { startRemoveShop } from '../Actions/shops';
import DataTable from 'react-data-table-component';
import ShopsForm from './ShopsForm';

export default function ShopsTable() {
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const toggle = () => setModal(!modal);

    const shops = useSelector((state) => state.shops);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleAddShop = () => {
        setEditId('');
        toggle(); // Open the modal
    };

    // Define columns for the DataTable
    const columns = [
        {
            name: 'Shop',
            selector: row => row.shopName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.contact.email,
            sortable: true,
        },
        {
            name: 'Mobile',
            selector: row => row.contact.mobile,
            sortable: true,
        },
        {
            name: 'Address',
            cell: row => (
                <div>
                    <div>{row.address.area}</div>
                    <div>{row.address.city}</div>
                    <div>{row.address.state}</div>
                    <div>{row.address.pincode}</div>
                </div>
            ),
            sortable: false,
        },
        {
            name: 'Description',
            selector: row => row.description,
            cell: row => <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{row.description}</div>,
            sortable: true,
        },
        {
            name: 'Approval Status',
            selector: row => row.approvalStatus,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <Button className="edit-button" onClick={() => handleEdit(row._id)}>Edit</Button>
                    {/* <button onClick={() => handleRemove(row._id)}>Remove</button> */}
                </div>
            ),
            sortable: false,
        },
    ];

    const filteredShops = shops.shop.filter(shop =>
        shop.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.contact.mobile.toString().includes(searchTerm.toString())|| 
        shop.approvalStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ paddingTop: '80px' }}>
            {shops && shops.shop && (
                <div>
                    <h2>Shops - {shops.shop?.length}</h2>
                    <input
                        type="text"
                        placeholder="Search by shop name, email, phone, or approval status"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <DataTable
                        columns={columns}
                        data={filteredShops}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 20, 50]}
                    />
                    <Button color="danger" onClick={handleAddShop}>Add shop</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Shop Form</ModalHeader>
                        <ModalBody>
                            <ShopsForm editId={editId} toggle={toggle} />
                        </ModalBody>
                    </Modal>
                </div>
            )}
        </div>
    );
}
