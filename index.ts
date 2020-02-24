import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = Server.instance;

//body-parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//Cors
server.app.use(cors({origin: true, credentials: true}));    //Cualquier persona puede llamar mis servicios

//routes
server.app.use('/', router);

server.start(() => {
    console.log("Servidor Corriendo en el puerto: ", server.port);
});