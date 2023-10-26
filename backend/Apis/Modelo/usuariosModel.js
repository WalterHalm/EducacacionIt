var usuariosModel = {}

//implementamos mongoo bd
const mongoose = require("mongoose")
const Schema = mongoose.Schema

var UsuariosSchema = new Schema({
    email: String,
    nombre: String,
    password: String,
    rol: Number
})

const MyModel = mongoose.model("Usuarios", UsuariosSchema)


usuariosModel.Guardar = function (post, callback) {
    const instancia = new MyModel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.password = post.password
    instancia.rol = 2 //dos para clientes uno para admin. 

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

usuariosModel.CargarTodas = function (post, callback) {
    MyModel.find({}, {password:0}, (error, documentos) => {
        if (error) {
            return callback({ state: false, error: error })
        }
        else {
            return callback({ state: true, data: documentos })

        }
    }
    )
}

usuariosModel.Actualizar = function (post, callback) {
    MyModel.findByIdAndUpdate(post.id, {
        nombre: post.nombre //probando actualizar solo nombre
    }, (error, modificado) => {
        if (error) {
            return callback({ state: false, error: error })
        }
        else {
            return callback({ state: true })
        }
    }
    )

}

usuariosModel.Eliminar = function (post, callback) {

    MyModel.findByIdAndDelete(post.id, (error, eliminado) => {
        if (error) {
            return callback({ state: false, error: error })
        }
        else {
            return callback({ state: true })
        }
    })
}

//LOGIN
usuariosModel.login = function (post, callback) {
    MyModel.find({ email: post.email, password: post.password }, { password: 0 }, (error, documentos) => {
        if (error) {
            return callback({ state: false, error: error })
        }
        else {
            if (documentos.length == 0) {
                return callback({ state: false, mensaje: "no se pudo iniciar sesion, verifique las credenciales" })
            }
            else {
                return callback({ state: true, data: documentos })
            }
        }
    }
    )
}

module.exports.usuarios = usuariosModel