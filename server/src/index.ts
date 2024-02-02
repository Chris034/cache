import express from 'express';
import dotenv from 'dotenv'; 
import { connectToDatabase } from './database';
import chatMessageRouter from './routes/chatMessageRouter';
import swaggerDocs from './swagger/config';
import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from "http";
import ChatMessage from './schema/chatMessageSchema';

dotenv.config({ path: `${__dirname}/../config.env` })

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
 });
  
const port = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:3001'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json())

app.use('/api/chat-message', chatMessageRouter)

swaggerDocs(app, port)


connectToDatabase()
.then(() => {
io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

     // Listen for messages from the client in a specific sub-room
    socket.on('message', async (data) => {
        if (socket.rooms.has(data.room)) {
          console.log(`Message from client in room ${data.room}:`, data.message);
          // Broadcast the message to all connected clients in the specific room
          const chatMessage = new ChatMessage({
            roomNumber: data.message.roomNumber,
            content: data.message.content,
            author:  data.message.username,
            createdOn:  data.message.createdOn,
          });
          await chatMessage.save();
        //   const allMessages = await ChatMessage.find({ roomNumber: data.room })
          io.to(data.room).emit('message', chatMessage);
        } else {
          console.log(`User not in room ${data.room}`);
        }

    });
    
    
    // Disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
    // app.listen(port, () => {
    //     return console.log(`Express is listening at http://localhost:${5000}`);
    // });

    httpServer.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
})
.catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
});
