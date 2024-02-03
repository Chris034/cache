import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const chatMessageSchema = new Schema({
  username: {
    type: String,
    required: true,

  },
  content: {
    type: String,
    default: ''

  },
  createdOn: {
    type: Date,
    required: true,

  },
  roomNumber: {
    type: String,
    required: true,
  },
});

chatMessageSchema.statics = {
  exists(id) {
    return ChatMessage.find({_id: id})
           .then(result => {
              if (result.length == 0) throw new Error('Chat Message not found')
    })
 },
}

const ChatMessage = model('Chat-Message', chatMessageSchema);

export default ChatMessage;