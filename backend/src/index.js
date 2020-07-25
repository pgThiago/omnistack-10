const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-00qfm.mongodb.net/omnistack10',
{   
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}
);

app.use(cors());
app.use(express.json());
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros

// Query Params: request.query (Filtros, odenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body Params:  request.body (Dados para criação ou alteração de um registro)


server.listen(3333);