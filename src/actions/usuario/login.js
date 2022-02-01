
import { types } from '../../types/types';
import { fetchSinToken, fetchConToken } from '../../helpers/fetchSinToken';
import Swal from 'sweetalert2'




export const startLogin = ( name, password, callback ) =>{

    

    return async (dispatch) =>{
        
        try {

            if( name.length === 0 || password.length < 6){
               return Swal.fire(' ¡ Oops', 'La contraseña debe tener mas de 6 caracteres', 'error' )
            }

            const resp = await fetchSinToken('auth/login', { name, password } , 'POST' )
            const body = await resp.json();
          

            if( body.ok ){
                localStorage.setItem('token', body.token )
                localStorage.setItem('token-init', new Date().getTime())

                dispatch( login(body.name, body.uid))
                callback()

            }else{
                Swal.fire( '¡ Oops !', body.msg, 'error')
            } 

        } catch (error) {
            console.log(error)
            
        }
    }
}


export const starCheckingToken = () => {
    return async (dispatch) => {

     try {
         
         const resp = await fetchConToken('auth/renew');
         const body = await resp.json();
         console.log(body)
 
         if( body.ok ){
             localStorage.setItem('token', body.token )
             localStorage.setItem('token-init', new Date().getTime())
 
         dispatch(startLogin(body.name, body.uid))
         } else {
             Swal.fire('Error', body.msg, 'error')
             dispatch( checkingFinish() );
         }
     } catch (error) {
         console.log(error)
     }   
    }


}

const checkingFinish = () => ({ type: types.authCheckingFinish});

const login = (user, uid) => ({

    type: types.authLogin,
    payload:{
        user,
        uid
    }

})
 
