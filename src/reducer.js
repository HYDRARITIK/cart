import { type } from "@testing-library/user-event/dist/type";
import { act } from "react-dom/test-utils";

const reducer=(state,action)=>{
    if(action.type==='CLEAR_CART'){
        return {...state,cart:[]}
    }
    if(action.type==='REMOVE'){
        // Item_id=action.payload;
        return {...state,cart:state.cart.filter((item)=>{
            return item.id!==action.payload
        })}

    }
    if(action.type==='INCREASE'){
        return {...state,cart:state.cart.map((item)=>{
            if(item.id===action.payload){
                return { ...item, amount: item.amount + 1 }
            } 
            return item
        })}
    }




    if(action.type==='DECREASE'){
       
          return { ...state, cart: state.cart.map((item) => {
            if (item.id === action.payload) {
              return { ...item, amount: item.amount - 1 }
            }
            return item
          })}
    }

    if(action.type==='GET_TOTAL'){
        var {total,amount}=state.cart.reduce((cartTotal,cartItem)=>{
            const {price,amount}=cartItem
            cartTotal.amount+=amount;
            cartTotal.total+=amount*price
            // console.log(cartTotal)


            return cartTotal
        },{
            total:0,
            amount:0
        })
        total=parseFloat(total.toFixed(2))

        return {...state,total,amount}
    
    }

    if(action.type==='LOADING'){
        return {...state,loading:true}
    }

    if(action.type==='DISPLAY_ITEMS'){
        return {...state,cart:action.payload,loading:false}
    }







return state;





}


export default reducer;




