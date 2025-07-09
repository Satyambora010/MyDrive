import express from 'express';
import { deleteFile, getFileById, getFilesByUser, incrementViewCountByOne, searchFiles, uploadFile } from '../controllers/fileController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload a new file
 *     description: Upload a file to Cloudinary and save file metadata to database
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload
 *               tags:
 *                 type: string
 *                 description: Comma-separated tags for the file (optional)
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File uploaded successfully"
 *                 file:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     filename:
 *                       type: string
 *                     url:
 *                       type: string
 *                     fileType:
 *                       type: string
 *                     size:
 *                       type: number
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     uploadedBy:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     viewCount:
 *                       type: number
 *       400:
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No file uploaded"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to upload file"
 *                 error:
 *                   type: string
 */
//upload file
router.post('/upload', verifyToken, upload.single('file'), uploadFile);

/**
 * @swagger
 * /api/files/get-files/{userId}:
 *   get:
 *     summary: Get all files for a specific user
 *     description: Retrieve all files uploaded by a specific user
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose files to retrieve
 *     responses:
 *       200:
 *         description: Files retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   filename:
 *                     type: string
 *                   url:
 *                     type: string
 *                   fileType:
 *                     type: string
 *                   size:
 *                     type: number
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   uploadedBy:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   viewCount:
 *                     type: number
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to get files"
 *                 error:
 *                   type: string
 */
//get files by user
router.get('/get-files/:userId', verifyToken, getFilesByUser);

/**
 * @swagger
 * /api/files/get-file/{id}:
 *   get:
 *     summary: Get a specific file by ID
 *     description: Retrieve a single file by its unique identifier
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the file to retrieve
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 filename:
 *                   type: string
 *                 url:
 *                   type: string
 *                 fileType:
 *                   type: string
 *                 size:
 *                   type: number
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 uploadedBy:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 viewCount:
 *                   type: number
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: File not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to get file"
 *                 error:
 *                   type: string
 */
//get file by id
router.get('/get-file/:id', verifyToken, getFileById);

/**
 * @swagger
 * /api/files/delete-file/{id}:
 *   delete:
 *     summary: Delete a file by ID
 *     description: Permanently delete a file from both database and Cloudinary
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the file to delete
 *     responses:
 *       200:
 *         description: File deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File deleted successfully"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: File not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to delete file"
 *                 error:
 *                   type: string
 */
//delete file
router.delete('/delete-file/:id', verifyToken, deleteFile);

/**
 * @swagger
 * /api/files/increment-view-count/{id}:
 *   put:
 *     summary: Increment file view count
 *     description: Increase the view count of a file by one
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the file to increment view count
 *     responses:
 *       200:
 *         description: View count incremented successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "View count incremented successfully"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: File not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to increment view count"
 *                 error:
 *                   type: string
 */
//increment view count by one
router.put('/increment-view-count/:id', verifyToken, incrementViewCountByOne);

/**
 * @swagger
 * /api/files/search-files/{userId}:
 *   get:
 *     summary: Search files by filename or tags for a specific user
 *     description: Search through user's files using filename or tags with ranking algorithm
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose files to search
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query to match against filename or tags
 *     responses:
 *       200:
 *         description: Files found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   file:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       filename:
 *                         type: string
 *                       url:
 *                         type: string
 *                       fileType:
 *                         type: string
 *                       size:
 *                         type: number
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       uploadedBy:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       viewCount:
 *                         type: number
 *                   score:
 *                     type: number
 *                     description: Ranking score based on relevance
 *       400:
 *         description: Query parameter is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Query is required"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to search files"
 *                 error:
 *                   type: string
 */
//search files by filename or tags for user
router.get('/search-files/:userId', verifyToken, searchFiles);

export default router;