import { body, param, query, validationResult } from "express-validator";

const getMessagesByRoomValidator = [
    param('roomNumber', 'room number is required to be 4 digit integer').isNumeric().isLength({min:4, max:4}),
  ]
  
async function getMessagesByRoom(req, res)
{
    console.log(req.params)
    const result = validationResult(req);
    if (result.isEmpty()) {
        return res.status(200).json({ success: true });
    }

    res.status(400).send({ errors: result.array() });
} 

const createMessageValidator = [
    body('createdOn', 'date is must be ISOString').isISO8601(),
    body('username', 'username cannot be Empty').not().isEmpty(),
    body('roomNumber', 'room number is required to be 4 digit integer').isNumeric().isLength({min:4, max:4}),
  ]

async function createMessage(req, res)
{
    const result = validationResult(req);
    if (result.isEmpty()) {
        return res.status(200).json({ success: true });
    }

    res.status(400).send({ errors: result.array() });} 

const deleteMessageValidator = [
    param('messageId', 'messageId cannot be empty').not().isEmpty(),
  ]
  
async function deleteMessage(req, res)
{
    const result = validationResult(req);
    if (result.isEmpty()) {
        return res.status(200).json({ success: true });
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