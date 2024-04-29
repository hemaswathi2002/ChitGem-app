import {createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import JewelsReducer from '../Reducers/Jewels'
import ReviewReducer from '../Reducers/Reviews'
import shopReducer from '../Reducers/Shops'
import UsersReducer from '../Reducers/UsersReducer'
import {adminReducer}  from '../Reducers/adminReducer'

const configureStore = ()=>{
    const store = createStore(combineReducers({
        users : UsersReducer,
        admin : adminReducer
        // shops : shopReducer,
        // jewels : JewelsReducer,
        // reviews:ReviewReducer

    }), applyMiddleware(thunk))
    return store
}
export default configureStore
     