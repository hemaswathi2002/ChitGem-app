import { useNavigate } from 'react-router-dom'
import { CustomersContext } from '../../Context/CustomersContext'
import CustomersForm from './CustomersForm'
import { useContext, useState, useEffect } from 'react'
import '../../../src/index.css'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default function CustomersList(props) {
    const { customers, customerDispatch } = useContext(CustomersContext)
    const [modal, setModal] = useState(false)
    const [editId, setEditId] = useState('')
    const { users = [] } = props
    const [filteredUsers, setFilteredUsers] = useState(users)
    const [searchQuery, setSearchQuery] = useState('')

    const navigate = useNavigate()

    const toggle = () => setModal(!modal)

    const handleRemove = async (id) => {
        const confirmation = window.confirm('Are you sure?')
        if (confirmation) {
            try {
                await axios.delete(`http://localhost:3009/api/customers/${id}`,{
                    headers : {
                        Authorization : localStorage.getItem('token')
                    }
                })
                customerDispatch({ type: 'DELETE_CUSTOMERS', payload: id }) 
                navigate('/chit')
            } catch (err) {
                console.log(err)
            }
        }
    }
    const handleEdit = (id) => {
        setEditId(id)
        toggle()
    }

    useEffect(() => {
        console.log(filteredUsers)
        setFilteredUsers(Array.isArray(users) ? users : [])
    }, [users])

    const getCustomerEmail = (id) => {
        if (Array.isArray(filteredUsers)) {
            const user = filteredUsers.find(ele => ele._id === id)
            if (user) {
                return user.email
            }
        }
    }

    // Filter customers based on search query
    const filteredCustomers = customers.data.filter(customer =>
        customer.contact && customer.contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div>
            <h2>Customers - {customers.data.length}</h2>
            {/* Search input field */}
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
                        {Array.isArray(filteredCustomers) &&
                            filteredCustomers.map((ele, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{ele.name}</td>
                                        <td>{getCustomerEmail(ele._id)}{ele.contact && ele.contact.email}</td>
                                        <td>{ele.contact && ele.contact.mobile}</td>
                                        <td>{ele.description}</td>
                                        <td>
                                        <button onClick={() => handleEdit(ele._id)} style={{backgroundColor: '#ffb6c1'}}>edit</button>
                                        <button onClick={() => handleRemove(ele._id)} style={{backgroundColor: '#ffb6c1'}}>remove</button>
                                       </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
            <div>
            {/* <Button color="danger" onClick={toggle}>add customer</Button> */}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>customer form</ModalHeader>
                <ModalBody>
                    <CustomersForm editId={editId} toggle={toggle} />
                </ModalBody>
            </Modal>
            </div>
        </div>
    )
}