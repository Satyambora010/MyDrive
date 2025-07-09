# MyDrive App Deployment Guide

## 🚀 Deployment Overview

This guide will help you deploy your MyDrive application to production using:

- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway (Node.js + Express)
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary

## 📋 Prerequisites

1. **GitHub Account** - For code repository
2. **Vercel Account** - For frontend deployment
3. **Railway Account** - For backend deployment
4. **MongoDB Atlas Account** - For database
5. **Cloudinary Account** - For file storage

## 🔧 Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Set up database access (username/password)
5. Set up network access (allow all IPs: 0.0.0.0/0)

### 1.2 Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password

## ☁️ Step 2: Set Up Cloudinary

### 2.1 Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Get your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret

## 🚂 Step 3: Deploy Backend to Railway

### 3.1 Prepare Backend Repository

1. Push your backend code to GitHub
2. Make sure you have these files:
   - `package.json` (with start script)
   - `index.js`
   - `env.example`

### 3.2 Deploy to Railway

1. Go to [Railway](https://railway.app/)
2. Sign in with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your backend repository
6. Railway will automatically detect it's a Node.js app

### 3.3 Configure Environment Variables

In Railway dashboard, add these environment variables:

```env
PORT=3001
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### 3.4 Get Backend URL

1. After deployment, Railway will provide a URL
2. Copy this URL (e.g., `https://your-app.railway.app`)

## ⚡ Step 4: Deploy Frontend to Vercel

### 4.1 Prepare Frontend Repository

1. Push your frontend code to GitHub
2. Make sure you have these files:
   - `package.json`
   - `vite.config.js`
   - `env.example`

### 4.2 Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign in with GitHub
3. Click "New Project"
4. Import your frontend repository
5. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 4.3 Configure Environment Variables

In Vercel dashboard, add this environment variable:

```env
VITE_API_URL=https://your-backend-url.railway.app
```

### 4.4 Update Backend CORS

Go back to Railway and update the `FRONTEND_URL` environment variable with your Vercel URL.

## 🔄 Step 5: Update Frontend API Calls

### 5.1 Update CORS in Backend

In your backend `index.js`, update the `allowedOrigins` array:

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://your-frontend-url.vercel.app",
];
```

## 🧪 Step 6: Test Your Deployment

### 6.1 Test Backend

1. Visit your Railway URL: `https://your-app.railway.app`
2. You should see: `{"message":"MyDrive API is running!"}`
3. Test API docs: `https://your-app.railway.app/api-docs`

### 6.2 Test Frontend

1. Visit your Vercel URL
2. Try to register/login
3. Test file upload functionality
4. Test file search and management

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**

   - Check that frontend URL is in backend's allowed origins
   - Verify environment variables are set correctly

2. **Database Connection Issues**

   - Check MongoDB Atlas network access settings
   - Verify connection string format

3. **File Upload Issues**

   - Check Cloudinary credentials
   - Verify file size limits

4. **Authentication Issues**
   - Check JWT_SECRET is set
   - Verify cookie settings

### Environment Variables Checklist:

**Backend (Railway):**

- ✅ `PORT`
- ✅ `NODE_ENV`
- ✅ `MONGODB_URI`
- ✅ `JWT_SECRET`
- ✅ `CLOUDINARY_CLOUD_NAME`
- ✅ `CLOUDINARY_API_KEY`
- ✅ `CLOUDINARY_API_SECRET`
- ✅ `FRONTEND_URL`

**Frontend (Vercel):**

- ✅ `VITE_API_URL`

## 📊 Monitoring

### Railway Monitoring

- Check Railway dashboard for logs
- Monitor resource usage
- Set up alerts for errors

### Vercel Monitoring

- Check Vercel dashboard for build status
- Monitor function execution
- Check analytics

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secret**: Use a strong, random secret
3. **CORS**: Only allow necessary origins
4. **File Upload**: Implement file type and size validation
5. **Rate Limiting**: Consider adding rate limiting to your API

## 🎉 Success!

Your MyDrive app should now be live and accessible from anywhere in the world!

**Frontend**: `https://your-app.vercel.app`
**Backend**: `https://your-app.railway.app`
**API Docs**: `https://your-app.railway.app/api-docs`
