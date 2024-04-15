export default function UsersReducer(state,action){
    switch(action.type){
        case 'SET_USER': {
            return {...state, usersDetails : action.payload }
        }
        case 'SIGN_IN' : {
            return {...state, isLoggedIn : action.payload}
        }
        default : {
            return {...state}
        }
    }
}