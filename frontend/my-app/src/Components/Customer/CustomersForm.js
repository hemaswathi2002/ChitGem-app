// import {useState,useEffect,useContext} from 'react'
// import axios from 'axios'
// import { CustomersContext } from '../../Context/CustomersContext'
// export default function CustomersForm(props){
//     const {customers,customerDispatch} = useContext(CustomersContext)
//     const [name,setName] = useState('')
//     const [email,setEmail] = useState('')
//     const [mobile,setMobile] = useState('')
//     const [description,setDescription] = useState('')
//     const [customer,setCustomer] = useState([])
    
    

//     const {editId} = props
//     console.log(editId)

//     useEffect(()=>{
//         const customer = customers?.data.find(ele=>ele._id==editId)
//         setCustomer(customer)
//         if(customer){
//             setName(customer.name || '')
//             setEmail(customer.contact?.email || '')
//             setMobile(customer.contact?.mobile || '')
//             setDescription(customer.description || '')
//         }else{
//             setName('')
//             setEmail('')
//             setMobile('')
//             setDescription('')
//         }
//     },[customers,editId])

// //     const [form,setForm] = useState(customer ? {
// //         name : customer.name,
// //         email : customer.contact.email,
// //         mobile : customer.contact.mobile,
// //         description : customer.description
// //     } :{
// //     name : '',
// //     email : '',
// //     mobile : '',
// //     description : ''
// //     }
// //  )

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         const formData = {
//             name : name,
//             contact: { 
//             email:email,
//             mobile:mobile
//             },
//             description : description
//         }
//         try{
//             if(customer){
//                 const response = await axios.put(`http://localhost:3009/api/customers/${customer._id}`,formData,{
//                     headers : {
//                         Authorization : localStorage.getItem('token')
//                     }
//                 })
//                 console.log(response.data)
//                 customerDispatch({type:'UPDATE_CUSTOMERS', payload : response.data})
//                 props.toggle()

//             }else{
//             const response = await axios.post('http://localhost:3009/api/customers',formData,{
//                 headers : {
//                     Authorization : localStorage.getItem('token')
//                 }
//             })
//             console.log(response.data)
//             customerDispatch({type:'ADD_CUSTOMERS', payload: response.data})
//             setName('')
//             setEmail('')
//             setMobile('')
//             setDescription('')
//         }
//     }
//         catch(err){
//             console.log(err)
//         }
//     }
//     return(
//         <div>
//             <form onSubmit = {handleSubmit}>
//                 <div>
//                 <label htmlFor="name">name</label>
//                 <input type = "text"
//                 value = {name}
//                 onChange={(e)=>setName(e.target.value)}
//                 className='form-control'
//                 name = 'name'
//                 id = 'name'
//                 />
//                 </div>
//                 <div>
//                 <label htmlFor="email">email</label>
//                 <input type = "email"
//                 value = {email}
//                 onChange={(e)=>setEmail(e.target.value)}
//                 className='form-control'
//                 name = 'email'
//                 id = 'email'
//                 />  
//                 </div>
//                 <div>
//                 <label htmlFor="mobile">mobile</label>
//                 <input type = "text"
//                 value = {mobile}
//                 onChange={(e)=>setMobile(e.target.value)}
//                 className='form-control'
//                 name = 'mobile'
//                 id = 'mobile'
//                 />  
//                 </div>
//                 <div>
//                 <label htmlFor="description">description</label>
//                 <input type = "text"
//                 value = {description}
//                 onChange= {(e)=>setDescription(e.target.value)}
//                 className='form-control'
//                 name = 'description'
//                 id = 'description'
//                 />  
//                 </div>
//                 <div>
//                 <input type = 'submit' className='btn btn-primary'/>
//                 </div>
//             </form>
//         </div>
//     )
// }
// import { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { CustomersContext } from '../../Context/CustomersContext';
// import { useAuth } from '../../Context/AuthrorizeContext';

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CustomersContext } from '../../Context/CustomersContext';
import { useAuth } from '../../Context/AuthrorizeContext';

export default function CustomersForm(props) {
    const { customers, customerDispatch } = useContext(CustomersContext);
    const { editId, toggle } = props;

    // Initialize the form state with an empty customer object
    const [customer, setCustomer] = useState({
        name: '',
        contact: { email: '', mobile: '' },
        description: ''
    });

    useEffect(() => {
        if (editId) {
            const customer = customers?.data.find(ele => ele._id === editId);
            if (customer) {
                // Update the form state with the fetched customer data
                setCustomer(customer);
            }
        } else {
            // Reset the form state when there's no editId
            setCustomer({
                name: '',
                contact: { email: '', mobile: '' },
                description: ''
            });
        }
    }, [customers, editId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (editId) {
                response = await axios.put(`http://localhost:3009/api/customers/${editId}`, customer, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                customerDispatch({ type: 'UPDATE_CUSTOMERS', payload: response.data });
            } else {
                response = await axios.post('http://localhost:3009/api/customers', customer, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                customerDispatch({ type: 'ADD_CUSTOMERS', payload: response.data });
            }
            toggle(); // Close the form after submission
        } catch (err) {
           console.log(err)
        }
    };

    // Function to update the form state when any field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // If the field is nested, update the nested state correctly
        if (name.includes('.')) {
            const [fieldName, nestedField] = name.split('.');
            setCustomer(prevState => ({
                ...prevState,
                [fieldName]: {
                    ...prevState[fieldName],
                    [nestedField]: value
                }
            }));
        } else {
            setCustomer(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        value={customer.name}
                        onChange={handleChange}
                        className="form-control"
                        name="name"
                        id="name"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={customer.contact.email}
                        onChange={handleChange}
                        className="form-control"
                        name="contact.email"
                        id="email"
                    />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="text"
                        value={customer.contact.mobile}
                        onChange={handleChange}
                        className="form-control"
                        name="contact.mobile"
                        id="mobile"
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        value={customer.description}
                        onChange={handleChange}
                        className="form-control"
                        name="description"
                        id="description"
                    />
                </div>
                <div>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </div>
            </form>
        </div>
    );
}
