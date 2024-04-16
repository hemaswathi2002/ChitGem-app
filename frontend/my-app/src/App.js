import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChitsContainer from './Components/Chit/ChitsContainer';
import { ChitContext } from './Context/root-contexts'
import chitReducer from './Reducers/Chits'
import { UsersContext } from './Context/UsersContext';
import { CustomersContext } from './Context/CustomersContext';
import CustomersContainer from './Components/Customer/CustomersContainer';
import UsersContainer from './Components/Users/UsersContainer';
import LoginForm from './LoginForm';
import CustomersReducer from './Reducers/Customers';
import UsersReducer from './Reducers/Users';

export default function App() {
  const initialChitData = {
    data: [],
    errors: [],
  };
  const [chits, chitDispatch] = useReducer(chitReducer, initialChitData);

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

  useEffect(() => {
    (async () => {
      try {
        const chitsResponse = await axios.get('http://localhost:3009/api/chits');
        chitDispatch({ type: 'SET_CHIT', payload: chitsResponse.data });

        const customersResponse = await axios.get('http://localhost:3009/api/customers');
        customerDispatch({ type: 'SET_CUSTOMERS', payload: customersResponse.data });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div>
      <h1>App Component</h1>
      <>
        <ChitContext.Provider value={{ chits, chitDispatch }}>
          <UsersContext.Provider value={{ users, usersDispatch }}>
            <CustomersContext.Provider value={{ customers, customerDispatch }}>
              <BrowserRouter>
                <Routes>
                  <Route path='/chits' element={<ChitsContainer />} />
                  <Route path='/login' element={<LoginForm />} />
                  <Route path='/customers' element={<CustomersContainer />} />
                  <Route path='/register' element={<UsersContainer />} />
                </Routes>
                <ToastContainer />
                <UsersContainer/>
                <CustomersContainer/>
                <ChitsContainer/>
              </BrowserRouter>
            </CustomersContext.Provider>
          </UsersContext.Provider>
        </ChitContext.Provider>
      </>
    </div>
  );
}
