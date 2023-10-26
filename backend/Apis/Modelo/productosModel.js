var productosModel = {}

//implementamos mongoo bd
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var productosSchema = new Schema({
    titulo: String,
    cantidad: Number,
    precio: Number,   
})

const MyModel = mongoose.model("productos", productosSchema)


productosModel.Guardar = function (post, callback) {
    const instancia = new MyModel
    instancia.titulo = post.titulo
    instancia.cantidad = post.cantidad
    instancia.precio = post.precio    

    instancia.save((error, Creado) => {
        if (error) {
            return callback({ state: false, error: error })
        }
        else {
            return callback({ state: true })
        }
    }
    )
}

productosModel.CargarTodas = function (post, callback) {
    MyModel.find({}, {}, (error, documentos) => {
        if (error) {
            return callback({ state: false, error: error })
        }
        else {
            return callback({ state: true, data: documentos })

        }
    }
)
}

productosModel.actualizarcantidad = function (post, callback) {
MyModel.findByIdAndUpdate(post.id,{
    titulo: post.titulo,
    cantidad: post.cantidad,
    precio: post.precio,

    },(error, modificado)=>{
        if(error){
            return callback({state:false, error:error})
        }
        else{
            return callback({state:true})
        }
    }
    )

}

productosModel.Eliminar = function (post, callback) {

    MyModel.findByIdAndDelete(post.id,(error,eliminado) =>{
        if(error){
            return callback({state:false,error:error})
        }
        else{
            return callback({state:true})
        }
    })
}


module.exports.productos = productosModel