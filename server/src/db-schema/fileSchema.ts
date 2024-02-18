import mongoose, { model } from 'mongoose';

export const fileSchema = new mongoose.Schema({
    fileName: String,
    contentType: String,
    data: Buffer,
    uploadedAt: { type: Date, default: Date.now }
});

const FileSchema = model('File', fileSchema);

export default FileSchema;
