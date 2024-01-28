import { body, param, query, validationResult } from "express-validator";
import ChatMessage from "../schema/chatMessageSchema";

const getMessagesByRoomValidator = [
    param('roomNumber', 'room number is required to be 4 digit integer').isNumeric().isLength({min:4, max:4}),
  ]
  
async function getMessagesByRoom(req, res)
{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const roomNumber = req.params.roomNumber
        const roomMessages = await ChatMessage.find({ roomNumber: roomNumber })
        return res.status(200).json( roomMessages );
    }

    res.status(400).send({ errors: result.array() });
} 

const createMessageValidator = [
    body('createdOn', 'date must be Date').isISO8601(),
    body('username', 'username cannot be Empty').not().isEmpty(),
    body('roomNumber', 'room number is required to be 4 digit integer').isNumeric().isLength({min:4, max:4}),
  ]

async function createMessage(req, res)
{
    const result = validationResult(req);

    if (result.isEmpty()) {

        const chatMessage = new ChatMessage({
            roomNumber: req.body.roomNumber,
            content:  req.body.content,
            author:  req.body.username,
            createdOn:  req.body.createdOn,
          });
            
        // Insert the article in our MongoDB database
        const createdMessage = await chatMessage.save()
        return res.status(200).json({ messageId: createdMessage._id });
    }

    res.status(400).send({ errors: result.array() });} 

const deleteMessageValidator = [
    param('messageId', 'messageId must exist').exists().isMongoId().custom(ChatMessage.exists)
  ]
  
async function deleteMessage(req, res)
{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const messageId = req.params.messageId
        const deletedMessage = await ChatMessage.deleteOne({ _id: messageId });

        return res.status(200).json(deletedMessage);
    }

    res.status(400).send({ errors: result.array() });
} 

export default {
    getMessagesByRoom,
    getMessagesByRoomValidator,
    createMessage,
    createMessageValidator,
    deleteMessage,
    deleteMessageValidator
}