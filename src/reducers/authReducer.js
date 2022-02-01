import { types } from '../types/types';


const initialState = {
    checking: true,
    uid: null,
   /* user: null */
}


export const authReducer = ( state = initialState , action ) =>{
    
    switch( action.type ) {
        case types.authLogin:
            return{
                ...state,
                checking: false,
                uid: action.payload.uid,
                user: action.payload.user
            }
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        default:
            return state;
    }

}