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

import { productListReducer ,
         userProductListReducer, 
         productReducer,
         createProductReducer, 
         editProductReducer,
         deleteProductReducer,
         recommendedProductReducer,
         viewProductReducer
        } from './reducers/ProductReducers'
        
import { userBidsListReducer,productBidsListReducer, createBidReducer, deleteBidReducer} from './reducers/bidReducers'
import { userLoginReducer, 
          userRegisterReducer , 
          userProfileReducer, 
          userUpdateReducer , 
          usersReducer , 
          userDeleteReducer,
          userVerifyReducer,
          buyerReviewReducer,
          sellerReviewReducer,
          getXmlReducer,
          getJsonReducer
        } from './reducers/userReducer'

import {userMessageListReducer , 
        userMessageSendReducer, 
        messageReducer, 
        createMessageReducer,
        unreadMessageReducer 
      } from './reducers/MessageReducer'


const reducer = combineReducers({
    productListReducer,
    productReducer,
    deleteProductReducer,
    createBidReducer,
    deleteBidReducer,
    userBidsListReducer,
    productBidsListReducer,
    createProductReducer,
    editProductReducer,
    recommendedProductReducer,
    viewProductReducer,

    userLoginReducer,
    userRegisterReducer,
    userProfileReducer,
    userUpdateReducer,
    usersReducer,
    userDeleteReducer,
    userProductListReducer,
    userVerifyReducer,
    buyerReviewReducer,
    sellerReviewReducer,
    getXmlReducer,
    getJsonReducer,

    userMessageListReducer,
    userMessageSendReducer,
    messageReducer,
    createMessageReducer,
    unreadMessageReducer,
    
})


const localStoreUser = localStorage.getItem('userInfo') ? 
  JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
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
