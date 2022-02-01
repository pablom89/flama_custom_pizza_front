import { types } from '../../types/types';

import { fetchConToken, fetchSinToken } from '../../helpers/fetchSinToken';
import Swal from 'sweetalert2';




export const createTop = ( description, type, id ) => ({

    type: types.createTopping,
    payload: {
        description,
        type,
        id
    }
})


export const createTopAtDb = ( description, type ) => {

    return async( dispatch ) =>{

        try {

            const resp = await fetchConToken('toppings',{ description, type }, 'POST');
            const body = await resp.json();

            const { toppingGuardado } = body;

            console.log( toppingGuardado )

            if( body.ok ){

                dispatch( createTop( toppingGuardado.description, toppingGuardado.type, toppingGuardado.id ) )
            }

            Swal.fire({
                icon: 'success',
                text: 'Topping creado! :)'
            })
        } catch (error) {
            console.log(error) 
        }

    
    }

    
}


export const toppingsStartLoading = () =>{

    return async (dispatch) =>{

        try {

            const resp = await fetchSinToken('toppings');
            const body = await resp.json();

            if(body.ok){

                dispatch( getToppings(body.toppings) )
            }
        } catch (error) {
            console.log(error)
            
        }
    }


} 



const getToppings = ( toppings ) =>({

    type: types.getToppings,
    payload: toppings

})


export const deleteToppingAtDb = (id) => {

    return async (dispatch) => {

      try {
            const resp = await fetchConToken(`toppings/${id}`,{} , 'DELETE')
            const body = await resp.json();

            if(body.ok){
                dispatch(deleteTopping(id))
                Swal.fire({
                    icon: 'success',
                    text: 'Topping eliminado! :)'
                })
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }


    }



}


export const deleteTopping = (id) => ({
    type: types.deleteTops,
    payload:{
        id
    } 
})