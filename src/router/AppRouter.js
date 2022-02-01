import React from 'react';
import Header from '../componentes/Header'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import CrearToppingsYPizza from '../componentes/CrearToppingsYPizza';
import Home from '../componentes/Home';
import Toppings from '../componentes/Toppings';
import Armadas from '../componentes/Armadas';
import Extra from '../componentes/Extra';
import FormLogin from '../componentes/FormLogin';
import { useSelector } from 'react-redux';
import { PrivateRoute } from '../privateRoute/PrivateRoute';


const AppRouter = () => {

    const { uid } = useSelector(state => state.auth)
    
    

    return ( 

      <div>
       
        <Router>

         
            <Header/>
                    <Switch>

                        <PrivateRoute
                        exact
                        path='/crear' 
                        component={CrearToppingsYPizza}
                        isAuthenticated={ !!uid }
                        />
                        <Route path='/' exact={true} component={Home} />
                        <Route path='/login' component={FormLogin}/>
                    
                        <Route path='/setUp' component={Toppings}/>
                        <Route path='/armadas' component={Armadas}/>
                        <Route path='/Extra' component={Extra}/>
                        
                        <Redirect to='/'/>
                        

                    </Switch>
              
        </Router>  

      </div>  

    



     );
}
 
export default AppRouter;