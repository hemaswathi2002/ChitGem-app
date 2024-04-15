import ChitsContainer from "./Components/Chits/ChitsContainer";
import{ChitContext} from'./contexts/root-context'
import chitReducer from "./Reducers/chitReducer";
import { useReducer,useEffect } from "react";
 import axios from 'axios'
 import{BrowserRouter} from "react-router-dom"
 
 export default function App(){
  const initalData={
    data:[],
    errors:[]
  }
  const [chits,chitDispatch]=useReducer(chitReducer,initalData)
  console.log(chits)
  useEffect(()=>{
    (async()=>{
      try{
        const response=await axios.get('http://localhost:3009/api/chits')
        console.log(response.data)
        chitDispatch({type:'SET_CHIT',payload:response.data})
      }catch(err){
        console.log(err)
      }
    })();
  },[])
  return(
    <div>
      <h1>APP Component</h1>
    <BrowserRouter>
    <ChitContext.Provider value={{chits,chitDispatch}}>
      <ChitsContainer/>
    </ChitContext.Provider>
    </BrowserRouter>
    </div>
  )
 }