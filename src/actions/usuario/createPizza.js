import { types } from '../../types/types';
import { fetchConToken, fetchSinToken } from '../../helpers/fetchSinToken';
import Swal from 'sweetalert2';




const createPizza = (nombre, content, precio, cantidad, id) => ({
    type: types.createPizza,
    payload: {
        nombre,
        content,
        precio,
        cantidad,
        id
    }
})




export const createPizzaAtDb = ( nombre, content, precio, cantidad) => {

    if( nombre.length === 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La pizza debe tener un nombre!'
          })
    }

    if(precio === 0){
    
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La pizza debe tener un precio mayor a 0 !'
          })
        
    }

    return async(dispatch) =>{

        try {

            const resp = await fetchConToken('pizzas', { nombre, content, precio, cantidad }, 'POST')
            const body = await resp.json();
            console.log( body )
            

            const { pizzaGuardada } = body;

            if(body.ok){

             dispatch(createPizza(pizzaGuardada.nombre, pizzaGuardada.content, pizzaGuardada.precio, pizzaGuardada.cantidad, pizzaGuardada.id))
            }else{
                Swal.fire({
                    icon: 'info',
                    html: '<p> Ocurrió un error al crear la pizza, asegúrate de poner un precio y al menos 2 toppings</p> '
                })
            }
    
            
        } catch (error) {
            console.log(error)
        }

    }


}


 const getPizzasFlama = (pizzas) => ({
    type: types.getPizzas,
    payload: pizzas
}) 


export const pizzaStartLoading = () =>{

    return async (dispatch) =>{

        try {

            const resp = await fetchSinToken('pizzas');
            const body = await resp.json();

            if(body.ok){

                dispatch( getPizzasFlama(body.pizzas) )
            }
        } catch (error) {
            console.log(error)
            
        }
    }


} 


export const deletePizzaAtDb = (id) => {

    return async (dispatch) => {

      try {
            const resp = await fetchConToken(`pizzas/${id}`,{} , 'DELETE')
            const body = await resp.json();

            if(body.ok){
                dispatch(deletePizza(id))
                Swal.fire({
                    icon: 'success',
                    text: 'Pizza eliminada! :)'
                })
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }
    }

}

const deletePizza = (id) => ({
    type: types.deletePizzaF,
    payload:{
        id
    }
})