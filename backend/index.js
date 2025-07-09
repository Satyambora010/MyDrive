import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import { swaggerDocs } from './docs/swagger.js';
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Swagger
swaggerDocs(app);

// Base Route
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
