
import AppRouter from './router/AppRouter';
import { store } from '../src/store/store';
import { Provider } from 'react-redux';




const FlamaApp = () => {  



  return ( 
    <>

      <Provider store={ store }>

          


        <AppRouter />
      
      </Provider>
       
      
    </>

   );
}
 
export default FlamaApp;