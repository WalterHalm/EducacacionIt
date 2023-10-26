const mongoose = require ("mongoose")
const DB_URI = `mongodb://127.0.0.1:27017/santagula`

module.exports = ()=>{
    const connect = () => {
        mongoose.connect(
            DB_URI,
            {
                keepAlive:true,
                useNewUrlParser:true,
                useUnifiedTopology: true,
                useFindAndModify: false
            },
        (err)=>{
            if(err){
                console.log("DB: Error")
            }
            else{
                console.log("Conexion Exitosa a la Base de Datos")
            }
        }
        )
    } 

    connect();
}

