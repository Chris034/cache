import chatMessageSchema from './chatMessageSchema';
import m2s from 'mongoose-to-swagger';
//https://www.npmjs.com/package/mongoose-to-swagger

export default {
    chatMessageDto: m2s(chatMessageSchema)
};
