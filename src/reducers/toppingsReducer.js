import { types } from '../types/types'


const initialState = {
  toppings:[]
 
}

export const toppingsReducer = ( state = initialState , action ) =>{

    switch (action.type) {

        
        case types.createTopping:
            return {
                ...state,
               toppings: [
                   ...state.toppings,
                   action.payload
               ]
                   
            }
        case types.getToppings:
            return {
                ...state,
                toppings:[
                    ...action.payload
                ]   
            }
        case types.deleteTops:
            return{
                ...state,
                toppings: state.toppings.filter(topping => topping.id !== action.payload.id )
            }        
        
        
        default:
            return state;
    }

}