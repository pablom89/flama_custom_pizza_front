import { types } from '../../types/types';

export const addPizza = (nombre, id, cantidad, precio) => ({
    type: types.addPizza,
    payload:{
        nombre,
        id,
        cantidad,
        precio
        
    }

})

export const deletePizza = (id) => ({
    type: types.deletePizza,
    payload: {
        id
    }
})

export const addCantidad = (id) => ({
    type: types.addCantidad,
    payload:{
        id
    }
})

export const restarCantidad = (id) => ({
    type: types.restarQty,
    payload: { 
        id
    }
})


export const pruebaFinalizarTicket = (nombre, celular,selectedRadio, direccion, selectedPiso, selectedValue, obs, precioTotal) =>{
    
    return ( dispatch, getState ) =>{

        dispatch( finishTicket(nombre, celular,selectedRadio, direccion, selectedPiso, selectedValue, obs, precioTotal) )

        const { ticket_clasico } = getState()

        const { pedido , datos, fecha } = ticket_clasico;

        let comanda ='';

        pedido.forEach((p, i)=>{
            comanda+='<tr>';
            if(i===0){
                comanda += "<td>Pizza:</td>";
            }else{
                 comanda +="<td></td>";
             }

             comanda += ` <td> ( ${p.cantidad }) - ${ p.nombre } </td>`
             comanda+='</tr>';
        });
           
           comanda = `<tr><td>Cliente:</td><td> *** ${ datos.nombre } **** </td></tr> ${ comanda }`
           comanda += `<tr><td>Celular:</td><td> ${ datos.celular } </td></tr>`;
           comanda += `<tr><td>Entrega:</td><td> ${ datos.entrega } </td></tr>`;
           comanda += `<tr><td>Direccion:</td><td> ${ datos.direccion } </td></tr>`
           comanda += `<tr><td>Piso:</td><td> ${ datos.piso } </td></tr>`
           comanda += `<tr><td>Depto:</td><td> ${ datos.depto } </td></tr> `
           comanda += `<tr><td>Observaciones:</td><td> *** ${ datos.obs } *** </td></tr> `
           comanda += `<tr><td>Precio Total:</td><td> $ ${ datos.total } </td></tr>`
           comanda += `<tr><td>Fecha:</td><td> ${ fecha } </td></tr>`
           comanda = `<table> ${ comanda } </table>`

           const contenidoOriginal = document.body.innerHTML;
           
           document.body.innerHTML = comanda;

            window.print()

            document.body.innerHTML = contenidoOriginal;
	
            window.location.href = "/"


    }
}


const finishTicket = (nombre, celular,selectedRadio, direccion, selectedPiso, selectedValue, obs, precioTotal) => ({
    type: types.finishTicket,
    payload: {
        nombre: nombre,
        celular: celular,
        entrega: selectedRadio,
        direccion,
        piso: selectedPiso,
        depto: selectedValue,
        obs,
        total: precioTotal
    }

})


