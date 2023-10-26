const { response } = require("express")

var usuariosModel = require (__dirname + "/../Modelo/usuariosModel.js").usuarios

var usuariosConstroller = {}

usuariosConstroller.Guardar = function (request, response){   
    
    var post ={
        nombre:request.body.nombre,
        email:request.body.email,
        password:request.body.password
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre ==""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if(post.email == undefined || post.email == null || post.email ==""){
        response.json({state:false, mensaje:"El campo Email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password ==""){
        response.json({state:false, mensaje:"El campo Password es obligatorio"})
        return false
    } 

    usuariosModel.Guardar(post, function(respuesta){
        if(respuesta.state==true){
            response.json({state:true, mensaje:"Usuario creado correctamente"})
        }
        else {
            response.json({state:false, mensaje :"Error al crear el usuario", error:respuesta.error})
        }
    })
    
}

usuariosConstroller.CargarTodas = function (request, response){  
    
    usuariosModel.CargarTodas(null, function(respuesta){
        response.json(respuesta)
    }
    )
}

usuariosConstroller.Actualizar = function (request, response){    
    var post ={
        id: request.body.id,
        nombre:request.body.nombre,
        email:request.body.email,
        password:request.body.password
    }

    if(post.id == undefined || post.id == null || post.id ==""){
        response.json({state:false, mensaje:"El campo id es obligatorio"})
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre ==""){
        response.json({state:false, mensaje:"El campo Nombre es obligatorio"})
        return false
    }

 

    usuariosModel.Actualizar(post, function(respuesta){
        if(respuesta.state==true){
            response.json({state:true, mensaje:"Usuario actualizado correctamente"})
        }
        else {
            response.json({state:false, mensaje :"Error al actualizar el usuario", error:respuesta.error})
        }
    })

}

usuariosConstroller.Eliminar = function (request, response){
    
    var post ={
        id: request.body.id

    }

    if(post.id == undefined || post.id == null || post.id ==""){
        response.json({state:false, mensaje:"El campo id es obligatorio"})
        return false
    }  
 

    usuariosModel.Eliminar(post, function(respuesta){
        if(respuesta.state==true){
            response.json({state:true, mensaje:"Usuario Eliminado correctamente"})
        }
        else {
            response.json({state:false, mensaje :"Error al Eliminado el usuario", error:respuesta.error})
        }
    })

}

//login

usuariosConstroller.login = function (request, response){   
    
    var post ={       
        email:request.body.email,
        password:request.body.password
    }
  

    if(post.email == undefined || post.email == null || post.email ==""){
        response.json({state:false, mensaje:"El campo Email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password ==""){
        response.json({state:false, mensaje:"El campo Password es obligatorio"})
        return false
    } 

    usuariosModel.login(post, function(respuesta){
        if(respuesta.state==true){
            console.log(respuesta)
            request.session.usuario_id = respuesta.data[0]._id
            response.json({state:true, mensaje:"Bienvenido"})
        }
        else {
            response.json({state:false, mensaje :"Error al iniciar sesion", error:respuesta.error})
        }
    })
    
}


module.exports.usuarios = usuariosConstroller