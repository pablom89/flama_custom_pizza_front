import React, { useEffect } from "react";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './styles/toppings.css';
import { useDispatch, useSelector } from "react-redux";
import { agregarTopping, deleteTopping } from "../actions/cliente/pizza";
import { toppingsStartLoading } from "../actions/usuario/createTop";
import Swal from "sweetalert2";




///////////// FRAMER MOTION CODE ///////////////

const titleVariants = {
  hidden: {
    y: -500
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60
    }
  }
}

const classicToppingsVariants = {
  hidden: {
    x: -800,
  },
  visible: {
    x: 0,
    transition: {
      delay: 1,
      duration: 1,
      type: "spring",
      stiffness: 50

    }
  }
}

const flamaToppingsVariants = {
  hidden: {
    x: 900
  },
  visible: {
    x: 0,
    transition: {
      delay: 1.5,
      duration: 1,
      type: "spring",
      stiffness: 50
    }
  }

}

const clientsToppingsVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5
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
      duration: 1,
      delay: 1.8,
      yoyo: Infinity
    }
  }
}

const TsemanaVariants = {
  hidden: {
    opacity: 0
  },
  visible:{
    opacity: 1,
    scale: 0.9,
    transition: {
      delay: 3,
      duration: 0.3,
      yoyo: 10
    }
  }

}



///////////////// END OF FRAMER MOTION CODE /////////////


const Toppings = () => {


  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(toppingsStartLoading())

  }, [dispatch])


  const { content } = useSelector(state => state.custom_ticket)

  const { toppings } = useSelector(state => state.toppings)

  const hayEstrella = toppings.some(t => t.type === 'estrella');

 

  const handleClick = (id, description, type) => {
    
    let existeYaElTopping = false;

    if (content.length > 0) {

      content.forEach((toppingSeleccionado) => {
        if (toppingSeleccionado.id === id) {
          existeYaElTopping = true;
        }
      })

    }

    if (existeYaElTopping) 
    return Swal.fire({
      icon: 'info',
      html: 'Ya agregaste este topping!'
    });

    if( content.length === 5){
      Swal.fire({
        icon:'info',
        html:
          ' ¡ Alcanzaste el maximo de toppings ! <br> ' + 'Presiona sobre el topping si deseas borrarlo y elegir otro :)'
      })
    }
    if (content.length < 5) {

      dispatch(agregarTopping(id, description, type))
    }

  }

  const handleDelete = (id) => {

    dispatch(deleteTopping(id))

  }

  

  return (
    <>


      <div className='container'>

        <div className='row mt-4'>
          <div className='col'>
            <Link to='/'
              className='backLink'
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
          </div>
        </div>

        <div className='row mb-3 mt-4'>
          <div className='col-lg-6 offset-lg-1'>
            <motion.h3
              className='title'
              variants={titleVariants}
              initial='hidden'
              animate='visible'
            >
              Elegí los toppings
                </motion.h3>
          </div>

        </div>

        <div className='row d-flex flex-column-reverse flex-md-row'>
          <div className='col-md-4'>
            <ul>
              {toppings.map(t => {

                if (t.type === 'classic') {
                  return (

                    <motion.li
                      key={t.id}
                      className='toppings'
                      variants={classicToppingsVariants}
                      initial='hidden'
                      animate='visible'
                      onClick={() => handleClick(t.id, t.description, t.type)}
                    >
                      {t.description}
                    </motion.li>
                  )
                }
              }
              )}
            </ul>
          </div>
          <div className='col-md-4'>
            <ul>
              {toppings.map(t => {

                if (t.type === 'flama') {

                  return (
                    <motion.li
                      key={t.id}
                      className='toppings'
                      variants={flamaToppingsVariants}
                      initial='hidden'
                      animate='visible'
                      onClick={() => handleClick(t.id, t.description, t.type)}
                    >
                      <FontAwesomeIcon className="star" icon={faStar} />
                      {t.description}
                    </motion.li>
                  )
                }
              }
              )}
            </ul>
          </div>
          <div className='col-md-4'>
            <div className='row'>

                { hayEstrella && 
                  <motion.h3 
                    className='topping_semana mt-2'
                    initial={{opacity: 0}}
                    animate={{ opacity: 1}}
                    transition={{ delay: 1.5,
                                  duration: 1
                    }}
                  > 
                     ¡  Proba el Topping de la semana !
                  </motion.h3> 
                }

              <div>
                
                {toppings.map(t => {

                  if (t.type === 'estrella') {
                    return (

                      <motion.li
                        key={t.id}
                        className='specialTop'
                        variants={TsemanaVariants}
                        initial='hidden'
                        animate='visible'
                        onClick={() => handleClick(t.id, t.description, t.type)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
                          <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                        </svg>
                        {t.description}
                      </motion.li>
                    )
                  }

                })}
              </div>

              <div className='col'>

                <motion.h3
                  className="result__titulo"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1.5
                    }
                  }}
                >
                  Tu Flama
                </motion.h3>

                <ul>
                  {content.length > 0 ? (
                    content.map((topping) => {


                      if (topping.type === 'flama') {

                        return (

                          <motion.li
                            variants={clientsToppingsVariants}
                            initial='hidden'
                            animate='visible'
                            className="item_lista"
                            key={topping.id}
                            onClick={() => handleDelete(topping.id)}
                          >
                            <FontAwesomeIcon className="star" icon={faStar} />
                            {topping.description}
                          </motion.li>

                        )
                      } else if (topping.type === 'classic') {
                        return (
                          <motion.li
                            variants={clientsToppingsVariants}
                            initial='hidden'
                            animate='visible'
                            className="item_lista"
                            key={topping.id}
                            onClick={() => handleDelete(topping.id)}
                          >

                            {topping.description}
                          </motion.li>
                        )

                      } else if (topping.type === 'estrella') {
                        return (

                          <motion.li
                            variants={clientsToppingsVariants}
                            initial='hidden'
                            animate='visible'
                            className="item_lista"
                            key={topping.id}
                            onClick={() => handleDelete(topping.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
                              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                            </svg>
                            {topping.description}
                          </motion.li>
                        )
                      }

                    })
                  ) : (
                      <motion.p variants={pVariants}
                        initial='hidden'
                        animate='visible'
                        className='blinking'
                      >
                        Todavía no agregaste ningún topping
                      </motion.p>
                    )}
                </ul>
              </div>
            </div>
            <div className='row mt-4'>

              <div className='col d-flex justify-content-center'>
                {content.length > 0 ?
                  <Link to='/extra'
                    className="result__btn"
                  >
                    Siguiente
                  </Link>
                  :
                  null
                }
              </div>


            </div>


          </div>

        </div>




      </div>



    </>
  );
};





export default Toppings;
