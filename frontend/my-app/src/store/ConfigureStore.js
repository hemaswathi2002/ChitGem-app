import {createStore,combineReducers,applyMiddleware} from 'redux'
import { thunk } from 'redux-thunk'
import JewelsReducer from '../Reducers/Jewels'
import ReviewReducer from '../Reducers/Reviews'
import shopReducer from '../Reducers/Shops'
import UsersReducer from '../Reducers/UsersReducer'
// import {ownerReducer} from '../Reducers/ownerReducer'
import {adminReducer}  from '../Reducers/adminReducer'
import { customerReducer } from '../Reducers/customerReducer'
import invoicesReducer from '../Reducers/Invoice'

const configureStore = ()=>{
    const store = createStore(combineReducers({
        users : UsersReducer,
        admin : adminReducer,
        customer : customerReducer,
        shops : shopReducer,
        jewels : JewelsReducer,
        invoice : invoicesReducer
        // reviews:ReviewReducer

    }), applyMiddleware(thunk))
    return store
}
export default configureStore
     