import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ChitsContainer from './Components/Chit/ChitsContainer'
import CustomersContainer from './Components/Customer/CustomersContainer'
import ReviewsContainer from './Components/Review/ReviewsContainer'
import Home from './Components/Home/Home'
import UsersContainer from './Components/Users/UsersContainer'
import OtpVerificationForm from './Components/Users/OtpVerification'
import JewelContainer from './Components/Jewel/JewelContainer'
import LoginForm from './LoginForm'
import { ChitsContext } from './Context/ChitsContext'
import { UsersContext } from './Context/UsersContext'
import { CustomersContext } from './Context/CustomersContext'
import { startGetJewels } from './Components/Actions/Jewels'

import chitReducer from './Reducers/Chits'
import UsersReducer from './Reducers/Users'
import CustomersReducer from './Reducers/Customers'

import ShopsContainer from './Components/Shop/ShopsContainer'
import { ShopsContext } from './Context/ShopsContext'
import shopReducer from "./Reducers/Shops"

export default function App() {
  const [chits, chitDispatch] = useReducer(chitReducer, {data: []})
  const [users, usersDispatch] = useReducer(UsersReducer, {userDetails : [], isLoggedIn : false});
  const [customers, customerDispatch] = useReducer(CustomersReducer, {data:[]});
  const [shops, shopDispatch] = useReducer(shopReducer, {data:[]});

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(startGetJewels())
  },[])

  useEffect(() => {
    (async () => {
      try {
        const chitsResponse = await axios.get('http://localhost:3009/api/chits');
        chitDispatch({ type: 'SET_CHIT', payload: chitsResponse.data });

        // const customersResponse = await axios.get('http://localhost:3009/api/customers');
        // customerDispatch({ type: 'SET_CUSTOMERS', payload: customersResponse.data });

        const shopsResponse = await axios.get('http://localhost:3009/api/shops');
        shopDispatch({ type: 'SET_SHOP', payload: shopsResponse.data });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div>
      <h1>App Component</h1>
      <>
        <ChitsContext.Provider value={{ chits, chitDispatch }}>
          <UsersContext.Provider value={{ users, usersDispatch }}>
            <CustomersContext.Provider value={{ customers, customerDispatch }}>
              <ShopsContext.Provider value={{ shops, shopDispatch }}>
                <BrowserRouter>
                <Link to = '/'>Home</Link> | <Link to = '/register'> register</Link> | <Link to = '/login'>login</Link>
                  <Routes>
                 
                    <>
                    {/* <Route path='/shops' element={<ShopsContainer />} />
                    <Route path = '/customers' element = {<CustomersContainer/>}/>
                    <Route path='/chits' element={<ChitsContainer />} />
                     <Route path='/' element={<Home />} />
                     <Route path='/register' element={<UsersContainer />} />
                     <Route path='/login' element={<LoginForm />} />
                     <Route path = '/otp' element = {<OtpVerificationForm/>}/> */}
                     </>
                  </Routes>
                  <ToastContainer />
                  <UsersContainer/>
                  <ShopsContainer/>
                  <OtpVerificationForm/>
                  <CustomersContainer/>
                  <ChitsContainer/>
                  <JewelContainer/>
                  <ReviewsContainer/>
                </BrowserRouter>
              </ShopsContext.Provider>
            </CustomersContext.Provider>
          </UsersContext.Provider>
        </ChitsContext.Provider>
      </>
    </div>
  );
}
