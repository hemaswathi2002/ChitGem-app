import {createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import JewelsReducer from '../Reducers/Jewels'
import ReviewReducer from '../Reducers/Reviews'
const configureStore = ()=>{
    const store = createStore(combineReducers({
        jewels : JewelsReducer,
        reviews:ReviewReducer

    }), applyMiddleware(thunk))
    return store
}
export default configureStore
     