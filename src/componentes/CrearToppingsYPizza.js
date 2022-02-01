import React, { useState, useEffect } from 'react';
import './styles/crearToppings.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { createTopAtDb, deleteToppingAtDb, toppingsStartLoading } from '../actions/usuario/createTop'
import { useForm } from '../hooks/useForm';
import { createPizzaAtDb, pizzaStartLoading, deletePizzaAtDb } from '../actions/usuario/createPizza';
import { useDispatch, useSelector } from 'react-redux';






const CrearToppingsYPizza = () => {

    const dispatch = useDispatch();
    const { toppings } = useSelector(state => state.toppings)
    const { pizzas } = useSelector(state => state.pizzas)

    useEffect(() => {

        dispatch(toppingsStartLoading())

    }, [dispatch])

    console.log('componente renderizado')

    useEffect(() => {

        dispatch(pizzaStartLoading())

    }, [dispatch])



    const [toppingValue, changeToppingValue] = useState('')

    const [formValues, handleInputChange, reset] = useForm({
        nombre: '',
        topping1: '',
        topping2: '',
        topping3: '',
        topping4: '',
        topping5: '',
        topping6: '',
        precio: '',
        cantidad: 1
    })

    const { nombre, topping1, topping2, topping3, topping4, topping5, topping6, precio, cantidad } = formValues;

    const content = [topping1, topping2, topping3, topping4, topping5, topping6]

    // Funcion que crea toppings

    const handleToppingSubmit = (e) => {
        e.preventDefault()

        let selectedRadio = document.querySelector('input[type="radio"]:checked').value;
        
        dispatch(createTopAtDb(toppingValue, selectedRadio))
        changeToppingValue('')

    }


    // Funcion que crea pizzas

    const handlePizzaSubmit = (e) => {
        e.preventDefault();
        dispatch(createPizzaAtDb(nombre, content, precio, cantidad))
        reset()
    }



    // Funcion que borra toppings 

    const handleToppingDelete = (id) => {
        dispatch(deleteToppingAtDb(id))
    }

    // Funcion que borra pizzas

    const handlePizzaDelete = (id) => {
        dispatch(deletePizzaAtDb(id))
    }



    return (

        <div className='container mt-3'>
            <div className='row'>


                <div className='col-12 col-lg-5'>

                    {/* FORMULARIO PARA CREAR TOPPINGS */}

                    <form className='new__toppings' onSubmit={(e) => handleToppingSubmit(e)}>
                        <fieldset className='new__toppings-field'>
                            <legend className='new__toppings-legend'>Crear nuevo Topping </legend>

                            <label htmlFor='topping'>Nombre: </label>
                            <CustomInput
                                name='descripcion'
                                id='topping'
                                type='text'
                                placeholder='Ej: Tomate cherry'
                                autoComplete='off'
                                value={toppingValue}
                                onChange={(e) => changeToppingValue(e.target.value)}
                                required
                                pattern='[a-zA-z] {3-15}'
                            />
                            <br />

                            <p className='new__toppings-p'>Que tipo de topping vas a crear ?</p>

                            <label htmlFor='classic' className='radio'>

                                <input type='radio' name='esFlama' value='classic' id='classic' className='radio__input' defaultChecked />
                                <div className='radio__circle'></div>
                                Classic
                            </label>

                            <br />

                            <label htmlFor='flama' className='radio'>

                                <input type='radio' name='esFlama' value='flama' id='flama' className='radio__input' />
                                <div className='radio__circle'></div>
                                Flama
                            </label>

                            <br />

                            <label htmlFor='estrella' className='radio'>

                                <input type='radio' name='esFlama' value='estrella' id='estrella' className='radio__input' />
                                <div className='radio__circle'></div>
                                Estrella
                            </label>

                            <br />


                            <button type='submit' className='new__toppings-submit'>
                                Crear
                            </button>
                        </fieldset>
                    </form>
                </div>
                <div className='col-12 col-lg-7'>
                    <fieldset className='tops__fieldset'>
                        <legend className='tops__legend'>Toppings</legend>

                        <ul className='d-flex flex-column flex-sm-row flex-wrap p-3 tops__ul'>
                            {toppings.map(t => {
                                

                                if (t.type === 'flama') {
                                    return (

                                        <li key={t.id}
                                            className='smallTops mx-1'
                                            onClick={() => handleToppingDelete(t.id)}
                                        >
                                            <FontAwesomeIcon className="star" icon={faStar} />
                                            {t.description}
                                        </li>
                                    )
                                }
 
                                if (t.type === 'classic') {
                                    return (

                                        <li key={t.id}
                                            className='smallTops mx-1'
                                            onClick={() => handleToppingDelete(t.id)}
                                        >
                                            {t.description}
                                        </li>

                                    )
                                }

                                if (t.type === 'estrella') {
                                    return (

                                        <li key={t.id}
                                            className='starTop mx-1 d-flex justify-content-center align-items-center'
                                            onClick={() => handleToppingDelete(t.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
                                                <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                                            </svg>
                                            {t.description}
                                        </li>

                                    )
                                }
                               

                            })}
                        </ul>

                    </fieldset>
                </div>

            </div>
            <br />
            <hr />
            <div className='row'>
                <div className='col-12 col-lg-5'>

                    <form className='new__pizza' onSubmit={(e) => handlePizzaSubmit(e)}>
                        <fieldset className='new__pizza-field'>
                            <legend className='new__pizza-legend'>Crear nueva Pizza</legend>

                            <div>
                                <label htmlFor='pizza'>Nombre: </label>
                                <CustomInput
                                    type='text'
                                    id='pizza'
                                    autoComplete='off'
                                    name='nombre'
                                    value={nombre}
                                    onChange={handleInputChange}
                                    placeholder='Ej: Cuatro quesos'
                                    pattern='[a-zA-Z]{4-15}'
                                    title='El campo solo debe contener letras y tener entre 4 a 15 caracteres'
                                    required
                                />
                            </div>
                            
                        

                            <div className='new__pizza-field-tops'>
                                <label htmlFor='topping1'>Topping #1:</label>
                                <CustomInput
                                    type='text'
                                    id='topping1'
                                    name='topping1'
                                    autocomplete='off'
                                    value={topping1}
                                    onChange={handleInputChange}
                                    pattern='[a-zA-Z]{4-15}'
                                    title='El campo solo debe contener letras y tener entre 4 a 15 caracteres'
                                    required
                                />
                            </div>

                            <div className='new__pizza-field-tops'>
                                <label htmlFor='topping2'>Topping #2:</label>
                                <CustomInput
                                    type='text'
                                    id='topping2'
                                    name='topping2'
                                    autocomplete='off'
                                    value={topping2}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className='new__pizza-field-tops'>
                                <label htmlFor='topping3'>Topping #3:</label>
                                <CustomInput
                                    type='text'
                                    id='topping3'
                                    name='topping3'
                                    autocomplete='off'
                                    value={topping3}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='new__pizza-field-tops'>
                                <label htmlFor='topping4'>Topping #4:</label>
                                <CustomInput
                                    type='text'
                                    id='topping4'
                                    name='topping4'
                                    autocomplete='off'
                                    value={topping4}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='new__pizza-field-tops'>
                                <label htmlFor='topping5'>Topping #5:</label>
                                <CustomInput
                                    type='text'
                                    id='topping5'
                                    name='topping5'
                                    autocomplete='off'
                                    value={topping5}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='new__pizza-field-tops'>
                                <label htmlFor='topping5'>Topping #6:</label>
                                <CustomInput
                                    type='text'
                                    id='topping6'
                                    name='topping6'
                                    autocomplete='off'
                                    value={topping6}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='new__pizza-field-tops'>
                                <label htmlFor='cantidad'>Cantidad :</label>
                                <QtyInput
                                    type='number'
                                    id='cantidad'
                                    name='cantidad'
                                    autocomplete='off'
                                    value={cantidad}
                                    readOnly
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor='precio'>Precio: $</label>
                                <PriceBox
                                    type='tel'
                                    id='precio'
                                    name='precio'
                                    value={precio}
                                    onChange={handleInputChange}
                                    placeholder='Ej: 500'
                                />
                            </div>

                            <button type='submit' className='new__pizza-submit'>
                                Crear
                            </button>

                        </fieldset>


                    </form>

                </div>
                <div className='col-12 col-lg-7'>
                    <fieldset>
                        <legend className='pizza__legend'>Pizzas</legend>

                        {pizzas.map((p) => {
                            return (

                                <div
                                    key={p.id}
                                    className='pizzas'
                                    onClick={() => handlePizzaDelete(p.id)}
                                >
                                    <h3><i>{p.nombre}</i></h3>

                                    <p className='pizzas_content'>{p.content.join(' , ')}</p>
                                    <p style={{ textAlign: 'right' }}>Precio: $ {p.precio}</p>
                                </div>

                            )
                        })}

                    </fieldset>


                </div>
            </div>

        </div>

    );
}



const CustomInput = styled.input`


border: 1px dashed red;
background-color: transparent;
border-radius: 9px;
margin: 0 5px;
color: white;
letter-spacing: 2px;
line-height: 3px;
padding: 4px;
text-align: left;

:focus{
    outline: none;
}

`

const PriceBox = styled.input`

width: 80px;
border: 1px dashed red;
background-color: transparent;
border-radius: 9px;
margin: 0 5px;
color: white;
letter-spacing: 2px;
line-height: 3px;
padding: 4px;
text-align: center;

:focus{
    outline: none;
}

`

const QtyInput = styled.input`
width: 80px;
border: 1px dashed red;
background-color: transparent;
border-radius: 9px;
margin: 0 5px;
color: white;
letter-spacing: 2px;
line-height: 3px;
padding: 4px;
text-align: center;

:focus{
    outline: none;
}
`

export default CrearToppingsYPizza;