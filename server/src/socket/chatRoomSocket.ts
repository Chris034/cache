import { Server } from "socket.io";
import ChatMessage from "../db-schema/chatMessageSchema";

function initalizeChatRoomSocket(io: Server) {
    io.on('connection', (socket) => {
        console.log('A user connected');
        
        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
        });
    
        socket.on('message', async (data) => {
            // Ensure user is in a room
            if (socket.rooms.has(data.room)) {
              console.log(`Message from client in room ${data.room}:`, data.message);
              // send message to all users in the room
              const chatMessage = new ChatMessage({
                roomNumber: data.message.roomNumber,
                content: data.message.content,
                username:  data.message.username,
                createdOn:  data.message.createdOn,
              });
              await chatMessage.save();
              io.to(data.room).emit('message', chatMessage);
            } else {
              console.log(`User not in room ${data.room}`);
            }
    
        });
        
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
}

export default initalizeChatRoomSocket