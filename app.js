import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'socket.io';
import sockets from './routes/sockets.js';
import routes from './routes/index.js';

const port = process.env.PORT || 3001;

express.application.prefix = express.Router.prefix = function (path, configure) {
    const router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
}

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['https://admin.socket.io', 'https://hoppscotch.io', 'http://localhost:3000'],
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});


//?parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//? routes endpoint
routes(app);


//? sockets endpoint
sockets(io);


httpServer.listen(port, () => {
    console.log(`Server app listening at port : http://localhost:${port}`)
})