//. crear variable para utilizar el modulo nativo de Node http

const http = require("http");

// creamos un servidor nativo y la guardamos en una variable.

const server = http.createServer((request, response)=>{

    console.log(request);
    console.log("------------------------");
    console.log(request.url);
    console.log("------------------------");
    console.log(request.method);
    console.log("------------------------");
    console.log(`servidor trabajando...`);
    console.log("------------------------");
    response.end(`<h1>Pepe</h1>`);
});

// creamos un puerto para que el servidor escuche las peticiones

PORT = 8080;

server.listen(PORT, ()=>{
    console.log(`servidor escuchando en el puerto http://localhost:${PORT}`)
});