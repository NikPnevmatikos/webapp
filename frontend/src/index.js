import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'

import { productListReducer , userProductListReducer, productReducer,createProductReducer, editProductReducer,deleteProductReducer} from './reducers/ProductReducers'
import { bidReducer} from './reducers/bidReducers'
import { userLoginReducer, userRegisterReducer , userProfileReducer, userUpdateReducer , usersReducer , userDeleteReducer} from './reducers/userReducer'


const reducer = combineReducers({
    productListReducer,
    productReducer,
    deleteProductReducer,
    bidReducer,
    createProductReducer,
    editProductReducer,

    userLoginReducer,
    userRegisterReducer,
    userProfileReducer,
    userUpdateReducer,
    usersReducer,
    userDeleteReducer,
    userProductListReducer,
})

const localStoreProducts = localStorage.getItem('bidItems') ? 
  JSON.parse(localStorage.getItem('bidItems')) : []

const localStoreUser = localStorage.getItem('userInfo') ? 
  JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  bidReducer: {bidItems: localStoreProducts},
  userLoginReducer: {userInfo : localStoreUser}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
