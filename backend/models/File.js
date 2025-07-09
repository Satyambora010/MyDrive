import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
    },
    tags: {
        type: [String],
    },
    viewCount: {
        type: Number,
        default: 0,
    }
})

const File = mongoose.model('File', fileSchema);

export default File;