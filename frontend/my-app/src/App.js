import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ChitsContainer from './Components/Chit/ChitsContainer'
import CustomersContainer from './Components/Customer/CustomersContainer'
import UsersContainer from './Components/Users/UsersContainer'

import LoginForm from './LoginForm'
import { ChitsContext } from './Context/ChitsContext'
import { UsersContext } from './Context/UsersContext'
import { CustomersContext } from './Context/CustomersContext'

import chitReducer from './Reducers/Chits'
import UsersReducer from './Reducers/Users'
import CustomersReducer from './Reducers/Customers'

import ShopsContainer from './Components/Shop/ShopsContainer'
import { ShopsContext } from './Context/ShopsContext'
import shopReducer from "./Reducers/Shops"

export default function App() {
  const initialChitData = {
    data: [],
    errors: [],
  };
  const [chits, chitDispatch] = useReducer(chitReducer, initialChitData)

  const initialUserData = {
    userDetails: [],
    isLoggedIn: false,
  };
  const [users, usersDispatch] = useReducer(UsersReducer, initialUserData);

  const initialCustomerData = {
    data: [],
    errors: [],
  };
  const [customers, customerDispatch] = useReducer(CustomersReducer, initialCustomerData);

  const initialShopData = {
    data: [],
    errors: [],
  };
  const [shops, shopDispatch] = useReducer(shopReducer, initialShopData);

  useEffect(() => {
    (async () => {
      try {
        const chitsResponse = await axios.get('http://localhost:3009/api/chits');
        chitDispatch({ type: 'SET_CHIT', payload: chitsResponse.data });

        const customersResponse = await axios.get('http://localhost:3009/api/customers');
        customerDispatch({ type: 'SET_CUSTOMERS', payload: customersResponse.data });

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
                  <Routes>
                    <Route path='/chits' element={<ChitsContainer />} />
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/customers' element={<CustomersContainer />} />
                    <Route path='/register' element={<UsersContainer />} />
                    {/* Add route for ShopsContainer */}
                    <Route path='/shops' element={<ShopsContainer />} />
                  </Routes>
                  <ToastContainer />
                  <CustomersContainer/>
                  <ChitsContainer/>
                  <ShopsContainer/>
                  <UsersContainer/>
                </BrowserRouter>
              </ShopsContext.Provider>
            </CustomersContext.Provider>
          </UsersContext.Provider>
        </ChitsContext.Provider>
      </>
    </div>
  );
}
