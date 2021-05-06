import express from 'express';
import { createServer } from 'http';
import { Socket, Server } from 'socket.io';
import cors from 'cors';

import { routes } from './routes';

const app = express();

const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: '*',
  }
});

io.on("connection", (socket: Socket) => {
  
});

app.use(cors());
app.use(express.json());
app.use(routes);

export { http, io };