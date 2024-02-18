import { Server } from 'socket.io';
import ChatMessage from '../db-schema/chatMessageSchema';

export enum SOCKET_EVENTS {
    // when a message is added to a chat room. Must be in a room to send a message
    // on emit { roomNumber: number, message: { username: string, content: string, createdOn: Date, roomNumber: string }
    MESSAGE = 'message',
    // join the specified room, on emit pass in room number
    JOIN_ROOM = 'joinRoom',
    CONNECTION = 'connection',
    DISCONNECTION = 'disconnect'
}

function initalizeChatRoomSocket(io: Server) {
    io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
        console.log('A user connected');

        socket.on(SOCKET_EVENTS.JOIN_ROOM, (room) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
        });

        socket.on(SOCKET_EVENTS.MESSAGE, async (data) => {
            // Ensure user is in a room
            if (socket.rooms.has(data.room)) {
                console.log(
                    `Message from client in room ${data.room}:`,
                    data.message
                );
                // send message to all users in the room
                const chatMessage = new ChatMessage({
                    roomNumber: data.message.roomNumber,
                    content: data.message.content,
                    username: data.message.username,
                    createdOn: data.message.createdOn,
                    files: data.message.files.map((file) => {
                        return {
                            fileName: file.fileName,
                            contentType: file.contentType,
                            data: Buffer.from(file.data)
                        };
                    })
                });
                console.log(data.message.files);
                await chatMessage.save();
                io.to(data.room).emit(SOCKET_EVENTS.MESSAGE, chatMessage);
            } else {
                console.log(`User not in room ${data.room}`);
            }
        });

        socket.on(SOCKET_EVENTS.DISCONNECTION, () => {
            console.log('A user disconnected');
        });
    });
}

export default initalizeChatRoomSocket;
