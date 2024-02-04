import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './database';
import chatMessageRouter from './routes/chatMessageRouter';
import swaggerDocs from './swagger/config';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import initalizeChatRoomSocket from './socket/chatRoomSocket';
import winston from 'winston';
import expressWinston from 'express-winston';

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
app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
        meta: false, // optional: control whether you want to log the meta data about the request (default to true)
        msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: true // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    })
);

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
