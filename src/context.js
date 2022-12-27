import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState={
  loading:false,
  cart:cartItems,
  total:0.00,
  amount:3,
}


const AppProvider = ({ children }) => {



  const [state,dispatch]=useReducer(reducer,initialState);

  const clearCart=()=>{
    dispatch({
      type:'CLEAR_CART'
    })
  }

const removeItem=(id)=>{
  dispatch({
    type:'REMOVE',
    payload:id

  })
}

const Increase=(id)=>{
  dispatch({
    type:'INCREASE',
    payload:id
  })
}
const Decrease=(id)=>{
  dispatch({
    type:'DECREASE',
    payload:id
  })
}


const fetchData=async ()=>{
  dispatch({type:"LOADING"});

  const response=await fetch(url);
  const cart=await response.json();

  dispatch({type:'DISPLAY_ITEMS',payload:cart})
}


useEffect(()=>{
  fetchData()
},[])








// whenever there is change in cart
useEffect(()=>{
  dispatch({type:'GET_TOTAL'})
},[state.cart])



  const globalThings={
    ...state,clearCart,removeItem,Increase,Decrease,fetchData
  }

  return (
    <AppContext.Provider
      value={globalThings}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
