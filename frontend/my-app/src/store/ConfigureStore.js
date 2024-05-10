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
import wishlistReducer from '../Reducers/wishlists'
import paymentReducer from '../Reducers/paymentReducer'

const configureStore = ()=>{
    const store = createStore(combineReducers({
        users : UsersReducer,
        admin : adminReducer,
        customer : customerReducer,
        shops : shopReducer,
        jewels : JewelsReducer,
        payment : paymentReducer,
        invoice : invoicesReducer,
        wishlist:wishlistReducer
        // reviews:ReviewReducer

    }), applyMiddleware(thunk))
    return store
}
export default configureStore
     