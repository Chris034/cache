import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './database';
import chatMessageRouter from './routes/chatMessageRouter';
import swaggerDocs from './swagger/config';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import initalizeChatRoomSocket from './socket/chatRoomSocket';

dotenv.config({ path: `${__dirname}/../config.env` });

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const port = process.env.PORT || 5000;

const allowedOrigins = [process.env.ALLOWED_CORS_ORIGINS];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

//middleware
app.use(cors(options));
app.use(express.json());

//routes
app.use('/api/chat-message', chatMessageRouter, cors());

//swagger
swaggerDocs(app, port);

connectToDatabase()
    .then(() => {
        initalizeChatRoomSocket(io);

        httpServer.listen(port, () => {
            return console.log(
                `Express is listening at http://localhost:${port}`
            );
        });
    })
    .catch((error: Error) => {
        console.error('Database connection failed', error);
        process.exit();
    });
