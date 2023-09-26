// creamos la variable para tomar los codigos de express

const express= require("express");

//IMPORTAMOS LA LIBRERIA DE DOTENV
const dotenv= require("dotenv");

dotenv.config();

//creamos una variable para ejecutar las funciones de express

const app = express();

//utilizamos las funcionalidades de express
app.get("/", function(peticion, respuesta){
console.log(respuesta);
console.log(peticion.url);
console.log(peticion.method);
console.log(process.env.PORT)

respuesta.send(`<h1>Pepe</h1>`)
});

//creamos los puertos para la escucha de la aplic
const PORT01 = 9000 && 3000;
const PORT02= 9000 || 3000; //otra forma
const PORT = process.env.PORT || 9000    //forma con env.  

app.listen(PORT, function(){
    console.log(`servidor escuchando en el puerto http://localhost:${PORT}`)
})
