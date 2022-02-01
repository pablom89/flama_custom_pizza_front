import React from 'react';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './styles/FormLogin.css';
import styled from 'styled-components'
import { useForm } from '../hooks/useForm';
import { startLogin } from '../actions/usuario/login';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom"
import { motion } from 'framer-motion';


const FormLogin = () => {

    const dispatch = useDispatch();

    const history = useHistory()
   
    console.log('render')

    const [loginValues, handleInputChange] = useForm({
        usuario: '',
        password: ''
    })

    const { usuario, password } = loginValues;

    const handleLoginSubmit = (e) => {
        e.preventDefault();

      /*  if( usuario.length === 0 ){
            
        } */ 

        dispatch(startLogin(usuario, password, () => { history.push('/crear') } ))
        


    }



    return (

        <div className='container'>
            <div className='row mt-5 d-flex justify-content-center'>
                <div className='col-sm-5 col-md-4'>

                    <motion.form 
                        className='login__form d-flex flex-column' 
                        onSubmit={(e) => handleLoginSubmit(e)}
                        initial={{ opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5, duration: 2}}
                    >

                        <div className='login__form-icon mt-3 mb-4 d-flex justify-content-center align-self-center'>

                            <svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>

                        </div>

                        <div className='d-flex justify-content-center mb-3'>
                            <h3 className='login__form-title'>Iniciar Sesion</h3>
                        </div>
                        
                        <div className='d-flex justify-content-center mb-3'>
                            {/* <label for='user'>Usuario: </label> */}

                            <CustomInput
                                type='text'
                                id='user'
                                name='usuario'
                                value={usuario}
                                onChange={handleInputChange}
                                required
                                placeholder='Username'

                            />
                        </div>

                        <div className='d-flex justify-content-center mb-3'>
                            {/* <label for='password'>Contraseña: </label> */}
                            <CustomInput
                                type='password'
                                id='password'
                                name='password'
                                value={password}
                                onChange={handleInputChange}
                                placeholder='Password'
                                required
                            />
                        </div>

                        <button type='submit' className='login__form-btn'>
                            Login
                        </button>
                    </motion.form>



                </div>



            </div>



        </div>



    );
}

const CustomInput = styled.input`


border: 1px dashed red;
background-color: transparent;
border-radius: 9px;
margin-left: 12px;
color: white;
letter-spacing: 2px;
line-height: 3px;
padding: 4px;
text-align: center;
width: 60%;

:focus{
    outline: none;
}

`

export default FormLogin;