import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { pizzaReducer } from '../reducers/pizzaReducer';
import { toppingsReducer } from '../reducers/toppingsReducer';
import { pizzaFlamaReducer } from '../reducers/pizzaFlamaReducer';
import { authReducer } from '../reducers/authReducer';
import { comandaReducer } from '../reducers/comandaReducer';

import thunk from 'redux-thunk';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    custom_ticket: pizzaReducer,
    toppings: toppingsReducer,
    pizzas: pizzaFlamaReducer,
    ticket_clasico: comandaReducer

  
   


})


export const store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
     );