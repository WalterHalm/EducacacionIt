var carritoModel = {}

//implementamos mongoo bd
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var carritoSchema = new Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref:"Usuarios" },
    producto_id: {type: mongoose.Schema.Types.ObjectId, ref:"Productos"},
    cantidad: Number,   
})

const MyModel = mongoose.model("carrito", carritoSchema)


carritoModel.adicionaralCarrito = function (post, callback) {
    const instancia = new MyModel
    instancia.usuario_id = post.usuario_id
    instancia.producto_id = post.producto_id
    instancia.cantidad = post.cantidad    

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

carritoModel.CargarMiCarrito = function (post, callback) {
//usamos agregate para unir usarios, producto y carrito

MyModel.aggregate([
    {
        $match: {usuario_id: mongoose.Types.ObjectId(post.usuario_id)}}, //filtramos usuario
    {
        $lookup:{
            from:"productos",             //unimos con productos
            localField:"producto_id",    //campo del modelo carrito
            foreignField: "_id",          // compo con que unimos con producto
            as: "productos"               // nombre de la union    
        }
    },
    { $unwind: "$productos" },            //para que no se muestre como array
    {
        $project: {
            _id:1, producto_id:1, cantidad:1, productos:{titulo:1, precio:1}
    }
}
], (error,documentos) =>{
    if(error){
        return callback({state:false, error:error})
    }
    else{
        return callback ({state:true, documentos})
    }
}
)
}






carritoModel.actualizarcantidad = function (post, callback) {
MyModel.findByIdAndUpdate(post.id,{    
    cantidad: post.cantidad,
    

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

carritoModel.eliminarItem = function (post, callback) {

    MyModel.findByIdAndDelete(post.id,(error,eliminado) =>{
        if(error){
            return callback({state:false,error:error})
        }
        else{
            return callback({state:true})
        }
    })
}


module.exports.carrito = carritoModel