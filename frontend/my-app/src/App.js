import React, { useReducer, useEffect , useState} from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Routes, Route,Link } from 'react-router-dom'
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
import CustomersForm from './Components/Customer/CustomersForm'
import { CustomersContext } from './Context/CustomersContext'
import CustomersContainer from './Components/Customer/CustomersContainer'
import UsersControl from './Components/usersControl/usersControl'
// import { ToastContainer } from 'react-toastify'
// import { useDispatch, useSelector} from 'react-redux'
import ChitsContainer from './Components/Chit/ChitsContainer'
import ReviewsContainer from './Components/Review/ReviewsContainer'
import JewelContainer from './Components/Jewel/JewelContainer'
import { ChitsContext } from './Context/ChitsContext'
// import { startGetJewels } from './Components/Actions/Jewels'
import chitReducer from './Reducers/Chits'
// import UsersReducer from './Reducers/Users'
import CustomersReducer from './Reducers/Customers'

// import ShopsContainer from './Components/Shop/ShopsContainer'
// import InvoiceContainer from './Components/Invoice/InvoiceContainer'

import { ShopsContext } from './Context/ShopsContext'
// import shopReducer from "./Reducers/Shops"
import Main from './Components/Main/Main'
import ChitForm from './Components/Chit/ChitsForm'
import ShopsContainer from './Components/Shop/ShopsTable'
import Owner from './Components/OwnerDashboard/Owner'

