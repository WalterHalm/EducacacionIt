const { response } = require("express")

var carritoModel = require (__dirname + "/../Modelo/carritoModel.js").carrito

var carritoConstroller = {}

carritoConstroller.adicionaralCarrito = function (request, response){   
    
    var post ={
        usuario_id:request.session.usuario_id,
        producto_id:request.body.producto_id,
        cantidad:request.body.cantidad
    }

    if(post.usuario_id == undefined || post.usuario_id == null || post.usuario_id ==""){
        response.json({state:false, mensaje:"El campo usuario_id es obligatorio"})
        return false
    }

    if(post.producto_id == undefined || post.producto_id == null || post.producto_id ==""){
        response.json({state:false, mensaje:"El campo producto_id es obligatorio"})
        return false
    }

    if(post.cantidad == undefined || post.cantidad == null || post.cantidad ==""){
        response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
        return false
    } 

    carritoModel.adicionaralCarrito(post, function(respuesta){
        if(respuesta.state==true){
            response.json({state:true, mensaje:"Producto agregado al carrito"})
        }
        else {
            response.json({state:false, mensaje :"Error al crear el carrito", error:respuesta.error})
        }
    })
    
}

carritoConstroller.CargarMiCarrito = function (request, response){  
    
    var post ={
        usuario_id:request.session.usuario_id,       
    }

    if(post.usuario_id == undefined || post.usuario_id == null || post.usuario_id ==""){
        response.json({state:false, mensaje:"El campo usuario_id es obligatorio"})
        return false
    }
    carritoModel.CargarMiCarrito(post, function(respuesta){
        response.json(respuesta)
    }
    )
}

carritoConstroller.actualizarcantidad = function (request, response){    
    var post ={
        id: request.body.id,        
        cantidad:request.body.cantidad,
        
    }

    if(post.id == undefined || post.id == null || post.id ==""){
        response.json({state:false, mensaje:"El campo id es obligatorio"})
        return false
    }

    if(post.cantidad == undefined || post.cantidad == null || post.cantidad ==""){
        response.json({state:false, mensaje:"El campo titulo es obligatorio"})
        return false
    } 

    carritoModel.actualizarcantidad(post, function(respuesta){
        if(respuesta.state==true){
            response.json({state:true, mensaje:"producto del carrito actualizado correctamente"})
        }
        else {
            response.json({state:false, mensaje :"Error al actualizar el carrito", error:respuesta.error})
        }
    })

}

carritoConstroller.eliminarItem = function (request, response){
    
    var post ={
        id: request.body.id

    }

    if(post.id == undefined || post.id == null || post.id ==""){
        response.json({state:false, mensaje:"El campo id es obligatorio"})
        return false
    }  
 

    carritoModel.eliminarItem(post, function(respuesta){
        if(respuesta.state==true){
            response.json({state:true, mensaje:"Producto Eliminado del carrito"})
        }
        else {
            response.json({state:false, mensaje :"Error al Eliminado el producto", error:respuesta.error})
        }
    })

}



module.exports.carrito = carritoConstroller