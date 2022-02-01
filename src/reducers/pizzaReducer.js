import { types } from "../types/types";



const initialState = {
    content: [],
    cliente: '',
    fecha: '',
    extra: ''
}


export const pizzaReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.addTopping:
            return {
                ...state,
                content: [
                    ...state.content,
                    action.payload
                ]
            }
        case types.deleteTopping:
            return {
                ...state,
                content: state.content.filter(topping => topping.id !== action.payload.id)
            }

        case types.finishComanda:
            return {
                ...state,
                cliente: action.payload.nombre,
                fecha: new Date(),
                extra: action.payload.extra

            }

        case types.cleanComanda:
            return {
                content: [],
                cliente: '',
                fecha: '',
                extra: ''
            }
            
        default:
            return state;
    }

}