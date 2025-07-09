import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|mp4|mp3|pdf/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);  // Accept the file
    } else {
        cb(new Error('Unsupported file type'), false); // Reject the file
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 25, // 5MB
    },
});

export default upload;