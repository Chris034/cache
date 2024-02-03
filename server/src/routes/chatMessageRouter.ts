import express from 'express';
import chatMessage from '../controllers/chatMessageController';

const chatMessageRouter = express.Router()

/** GET Methods */
    /**
     * @openapi
     * '/api/chat-message/{roomNumber}':
     *  get:
     *     tags:
     *     - Chat Message Controller
     *     summary: Get all messages in a room
     *     operationId: ChatMessageGetAllByRoomNumber
     *     parameters:
     *      - name: roomNumber
     *        in: path
     *        description: The room number for which to retrieve chat messages
     *        required: true
     *        schema:
     *          type: string
     *     responses:
     *      200:
     *        description: Successful response
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/ChatMessageDto'
     *      400:
     *        description: Bad Request
     */
    chatMessageRouter.get('/:roomNumber', chatMessage.getMessagesByRoomValidator, chatMessage.getMessagesByRoom)

/** POST Methods */
    /**
     * @openapi
     * '/api/chat-message':
     *  post:
     *     tags:
     *     - Chat Message Controller
     *     summary: Create a chat message and associate it to a room
     *     operationId: ChatMessageCreate
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *             $ref: '#/components/schemas/ChatMessageDto'
     *     responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Bad request
     */
chatMessageRouter.post('/', chatMessage.createMessageValidator, chatMessage.createMessage)

/** DELETE Methods */
    /**
     * @openapi
     * '/api/chat-message/{messageId}':
     *  delete:
     *     tags:
     *     -  Chat Message Controller
     *     summary: Delete chat-message by Id
     *     operationId: ChatMessageDeleteById
     *     parameters:
     *      - name: messageId
     *        in: path
     *        description: The id of the chat message
     *        required: true
     *     responses:
     *      200:
     *        description: Removed
     *      404:
     *        description: Not Found
     */
    chatMessageRouter.delete('/:messageId', chatMessage.deleteMessageValidator, chatMessage.deleteMessage)

export default chatMessageRouter;
