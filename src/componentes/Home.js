import React from 'react';
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'

import './styles/Home.css';



////////////////// FRAMER MOTION CODE ////////////////

const subContainerVariants = {
    hidden: {
        y: -400
    },

    visible: {
        y: 0,
        transition: {
            duration: 0.7,
            type: 'spring',
            stiffness: 100
        }
    }
}

const buttonVariants = {
    hover: {
        scale: 1.1,
        boxShadow: '0px 0px 20px red',
        transition: {
            duration: 0.3
        }

    }
}

////////////////// END OF FRAMER MOTION CODE //////////////

const Home = () => {

    
    return ( 

        <div className='container' style={{marginTop: '150px'}}>
             
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <motion.div 
                        className='sub-container'
                        variants={subContainerVariants}
                        initial='hidden'
                        animate='visible'
                    >
                        <h2 className='sub-container_title'> ¡Bienvenido a flama!</h2>
                        <motion.button 
                        variants={buttonVariants}
                        whileHover='hover'
                        >
                        <Link to='setUp'> 
                                Armá tu Flamita
                        </Link> 
                        </motion.button>
                        <motion.button 
                            variants={buttonVariants}
                            whileHover='hover' 
                        >
                        <Link to='/armadas'> 
                                Pizzas Flama
                        </Link> 
                        </motion.button>
                    </motion.div>
                </div>
                   
            </div>    
                    
                

        </div>

     );
}
 
export default Home;