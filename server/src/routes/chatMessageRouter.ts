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
     *     parameters:
     *      - name: roomNumber
     *        in: path
     *        description: The room number for which to retrieve chat messages
     *        required: true
     *        schema:
     *          type: string
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
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
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - content
     *              - createdOn
     *              - username
     *              - roomNumber
     *            properties:
     *              username:
     *                type: string
     *              createdOn:
     *                type: string
     *              content:
     *                type: string
     *              roomNumber:
     *                  type: integer
     *     responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Bad request
     *      500:
     *        description: Server Error
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
     *     parameters:
     *      - name: messageId
     *        in: path
     *        description: The id of the chat message
     *        required: true
     *     responses:
     *      200:
     *        description: Removed
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    chatMessageRouter.delete('/:messageId', chatMessage.deleteMessageValidator, chatMessage.deleteMessage)



export default chatMessageRouter;
