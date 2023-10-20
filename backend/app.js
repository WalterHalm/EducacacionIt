var express = require("express");
global.app =express();
var bodyParse = require ("body-parser");
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:true}));
global.config = require (__dirname + '/config/config').config;
const initDB = require ('./config/bd')


//confuracion de la session
var session = require ('express-session')({
    secret:config.claveoculta,
    resave:true,
    saveUninitialized:true,
    cookie:{path: "/", httpOnly:true, maxAge:config.tiemposesion},
    name:"SantaGula",
    rolling:true,
});
app.use(session);



//archivos de rutas
require(__dirname + "/routes.js");



//conectar base datos mongoo
initDB();

//servidor 
app.listen(config.puerto, function(){
    console.log("Servidor corriendo correctamente puerto " + config.puerto)
});