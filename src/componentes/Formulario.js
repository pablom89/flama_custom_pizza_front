import React, { useState } from 'react';
import './styles/Formulario.css'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux';
import { guardarPedidoEnDb, cleanComanda } from '../actions/cliente/pizza';



const btnVariant = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            yoyo: Infinity
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



const Formulario = () => {

    
    const { content } = useSelector( state => state.custom_ticket )
    const dispatch = useDispatch();
   

   
    const [ nombre , cambiarNombre ] = useState('')


    const handleInputChange = (e) =>{
        cambiarNombre(e.target.value)
        
    }

  
    const clearSelection = (name) => {
        let radioBtns = document.getElementsByName(name);
        radioBtns.forEach((radioBtn) => {
            if (radioBtn.checked === true) {
                radioBtn.checked = false;
               /*  cambiarTotal(total - 40) */
            }
        })

    }

  
    const handleSubmit = async ( e, nombre ) =>{
        e.preventDefault()
 
        let toppings = document.querySelectorAll( 'input[name=topping]');
        let toppingSeleccinado='no lleva';

        toppings.forEach((topping) =>{
            if(topping.checked === true){
                toppingSeleccinado = topping.value;
            }
        })
        
        dispatch( guardarPedidoEnDb(nombre, toppingSeleccinado) )
        

        dispatch( cleanComanda() )
    }


    return (
        <>
            <div className='row'>
                <div className='col'>
                    <form className='pizza-cliente__form' onSubmit={ (e) =>  handleSubmit( e, nombre ) } >
                        {content.map((topping) => {
                            return (
                                <>
                                    <input type='radio'
                                        name='topping'
                                        id={topping.id}
                                        key={topping.id}
                                        value={ topping.description }
                                        /* onClick={() => modificarTotal()} */

                                    />
                                    <label
                                        className='pizza-cliente__label'
                                        htmlFor={topping.id}
                                    >
                                       <p className='pizza-cliente_p'>{topping.description}</p> 
                                    </label>
                                </>
                            )


                        })}

                        <motion.button type='button'
                            onClick={() => clearSelection('topping')}
                            variants={btnVariant}
                            initial='hidden'
                            animate='visible'
                            className='pizza-cliente__boton'
                        >
                            No Extras please
                         </motion.button>

                       
                        


                         <div className='datos-cliente'>

                            <div className='datos-cliente__sub'> 
                                <Subtitulo> Esta pizza es para: </Subtitulo>
                            </div> <br />
                            <Input 
                                type='text' 
                                className='datos-cliente__input' 
                                maxLength='25'
                                value={ nombre }
                                onChange={(e) => handleInputChange(e)} 
                            /> 
                            <br />
                        </div> 
                        
                        <motion.button
                                className='pizza-cliente__btn'
                                variants={buttonVariants}
                                whileHover='hover'
                                type= 'submit'

                            >
                                Confirmar
                             </motion.button>

                    </form>
                </div>
            </div>


        
        </>
    );
}


const Input = styled.input`

    border: none;
    border-bottom: 1px solid red;
    width: 100%;
    background-color: transparent;
    color:white;
    font-size: 35px;
    letter-spacing: 2px;
    line-height: 45px;
    text-align: center;
 

    :focus{
        outline: none;
        
    }

`
const Subtitulo = styled.h2`

    text-align: center;
    color: white;
`

export default Formulario;