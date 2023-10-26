const { response } = require("express")

var productosModel = require (__dirname + "/../Modelo/productosModel.js").productos

var productosConstroller = {}

productosConstroller.Guardar = function (request, response){   
    
    var post ={
        titulo:request.body.titulo,
        cantidad:request.body.cantidad,
        precio:request.body.precio
    }

    if(post.titulo == undefined || post.titulo == null || post.titulo ==""){
        response.json({state:false, mensaje:"El campo titulo es obligatorio"})
        return false
    }

    if(post.cantidad == undefined || post.cantidad == null || post.cantidad ==""){
        response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio ==""){
        response.json({state:false, mensaje:"El campo precio es obligatorio"})
        return false
    } 

    productosModel.Guardar(post, function(respuesta){
        if(respuesta.state==true){
            response.json({state:true, mensaje:"Producto creado correctamente"})
        }
        else {
            response.json({state:false, mensaje :"Error al crear el productos", error:respuesta.error})
        }
    })
    
}

productosConstroller.CargarTodas = function (request, response){  
    
    productosModel.CargarTodas(null, function(respuesta){
        response.json(respuesta)
    }
    )
}

productosConstroller.Actualizar = function (request, response){    
    var post ={
        id: request.body.id,
        titulo:request.body.titulo,
        cantidad:request.body.cantidad,
        precio:request.body.precio
    }

    if(post.id == undefined || post.id == null || post.id ==""){
        response.json({state:false, mensaje:"El campo id es obligatorio"})
        return false
    }

    if(post.titulo == undefined || post.titulo == null || post.titulo ==""){
        response.json({state:false, mensaje:"El campo titulo es obligatorio"})
        return false
    }

    if(post.cantidad == undefined || post.cantidad == null || post.cantidad ==""){
        response.json({state:false, mensaje:"El campo Cantidad es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio ==""){
        response.json({state:false, mensaje:"El campo Precio es obligatorio"})
        return false
    }

 

    productosModel.Actualizar(post, function(respuesta){
        if(respuesta.state==true){
            response.json({state:true, mensaje:"Productos actualizado correctamente"})
        }
        else {
            response.json({state:false, mensaje :"Error al actualizar el Productos", error:respuesta.error})
        }
    })

}

productosConstroller.Eliminar = function (request, response){
    
    var post ={
        id: request.body.id

    }

    if(post.id == undefined || post.id == null || post.id ==""){
        response.json({state:false, mensaje:"El campo id es obligatorio"})
        return false
    }  
 

    productosModel.Eliminar(post, function(respuesta){
        if(respuesta.state==true){
            response.json({state:true, mensaje:"Producto Eliminado correctamente"})
        }
        else {
            response.json({state:false, mensaje :"Error al Eliminado el producto", error:respuesta.error})
        }
    })

}



module.exports.productos = productosConstroller