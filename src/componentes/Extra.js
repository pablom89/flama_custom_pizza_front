import React from 'react';
import { motion } from 'framer-motion'
import './styles/Extra.css'
import Formulario from './Formulario'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'


////////// FRAMER MOTION /////////////

const containerExtraVariants = {
    hidden: {
        y: -700
    },
    visible: {
        y: 0,
        transition: {
            type: 'spring',
            stifness: 50
        }
    }

}


/////////// FRAMER MOTION //////////

const Extra = () => {



    return (
        <>

            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-12'>
                        <Link to='/setUp' className='backLink'>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Link>

                    </div>
                    <div className='col-12'>
                        <motion.div
                            className='container-extra'
                            variants={containerExtraVariants}
                            initial='hidden'
                            animate='visible'
                        >

                            <h2 className='container-extra__title'>Ya casi estamos!!</h2>
                        </motion.div>

                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-8 col-md-6'>

                        <motion.div
                            initial={{
                                x: -1200
                            }}
                            animate={{
                                x: 0
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 70,
                                delay: 1.5
                            }}
                            className='pizza-cliente'>
                                <p className='pizza-cliente__p'>
                                    Si queres un extra de topping , presionalo, si no, dale a confirmar
                                </p>


                            <Formulario />

                            
                        </motion.div>

                    </div>

                </div>


            </div>


            
        </>
    );
}

export default Extra;