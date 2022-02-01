import React, { useEffect, useState } from 'react';
import './styles/Armadas.css';
import cajitaPizza from '../img/armada.png'
import { motion } from 'framer-motion';
import pizzaIcon from '../img/pizzaIcon.png'
import { useForm } from '../hooks/useForm';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { pizzaStartLoading } from '../actions/usuario/createPizza';
import { useDispatch, useSelector } from 'react-redux';
import { addPizza, deletePizza, addCantidad, pruebaFinalizarTicket, restarCantidad } from '../actions/cliente/pizzaClasica';
import styled from 'styled-components'
import Swal from 'sweetalert2';

const pizzasFlamaVariants = {
    hidden: {
        x: 1500
    },
    visible: {
        x: 0,
        transition: {
            delay: 1,
            duration: 1,
            type: 'spring',
            stiffness: 50,
            damping: 15
        }
    }
}

const pVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 1.5,
            duration: 1,
            yoyo: Infinity
        }
    }
}

const pizzaVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 1
        }
    }
}

const Armadas = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(pizzaStartLoading())

    }, [dispatch])


    const { pizzas } = useSelector(state => state.pizzas)
    const { pedido } = useSelector(state => state.ticket_clasico)

    const [mostrarForm, cambiarMostrarForm] = useState(false)

    const [formValues, handleInputChange] = useForm({
        nombre: '',
        celular: '',
        piso: '',
        direccion: '',
        obs: ''
    })

    const { nombre, celular, piso, direccion, obs } = formValues;

    const handleClick = (nombre, id, cantidad, precio) => {

        let existeYaLaPizza = false;

        if (pedido.length > 0) {

            pedido.forEach((p) => {
                if (id === p.id) {

                    existeYaLaPizza = true;
                }
            })
        }

        if (existeYaLaPizza)
        return Swal.fire({
            icon: 'info',
            html: 'Ya agregaste esta Pizza :) !'
          });

        dispatch(addPizza(nombre, id, cantidad, precio))
    }

    const handleDelete = (id) => {
        dispatch(deletePizza(id))
    }

    const handleAdd = (id) => {
        dispatch(addCantidad(id))
    }

    const handleSubstraction = ( id ) => {
        dispatch(restarCantidad(id))
    }


    const precioTotal = pedido.reduce((total, pizza) => {
        return total += pizza.precio * pizza.cantidad 
    }, 0)




    const handleFormSubmit = (e) => {
        e.preventDefault()

        const selectedRadio = document.querySelector('input[type="radio"]:checked').value;
        let selectedPiso = '';
        let piso = document.querySelector('input[type="number"]')
        if (piso) {
            selectedPiso = piso.value;
        }
        let selectedValue = '';
        let depto = document.querySelector('#depto_cliente')
        if (depto) {
            selectedValue = depto.value;
        }

        dispatch(pruebaFinalizarTicket(nombre, celular, selectedRadio, direccion, selectedPiso, selectedValue, obs, precioTotal))

    }

    const mostrarCampos = () => {

        const deliveryRadio = document.querySelector('#delivery');
        const retiraRadio = document.querySelector('#retira')

        if (deliveryRadio.checked) {
            cambiarMostrarForm(true)
        }

        if (retiraRadio.checked) {
            cambiarMostrarForm(false)
        }
    }


    return (

        <div className='container'>
            <div className='row mt-4'>
                <div className='col'>
                    <Link to='/' className='backLink'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                </div>
            </div>

            <div className='row mt-3 d-flex flex-column-reverse flex-md-row'>
                <div className='col-lg-7'>

                   

                    {pizzas.map((p) => {
                        return (

                            <motion.div
                                className='pizzasFlama'
                                key={p.id}
                                variants={pizzasFlamaVariants}
                                initial='hidden'
                                animate='visible'
                                onClick={() => handleClick(p.nombre, p.id, p.cantidad, p.precio)}

                            >

                                <div className='pizzasFlama__encabezado'>
                                    <img className='pizzaLogo'
                                        src={cajitaPizza}
                                        alt='cajita-piza'
                                    />
                                    <h3> {p.nombre}<span>..................${p.precio}</span></h3>
                                </div>

                                <p className='pizzasFlama__p'>{p.content.join(' , ')}</p>

                            </motion.div>
                        )
                    })}
                </div>
                <div className='col-lg-5'>

                    <motion.h2
                        className='carrito__title'
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 1,
                                delay: 1.5
                            }
                        }}
                    >
                        Tu compra
                    </motion.h2>

                    {pedido.length > 0 ?

                        pedido.map((pizza) => {

                            return (

                                <motion.div
                                    key={pizza.id}
                                    variants={pizzaVariants}
                                    initial='hidden'
                                    animate='visible'
                                    className='carrito__pizza'
                                /* onClick={ ()=> handleDelete(pizza.id)} */
                                >
                                    <h1 className='carrito__pizza-title'>
                                        <img src={pizzaIcon} alt='i-con' id='iconoP' />
                                        {pizza.nombre}
                                    </h1>

                                    <p className='carrito__pizza-p'>
                                        Cantidad: {pizza.cantidad} x ${pizza.precio}

                                        <StyledBtn onClick={() => handleAdd(pizza.id, pizza.cantidad)}>
                                            +
                                         </StyledBtn>

                                        <StyledBtnMenos onClick={ () => handleSubstraction( pizza.id, pizza.cantidad) }> 
                                            -
                                        </StyledBtnMenos>

                                        <StyledBtnDel onClick={() => handleDelete(pizza.id)}>
                                            x
                                         </StyledBtnDel>


                                    </p>



                                </motion.div>

                            )
                        })

                        :
                        <motion.p
                            className='carrito__p'
                            variants={pVariants}
                            initial='hidden'
                            animate='visible'
                        >
                            Aún no has agregado pizzas al carrito

                        </motion.p>


                    }

                    {pedido.length > 0 ?
                        <motion.div className='totalBox'
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 1,
                                    delay: 0.5
                                }
                            }}
                        >


                            <form className='extra__data' onSubmit={(e) => handleFormSubmit(e)}>
                                <fieldset className='extra__data-field'>
                                    <legend className='extra__data-legend'> Info</legend>
                                    <label htmlFor='nombre_cliente' className='extra__data-label' >Nombre: </label> <br />

                                    <input
                                        type='text'
                                        name='nombre'
                                        id='nombre_cliente'
                                        placeholder='Juan Carlos'
                                        className='extra__data-input'
                                        value={nombre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <br />

                                    <label htmlFor='cel_cliente' className='extra__data-label' >Cel: </label> <br />

                                    <input
                                        type='tel'
                                        name='celular'
                                        id='cel_cliente'
                                        placeholder='Ingresa tu numero sin el 0 y sin el 15 - 3517888999'
                                        className='extra__data-input'
                                        value={celular}
                                        onChange={handleInputChange}
                                        pattern='[0-9]{10}'
                                        required
                                    />

                                    <br />


                                    <label htmlFor='retira' className='radio'>

                                        <input
                                            type='radio'
                                            name='stayOrToGo'
                                            id='retira'
                                            value='retira'
                                            className='radio__input'
                                            defaultChecked
                                            onClick={mostrarCampos}
                                        />

                                        <div className='radio__circle'></div>
                                        Retira

                                    </label>


                                    <label htmlFor='delivery' className='radio'>


                                        <input
                                            type='radio'
                                            name='stayOrToGo'
                                            id='delivery'
                                            value='delivery'
                                            className='radio__input'
                                            onClick={mostrarCampos}

                                        />
                                        <div className='radio__circle'></div>
                                        Delivery
                                    </label>

                                    <br />
                                    {/* ----------------------- ESTO DEBE MOSTRARSE DE MANERA CONDICIONAL ---------------------*/}

                                    {mostrarForm &&
                                        <>
                                            <label htmlFor='address_cliente' className='extra__data-label' >Direccion: </label> <br />

                                            <input
                                                type='tel'
                                                name='direccion'
                                                id='address_cliente'
                                                placeholder='Calle y Nro'
                                                className='extra__data-input'
                                                value={direccion}
                                                onChange={handleInputChange}
                                            />

                                            <br />

                                            <label htmlFor='piso_cliente' className='extra__data-label' >Piso: </label>

                                            <input
                                                type='number'
                                                name='piso'
                                                id='piso_cliente'
                                                min='0'
                                                max='12'
                                                className='extra__data-input-number'
                                                value={piso}
                                                onChange={handleInputChange}
                                            />

                                            <label htmlFor="depto_cliente">Depto:</label>

                                            <select id="depto_cliente" name="depto_cliente">
                                                <option value="" defaultValue></option>
                                                <option value="a">a</option>
                                                <option value="b">b</option>
                                                <option value="c">c</option>
                                                <option value="d">d</option>
                                                <option value="e">e</option>
                                                <option value="f">f</option>
                                                <option value="g">g</option>
                                            </select>

                                            <br />

                                            <small className='extra__data-small'>*Piso 0 = Planta baja</small>
                                        </>

                                    }



                                    {/* --------------------------------------------------------------------------*/}

                                    <textarea
                                        className='extra__data-textarea'
                                        placeholder='Observaciones..'
                                        value={obs}
                                        name='obs'
                                        onChange={handleInputChange}
                                    >
                                    </textarea>

                                    <br />


                                </fieldset>

                                <p className='extra__data-p' >Total : $ {precioTotal} </p>

                                <button type='submit' className='extra__data-btn'>Confirmar</button>

                            </form>



                        </motion.div>
                        :
                        <br />
                    }


                </div>

            </div>
        </div>

    );
}


const StyledBtn = styled.button`


width: 35px;
height: 35px;
background: #128C7E;
border-radius: 9px;
color: white;
font-size: 15px;
display: inline;
margin: 7px;
text-align: center;
cursor: pointer;
border: none;

`

const StyledBtnDel = styled.button`

width: 35px;
height: 35px;
background: #d9534f;
border-radius: 9px;
color: white;
font-size: 15px;
display: inline;
margin: 7px;
text-align: center;
cursor: pointer;
border: none;

`
const StyledBtnMenos = styled.button`

width: 35px;
height: 35px;
border-radius: 9px;
color: white;
font-size: 15px;
display: inline;
margin: 7px;
text-align: center;
cursor: pointer;
border: none;
background: #fae22a;

`


export default Armadas;