export enum SOCKET_EVENTS {
    // when a message is added to a chat room. Must be in a room to send a message
    // on emit { message: { username: string, content: string, createdOn: Date, roomNumber: string }
    MESSAGE = 'message',
    // join the specified room, on emit pass in room number
    JOIN_ROOM = 'joinRoom'
}
