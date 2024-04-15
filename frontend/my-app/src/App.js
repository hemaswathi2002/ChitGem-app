import {useReducer,useEffect,useContext, createContext} from 'react'
import axios from 'axios'
import { UsersContext } from "./Context/UsersContext"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CustomersContext } from "./Context/CustomersContext"
import CustomersContainer from "./Components/Customer/CustomersContainer"
import UsersContainer from "./Components/Users/UsersContainer"
import LoginForm from "./LoginForm"
import CustomersReducer from "./Reducers/Customers"
import UsersReducer from "./Reducers/Users"
export default function App(){
  const [users,usersDispatch] = useReducer(UsersReducer, {
    userDetails : [],
    isLoggedIn : false
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

  // const loginToast = () => {
  //   toast.success('logged in successfully')
  // }


  return(
    <div>
      <h1>App Component</h1>
      <>
      <UsersContext.Provider value = {{users,usersDispatch}}>
      <CustomersContext.Provider value = {{customers,customerDispatch}}>
      <BrowserRouter>
      <Routes>
      <Route path = '/register' element = {<UsersContainer/>}/>
      <Route path = '/login' element = {<LoginForm/>}/>
      {users.isLoggedIn ? 
      <Route path = '/customer' element = {<CustomersContainer/>}/>
      : 
      <Route path = '/register' element = {<UsersContainer/>}/>
      }
      </Routes>
      <UsersContainer/>
      <ToastContainer/>
      </BrowserRouter>
      </CustomersContext.Provider>
      </UsersContext.Provider>
      </>
    </div>
  )
}