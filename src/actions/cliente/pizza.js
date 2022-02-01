import { types } from '../../types/types'





export const agregarTopping = ( id, description, type ) =>({

    type: types.addTopping,
    payload: { 
        id, 
        description,
        type
    }

})

export const deleteTopping = ( id ) =>({

    type: types.deleteTopping,
    payload: {
        id
    }
   
})

export const guardarPedidoEnDb = ( nombre, extra ) =>{


    return ( dispatch, getState ) =>{
            
            dispatch( finishComanda( nombre, extra ) )
            const { custom_ticket } = getState()

            console.log( custom_ticket )

            const { content } = custom_ticket; 

            console.log( 'contenido: ' , content ); 
           
         
            let ticket = "";

           content.forEach((c, i)=>{

               ticket+='<tr>';
               if(i===0){
                   ticket += "<td>Toppings:</td>";
               }else{
                    ticket +="<td></td>";
                }
                
                ticket += `<td> ${ c.description } </td>`
               
                ticket+='</tr>';
           
           });
           ticket = `<tr><td>Cliente ---->:</td><td> *** ${custom_ticket.cliente} *** </td></tr> ${ ticket }`
           ticket += `<tr><td>Extra: ----></td><td> <i>[ ${ custom_ticket.extra }] </i> </td></tr>`
           ticket += `<tr><td>Fecha: ----></td> <td>${custom_ticket.fecha} </td> </tr>`
           ticket = `<table> ${ ticket } </table>`
        

           const contenidoOriginal = document.body.innerHTML;

        
            document.body.innerHTML = ticket;

            window.print()

            document.body.innerHTML = contenidoOriginal;
	
            window.location.href = "/";         
 
    }


}


const finishComanda = ( nombre, extra ) =>({

    type: types.finishComanda,
    payload:{
        nombre,
        extra
        
    }
})


export const cleanComanda = () =>({

    type: types.cleanComanda

})