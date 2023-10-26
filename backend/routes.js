const { response } = require("express")

var usuariosConstroller = require (__dirname + "/apis/controlador/usuarioController.js").usuarios


app.post("/Usuarios/guardar", function(request, response){  
    usuariosConstroller.Guardar(request,response) 
})


app.post("/Usuarios/CargarTodas", function(request, response){  
    usuariosConstroller.CargarTodas(request,response)  
})


app.post("/Usuarios/actualizar", function(request, response){
    usuariosConstroller.Actualizar(request,response)    
})

app.post("/Usuarios/eliminar", function(request, response){   
    usuariosConstroller.Eliminar(request,response) 
})

app.post("/Usuarios/login", function(request, response){   
    usuariosConstroller.login(request,response) 
})


//productos


var productosConstroller = require (__dirname + "/apis/controlador/productosController.js").productos


app.post("/productos/guardar", function(request, response){  
    productosConstroller.Guardar(request,response) 
})


app.post("/productos/CargarTodas", function(request, response){  
    productosConstroller.CargarTodas(request,response)  
})


app.post("/productos/actualizar", function(request, response){
    productosConstroller.Actualizar(request,response)    
})

app.post("/productos/eliminar", function(request, response){   
    productosConstroller.Eliminar(request,response) 
})

//CARRITO


var carritoConstroller = require (__dirname + "/apis/controlador/carritoController.js").carrito


app.post("/carrito/adicionaralCarrito", function(request, response){  
    carritoConstroller.adicionaralCarrito(request,response) 
})


app.post("/carrito/CargarMiCarrito", function(request, response){  
    carritoConstroller.CargarMiCarrito(request,response)  
})


app.post("/carrito/actualizarcantidad", function(request, response){
    carritoConstroller.actualizarcantidad(request,response)    
})

app.post("/carrito/eliminarItem", function(request, response){   
    carritoConstroller.eliminarItem(request,response) 
})

