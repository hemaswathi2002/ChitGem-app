// import React, { useContext, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
// import { startRemoveShop } from '../Actions/shops';
// import'../../index.css'
// import ShopsForm from './ShopsForm';


// export default function ShopsTable() {
//     const [modal, setModal] = useState(false);
//     const [editId, setEditId] = useState('');
//     const toggle = () => setModal(!modal);

//     const shops = useSelector((state) => state.shops)
//     console.log(shops,'shopData')


//     const dispatch = useDispatch()

//     const navigate = useNavigate()

//     const handleRemove = async (id) => {
//         const confirmation = window.confirm('Are you sure?');
//         if (confirmation) {
//             try {
//                 dispatch(startRemoveShop(id));
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     };

//     const handleEdit = (id) => {
//         setEditId(id);
//         toggle();
//     };
//     const handleAddShop = () => {
//         setEditId(''); 
//         toggle(); // Open the modal
//     };
//  return (
//         <div>
//             {shops &&
//                 <div>
//                     <h2>shops - {shops.shop?.length}</h2>
//                     <table className="styled-table">
//                         <thead style={{ backgroundColor: 'lightpink' }}> 
//                             <tr>
//                                 <th>Shop</th>
//                                 <th>Email</th>
//                                 <th>Mobile</th>
//                                 <th>Area</th>
//                                 <th>City</th>
//                                 <th>State</th>
//                                 <th>Pincode</th>
//                                 <th>Description</th>
//                                 <th>ApprovalStatus</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {shops.shop.map(shop => (
//                                 <tr key={shop._id} className="table-row">
//                                     <td>{shop.shopName}</td>
//                                     <td>{shop.contact?.email}</td>
//                                     <td>{shop.contact?.mobile}</td>
//                                     <td>{shop.address?.area}</td>
//                                     <td>{shop.address?.city}</td>
//                                     <td>{shop.address?.state}</td>
//                                     <td>{shop.address?.pincode}</td>
//                                     <td>{shop.description}</td>
//                                     <td>{shop.approvalStatus}</td>
//                                     <td>
//                                         <button className="edit-button" onClick={() => handleEdit(shop._id)}>Edit</button>
//                                         {/* <button onClick={() => handleRemove(shop._id)}>Remove</button> */}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <Button color="danger" onClick={handleAddShop}>Add shop</Button>
//                     <Modal isOpen={modal} toggle={toggle}>
//                         <ModalHeader toggle={toggle}>Shop Form</ModalHeader>
//                         <ModalBody>
//                             <ShopsForm editId={editId} toggle={toggle} />
//                         </ModalBody>
//                     </Modal>
//                 </div>
//             }
//         </div>
//     );
// }
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

    return (
        <div style = {{paddingTop:'80px'}}>
        {shops && shops.shop && (
                <div>
                    <h2>shops - {shops.shop?.length}</h2>
                    <DataTable
                        columns={columns}
                        data={shops.shop}
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