export default function App() {
  // const [chits, chitDispatch] = useReducer(chitReducer, {data: []})
  // const [users, usersDispatch] = useReducer(UsersReducer, {userDetails : [], isLoggedIn : false});
  const [customers, customerDispatch] = useReducer(CustomersReducer, {data:[]})
  const [ownerId,setOwnerId] = useState('')
  const { user, handleLogin,  handleLogout } = useAuth() 

  const dispatch = useDispatch()

    useEffect(() => {
      if(localStorage.getItem('token')) {
              dispatch(startGetUserDetails())
      }

      // (async ()=>{
      //   try{
      //     const customersResponse = await axios.get('http://localhost:3009/api/customers');
      //     console.log('customer',customersResponse.data)
      //     customerDispatch({ type: 'SET_CUSTOMERS', payload: customersResponse.data });    
      //   }
      //   catch(err){
      //     console.log(err)
      //   }
      // })();

  }, []);
  useEffect(() => {
    (async () => {
      try {
        console.log('Fetching customer data...');
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
  }, [customerDispatch,ownerId]);
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
 
    
   
    

  // }, [handleLogin,customerDispatch])

  // useEffect (()=>{
  //   dispatch(startGetShop())
  // },[dispatch])

  const shops = useSelector((state) => state.shops)


  // useEffect(() => {

  //   (async () => {
  //     try {
  //       const chitsResponse = await axios.get('http://localhost:3009/api/chits')
  //       // ,
  //       // {
  //       //   headers : {
  //       //     Authorization : localStorage.getItem('token')
  //       //   }
  //       // });
  //       chitDispatch({ type: 'SET_CHIT', payload: chitsResponse.data });

  //       // const customersResponse = await axios.get('http://localhost:3009/api/customers');
  //       // customerDispatch({ type: 'SET_CUSTOMERS', payload: customersResponse.data });

  //       const shopsResponse = await axios.get('http://localhost:3009/api/shops');
  //       shopDispatch({ type: 'SET_SHOP', payload: shopsResponse.data });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
// }
  // },[handleLogin, chitDispatch, shopDispatch]);

  // useEffect(()=>{
  //   if(localStorage.getItem('token')){
  //     dispatch(startGetUserDetails())
  //   }
  // }, [handleLogin])

  // const dispatch = useDispatch()
  
  // useEffect(()=>{
  //   dispatch(startGetJewels())
  // },[dispatch])

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const chitsResponse = await axios.get('http://localhost:3009/api/chits',{
  //         headers : {
  //           Authorization : localStorage.getItem('token')
  //         }
  //       });
  //       chitDispatch({ type: 'SET_CHIT', payload: chitsResponse.data });

  //       // const customersResponse = await axios.get('http://localhost:3009/api/customers');
  //       // customerDispatch({ type: 'SET_CUSTOMERS', payload: customersResponse.data });

  //       const shopsResponse = await axios.get('http://localhost:3009/api/shops');
  //       shopDispatch({ type: 'SET_SHOP', payload: shopsResponse.data });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  // useEffect(()=>{
  //   if(localStorage.getItem('token')){
  //     dispatch(startGetUserDetails())
  //   }
  // },[dispatch])

  const loginToast = () => {
    toast.success('Logged in successfully', {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    })
}

const registerToast = () => {
  toast.success('Successfully created account', {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  })
}


  return (
    <div>
      <>
      { !user ? (
              <>
              <Link to = '/'>Home</Link> |
              <Link to="/signup">Register</Link>| 
              <Link to="/login">Log-in</Link>
              </> 
            ): (
              <>
                  <Link to="/account">Account</Link> |
                  <Link to="/shop">shop</Link> |
                  {/* <Link to = '/admin'>admin</Link> | */}
                  <Link to="/customers">customer</Link> |
                  {/* <Link to = "/create-chit">chit</Link> | */}
                  <Link to="/" onClick={() => {
                    localStorage.removeItem('token')
                    handleLogout()
                  }}> Logout </Link> | 
                </> 
            )}
                  </>

        {/* <ChitsContext.Provider value={{ chits, chitDispatch }}> */}
          {/* <UsersContext.Provider value={{ users, usersDispatch }}> */}
            {/* <CustomersContext.Provider value={{ customers, customerDispatch }}> */}
                    <CustomersContext.Provider value={{ customers, customerDispatch }}> 
                  <Routes>
                    <>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<RegisterForm registerToast = {registerToast}/>} />
                    <Route path = '/otp' element = {<OtpVerificationForm/>}/>
                    <Route path = '/login' element = {<LoginForm loginToast = {loginToast}/>}/>
                    <Route path = '/usersControl' element = {<UsersControl/>}/>
                    <Route path='/admin' element={<Admin/>}/>
                    <Route path='/owner' element={<Owner/>}/>
                    <Route path = '/shop' element = {<ShopsContainer/>}/>
                    <Route path = '/customers' element = {<CustomersContainer/>}/>
                    <Route path = '/account' element = {
                      <PrivateRoute permittedRoles = {['admin','owner','customer']}>
                        <Account/>
                      </PrivateRoute>
                    }/>
                    {/* <Route path = '/shop' element = {
                      <PrivateRoute permittedRoles = {['owner']}>
                        <ShopsContainer/>
                      </PrivateRoute>
                    }/> */}
                    {/* <Route path = '/create-customer' element = {
                      <PrivateRoute permittedRoles={['owner']}>
                        <CustomersForm/>
                      </PrivateRoute>
                    }/> */}
                    <Route path = '/create-chit' element = {
                      <PrivateRoute permittedRoles = {['owner']}>
                        <ChitForm/>
                      </PrivateRoute>
                    }/>
                    <Route path="/unauthorized" element={<Unauthorized /> } />
                    {/* <Route path = '/dashboard' element = {<Main/>}/>
                    <Route path= '/shops' element={<ShopsForm />}/>
                    <Route path = '/customers' element = {<CustomersContainer/>}/> */}
                    {/*  />
                    <Route path='/chits' element={<ChitsContainer />} />
                     <Route path='/login' element={<LoginForm />} />
                     <Route path = '/otp' element = {<OtpVerificationForm/>}/>  */}
                     
                     </>
                  </Routes>
                  </CustomersContext.Provider> 
                  {/* <CustomersContainer/> */}


                  {/* <ToastContainer />
                  <ChitsContainer/> 
                   <UsersContainer/> 
                   <ShopsContainer/>

                  <ToastContainer />
                  <ChitsContainer/>
                  {/* <UsersContainer/> */}
                   {/* <ShopsContainer/> */}
                   {/* <CustomersContainer/>
                  <JewelContainer/>
                  <ReviewsContainer/>
                  <InvoiceContainer/>  */}
              {/* </ShopsContext.Provider>
            </CustomersContext.Provider> */}
          {/* </UsersContext.Provider> */}
        {/* </ChitsContext.Provider> */}
    </div>
  );
}
