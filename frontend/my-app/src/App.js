import { CustomersContext } from "./Context/CustomersContext"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {useReducer,useEffect} from 'react'
import axios from 'axios'
import { UsersContext } from "./Context/UsersContext"
import CustomersContainer from "./Components/Customer/CustomersContainer"
import UsersContainer from "./Components/Users/UsersContainer"
import CustomersReducer from "./Reducers/Customers"
import UsersReducer from "./Reducers/Users"
export default function App(){
  const [users,usersDispatch] = useReducer(UsersReducer, {
    userDetails : [],
    errors : []
  })
  const [customers,customerDispatch] = useReducer(CustomersReducer,{data:[],errors:[]})
  
  useEffect(()=>{
    // (async()=>{
    //   try{
    //     const response = await axios.get()
    //   }
    //   catch(err){
    //     console.log(err)
    //   }
    // })();

    (async()=>{
      try{
        const response = await axios.get('http://localhost:3009/api/customers')
        console.log(response.data)
        customerDispatch({type:'SET_CUSTOMERS',payload:response.data})
      }
      catch(err){
        console.log(err)
      }
      
    })();
  },[])


  return(
    <div>
      <h1>App Component</h1>
      <>
      <UsersContext.Provider value = {{users,usersDispatch}}>
      <CustomersContext.Provider value = {{customers,customerDispatch}}>
      <BrowserRouter>
      <Routes>
      <Route path = '/register' element = {<UsersContainer/>}/>
      <Route path = '/customer' element = {<CustomersContainer/>}/>
      </Routes>
      <CustomersContainer/>
      </BrowserRouter>
      </CustomersContext.Provider>
      </UsersContext.Provider>
      </>
    </div>
  )
}