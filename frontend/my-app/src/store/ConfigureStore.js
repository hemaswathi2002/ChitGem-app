import {createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import JewelsReducer from '../Reducers/Jewels'

const configureStore = ()=>{
    const store = createStore(combineReducers({
        jewels : JewelsReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore
     