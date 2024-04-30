// import {useNavigate} from 'react-router-dom'
// import { CustomersContext } from "../../Context/CustomersContext"
// import CustomersForm from './CustomersForm'
// import { useContext } from "react"
// import axios from 'axios'
// import {useState} from 'react'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// export default function CustomersList(){
//     const {customers,customerDispatch} = useContext(CustomersContext)
//     const [modal, setModal] = useState(false)
//     const [editId,setEditId] = useState('')
//     console.log(customers)


//     const navigate = useNavigate()

//     const toggle = () => setModal(!modal)

//     const handleRemove = async(id) => {
//         const confirmation = window.confirm('Are you sure?')
//         if(confirmation)
//         try{
//         const response = await axios.delete(`http://localhost:3009/api/customers/${id}`)
//         customerDispatch({type:'REMOVE_CUSTOMERS', payload : id})
//         navigate('/chit')
//         }
//         catch(err){
//             console.log(err)
//         }
//     }

//     const handleEdit = (id)=>{
//         setEditId(id)
//         toggle()
//     }

//     console.log(customers)
//     return(
//         <div>
//             <h2>Customers - {customers.data.length}</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Mobile</th>
//                         <th>Description</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {Array.isArray(customers.data) && customers.data.map((ele, i) => {
//                         return <tr key = {i}>
//                             <td>{ele.name}</td>
//                             <td>{ele.contact && ele.contact.email}</td>
//                             <td>{ele.contact && ele.contact.mobile}</td>
//                             <td>{ele.description}</td>
//                             <td><button onClick = {()=>
//                                 handleEdit(ele._id)}>edit</button>
//                             <button onClick = {()=>
//                                 handleRemove(ele._id)}>remove</button>
//                             </td>
//                         </tr>
//                     })}
//                 </tbody>
//             </table>
//             <div>
//       <Button color="danger" onClick={toggle}>
//         Click Me
//       </Button>
//       <Modal isOpen={modal} toggle={toggle}>
//         <ModalHeader toggle={toggle}>Edit Customer</ModalHeader>
//         <ModalBody>
//           <CustomersForm editId = {editId} toggle = {toggle}/>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={toggle}>
//             Do Something
//           </Button>{' '}
//           <Button color="secondary" onClick={toggle}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//         </div>
//     )
//}




 import { useNavigate } from 'react-router-dom'
import { CustomersContext } from '../../Context/CustomersContext'
import CustomersForm from './CustomersForm'
import { useContext, useState, useEffect } from 'react'
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
                const response = await axios.delete(`http://localhost:3009/api/customers/${id}`)
                customerDispatch({ type: 'REMOVE_CUSTOMERS', payload: id })
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
            <table>
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
                                        <button onClick={() => handleEdit(ele._id)}>edit</button>
                                        <button onClick={() => handleRemove(ele._id)}>remove</button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            <div>
                <Button color="danger" onClick={toggle}>
                    Click Me
                </Button>
                <Modal isOpen={modal} toggle={toggle} users={users}> {/* Pass users prop to the Modal */}
    <ModalHeader toggle={toggle}>Edit Customer</ModalHeader>
    <ModalBody>
        <CustomersForm editId={editId} toggle={toggle} users={users} /> {/* Pass users prop to the CustomersForm */}
    </ModalBody>
    <ModalFooter>
        <Button color="primary" onClick={toggle}>
            Do Something
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
            Cancel
        </Button>
    </ModalFooter>
</Modal>

            </div>
        </div>
    )
}
