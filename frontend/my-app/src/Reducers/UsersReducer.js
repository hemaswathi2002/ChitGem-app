const initialState={
    users:{}
}
const usersReducers=(state=initialState,action)=>{
      switch(action.type){
        case "SET_USER_DETAILS":{
            return {...state,users:{...action.payload}}
        }
        case "SET_USER_EMPTY":{
            return initialState
        }
        default :{
            return state
        }
      }
}
export default usersReducers