import React, { useReducer, useEffect , useState} from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Routes, Route,Link } from 'react-router-dom'
import Header from './Components/header/header'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from './Context/AuthrorizeContext'
import { toast } from 'react-toastify'
import Home from './Components/usersControl/Home'
import OtpVerificationForm from './Components/UsersAuthentication/OtpVerification'
import LoginForm from './Components/UsersAuthentication/LoginForm'
import PrivateRoute from './Components/PrivateRoute'
import Account from './Components/Account'
import RegisterForm from './Components/UsersAuthentication/RegisterForm'
import { startGetUserDetails } from './Components/Actions/Users'
import Admin from './Components/AdminDashboard/admin'
import Unauthorized from './Components/Unauthorized'
import { startGetShop } from './Components/Actions/shops'
import { CustomersContext } from './Context/CustomersContext'
import CustomersContainer from './Components/Customer/CustomersContainer'
import UsersControl from './Components/usersControl/usersControl'
import InvoiceTable from './Components/OwnerDashboard/Invoice/InvoiceTable'
import ChitsContainer from './Components/Chit/ChitsContainer'
import JewelContainer from './Components/Jewel/JewelContainer'
import { ChitsContext } from './Context/ChitsContext'
import chitReducer from './Reducers/Chits'
import CustomersReducer from './Reducers/Customers'
import ForgotPassword from './Components/UsersAuthentication/PasswordSettings'
import ShopsContainer from './Components/Shop/ShopsTable'
import Owner from './Components/OwnerDashboard/Owner'
import CustomerDetails from './Components/CustomerDashboard/CustomerDetails'
import ChitDetails from './Components/CustomerDashboard/ChitDetails'
import Invoice from './Components/CustomerDashboard/Invoice/Invoice'
import WishlistItems from './Components/Wishlists/WishlistItems'
import JewelsTable from './Components/Jewel/JewelTable'
import ApprovedShopsTable from './Components/Shop/ApprovedShopsTable'
export default function App() {
  const [chits, chitDispatch] = useReducer(chitReducer, {data: []})
  const [customers, customerDispatch] = useReducer(CustomersReducer, {data:[]})
  const [ownerId,setOwnerId] = useState('')
  const { user} = useAuth() 

  const dispatch = useDispatch()

    useEffect(() => {
      if(localStorage.getItem('token')) {
              dispatch(startGetUserDetails())
      }
  }, []);
  
  useEffect(() => {
    if (user) {
      console.log("User ID:", user._id);
      setOwnerId(user._id); 
    }
  }, [user]);

  useEffect(() => {
    if(ownerId){
      dispatch(startGetShop(ownerId));
    }else {
      console.log("User is undefined or doesn't have an ID property:", user);
    }
  }, [dispatch, ownerId]);

  useEffect(() => {
    (async () => {
      try {
        const customersResponse = await axios.get(`http://localhost:3009/api/customers/${ownerId}`,{
          headers : {
            Authorization : localStorage.getItem('token')
          }
        });
        console.log('customer', customersResponse.data);
        customerDispatch({ type: 'SET_CUSTOMERS', payload: customersResponse.data });    
      } catch(err) {
        console.log(err);
      }
    })();

    (async () => {
          try {
            const chitsResponse = await axios.get('http://localhost:3009/api/chits',{
              headers : {
                Authorization : localStorage.getItem('token')
              }
            });
            console.log(chitsResponse.data)
            chitDispatch({ type: 'SET_CHIT', payload: chitsResponse.data });
    
          } catch (err) {
            console.log(err);
          }
        })();

  }, [customerDispatch,ownerId,chitDispatch]);
 
    
  const users = useSelector((state) => state.users)

  console.log(users)

  const loginToast = () => {
    toast.success('Logged in successfully', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    })
}

const registerToast = () => {
  toast.success('Successfully created account', {
    position: "top-right",
    autoClose: 1000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  })
}


  return (

      <>
      <Header/>

        <ChitsContext.Provider value={{ chits, chitDispatch }}>
                    <CustomersContext.Provider value={{ customers, customerDispatch }}> 
                  <Routes>
                    <>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<RegisterForm registerToast = {registerToast}/>} />
                    <Route path = '/otp' element = {<OtpVerificationForm/>}/>
                    <Route path = '/login' element = {<LoginForm loginToast = {loginToast}/>}/>
                    <>
                    {user ? (
                      <>
                      <Route path = '/usersControl' element = {<UsersControl/>}/>
                    <Route path='/admin' element={<Admin/>}/>
                    <Route path='/owner' element={<Owner/>}/>
                    <Route path = '/shop' element = {<ShopsContainer/>}/>
                    <Route path = '/customer/:id' element = {<CustomerDetails/>}/>
                    <Route path = '/invoice' element = {<InvoiceTable/>}/>
                    <Route path = '/customers-user' element = {<CustomerDetails/>}/>
                    <Route path = '/customers' element = {    
                      <PrivateRoute permittedRoles = {['owner']}>
                        <CustomersContainer users = {users}/>
                      </PrivateRoute>
                    }/>
                    <Route path = '/chit-users' element = {<ChitDetails/>}/>
                    <Route path = '/approved-status' element = {<ApprovedShopsTable/>}/>
                    <Route path = '/wishlist' element = {<WishlistItems/>}/>
                    <Route path = '/account' element = {
                      <PrivateRoute permittedRoles = {['admin','owner','customer']}>
                        <Account/>
                      </PrivateRoute>
                    }/>
                    <Route path = '/jewels' element = {<JewelContainer/>}/>
                    <Route path='/forgotpassword' element={<ForgotPassword/>}/>
                    <Route path = '/invoices-user' element = {<Invoice/>}/>
                    <Route path = '/jewels-user' element = {<JewelsTable/>}/>
                    <Route path = '/chit' element = {
                      <PrivateRoute permittedRoles = {['owner']}>
                        <ChitsContainer/>
                      </PrivateRoute>
                    }/>
                    <Route path = {'/chits/:id'} element = {<ChitDetails/>}/>
                      </>
                    ) : (
                      <Route path='/' element = {<Home/>}/>
                    )}
                    
                    </>
                    <Route path="/unauthorized" element={<Unauthorized /> } />
                     </>
                  </Routes>
                  </CustomersContext.Provider> 
                  </ChitsContext.Provider>
        </> 

);
}
