import express from 'express';
import room from '../controllers/chatMessageRouter';

const chatMessageRouter = express.Router()

/** GET Methods */
/**
 * @openapi
 * '/api/chat-message/{roomNumber}/':
 *  get:
 *     tags:
 *     - Chat Message Controller
 *     summary: Get all messages in a room
 *     parameters:
 *      - room number: room number
 *        in: path
 *        description: The room number of the messages you want to get
 *        required: true
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
chatMessageRouter.get('/chat-message/:roomNumber', room.getMessagesByRoom)

export default chatMessageRouter;
