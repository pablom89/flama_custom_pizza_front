
import { types } from '../types/types';



const initialState = {
    pizzas: []
}

export const pizzaFlamaReducer = ( state = initialState , action ) => {


    switch ( action.type ) {
        case types.createPizza:
            return{
                ...state,
                pizzas: [
                    ...state.pizzas,
                    action.payload
                ]
            }
        
        case types.getPizzas:
            return{
                ...state,
                pizzas:[
                    ...action.payload
                ]
            }
        
        case types.deletePizzaF:
            return{
                ...state,
                pizzas: state.pizzas.filter(p => p.id !== action.payload.id )
            }

        default:
            return state;
    }


}

