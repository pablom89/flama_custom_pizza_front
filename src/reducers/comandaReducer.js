
import { types } from '../types/types';
import moment from 'moment';

moment.locale('es');

 const initialState={
    pedido: [],
    datos: {}
}


export const comandaReducer = ( state= initialState , action ) =>{

      

    switch (action.type) {
        
        case types.addPizza:
            return{
                ...state,
                pedido:[
                    ...state.pedido,
                    action.payload
                ]
            }
        case types.deletePizza:
            return{
                ...state,
                pedido: state.pedido.filter( p => p.id !== action.payload.id)
            }
        case types.addCantidad:
            return{
                ...state,
                pedido: state.pedido.map((p) => {
                        if(p.id === action.payload.id){
                            return{
                                ...p,
                                cantidad: p.cantidad + 1
                            }
                        }
                    return p     
                })
            }
        case types.restarQty:
            return{
                 ...state,
                pedido: state.pedido.map( (p) => {
                    if( p.id === action.payload.id ){
                        return{
                            ...p,
                            cantidad: p.cantidad > 1 ? p.cantidad -1 : p.cantidad
                        }
                    }
                    return p
                    
                })
            }    
        case types.finishTicket:
            return{
                /* ticket:[
                    ...state.ticket,
                     action.payload
                ] */
                ...state,
                datos: action.payload,
                fecha: moment().format('ddd D MMM YYYY HH:mm:ss')
            }    
 
        default:
            return state;
    }




}