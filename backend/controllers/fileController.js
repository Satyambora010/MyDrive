import streamifier from 'streamifier';
import cloudinary from '../config/cloudinary.js';
import File from '../models/File.js';

/**
 * Upload a file to Cloudinary and save metadata to database
 * @param {Object} req - Express request object
 * @param {Object} req.file - Uploaded file object from multer
 * @param {string} req.file.originalname - Original filename
 * @param {Buffer} req.file.buffer - File buffer
 * @param {string} req.file.mimetype - File MIME type
 * @param {number} req.file.size - File size in bytes
 * @param {Object} req.body - Request body
 * @param {string} req.body.tags - Comma-separated tags (optional)
 * @param {Object} req.user - Authenticated user object
 * @param {string} req.user._id - User ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with uploaded file data or error message
 */
// Upload file to cloudinary
export const uploadFile = async (req, res) => {
    try {
        // Get file from request
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload file to cloudinary
        const result = await cloudinary.uploader.upload_stream(
            {resource_type: 'auto'},
            async (error, result) => {
                if (error) return res.status(500).json({ message: error.message });

                // Create file data
                const fileData = new File({
                    filename: file.originalname,
                    url: result.secure_url,
                    fileType: file.mimetype,
                    size: file.size,
                    tags: req.body.tags ? req.body.tags : [],    
                    uploadedBy: req.user._id,
                    createdAt: new Date(),
                });

                // Save file data to database
                await fileData.save();
                res.status(201).json({ message: 'File uploaded successfully', file: fileData });
            }
        );

        // Stream file to cloudinary
        streamifier.createReadStream(file.buffer).pipe(result);
            
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Failed to upload file', error: error.message });
    }
} 

/**
 * Get all files uploaded by a specific user
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.userId - ID of the user whose files to retrieve
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with array of files or error message
 */
//get files by user
export const getFilesByUser = async (req,res) => {
    try{
        // Get files from database
        const files = await File.find({uploadedBy: req.params.userId});
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get files', error: error.message });
    }
}

/**
 * Get a specific file by its unique identifier
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - ID of the file to retrieve
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with file data or error message
 */
//get file by id
export const getFileById = async (req,res) => {
    try{
        // Get file from database
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        await file.save();
        res.status(200).json(file);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get file', error: error.message });
    }
}

/**
 * Delete a file by its unique identifier
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - ID of the file to delete
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success message or error message
 */
//delete file
export const deleteFile = async (req,res) => {
    try{
        // Get file from database
        const file = await File.findByIdAndDelete(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete file', error: error.message });
    }
}

/**
 * Increment the view count of a file by one
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - ID of the file to increment view count
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success message or error message
 */
//increment view count by one
export const incrementViewCountByOne = async (req,res) => {
    try{
        // Get file from database
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        // Increment view count
        file.viewCount += 1;
        // Save file data to database
        await file.save();
        res.status(200).json({ message: 'View count incremented successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to increment view count', error: error.message });
    }
}

/**
 * Search files by filename or tags for a specific user with ranking algorithm
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.userId - ID of the user whose files to search
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.query - Search query to match against filename or tags
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with ranked files or error message
 * 
 * @description
 * This function searches through a user's files using a sophisticated ranking algorithm:
 * - Tag matches: 2 points per matching tag
 * - Filename matches: 4 points per matching term
 * - View count: 2 points per view
 * - Recency: -2 points per day since creation (newer files rank higher)
 * 
 * The search is case-insensitive and supports multiple search terms.
 */
//search files by filename or tags for user
export const searchFiles = async (req,res) => {
    try{
        const {query} = req.query;
        const {userId} = req.params;
        if(!query){
            return res.status(400).json({ message: 'Query is required' });
        }
        // split query into search terms
        const searchTerms = query.toLowerCase().split(" ");
        // get files from database
        const files = await File.find({uploadedBy: req.params.userId});
        // rank files
        const rankedFiles = files.map((file) => {
            const tagMatchCount = file.tags.filter((tag) => 
                searchTerms.includes(tag.toLowerCase())).length || 0;
            const filenameMatchCount = searchTerms.filter((term) => 
                file.filename.toLowerCase().includes(term)).length || 0;
            const viewCount = file.viewCount || 0;
            const datediff = Math.floor((new Date() - file.createdAt) / (1000 * 60 * 60 * 24));
            const score = tagMatchCount * 2 + filenameMatchCount * 4 + viewCount * 2 + datediff * -2;
            return {file, score};
        });
        // sort files by score
        const sortedFiles = rankedFiles.sort((a,b) => b.score - a.score);
        res.status(200).json(sortedFiles);
    } catch (error) {
        res.status(500).json({ message: 'Failed to search files', error: error.message });
    }
}


