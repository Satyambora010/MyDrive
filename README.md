# 📁 MyDrive - Full Stack File Management App

MyDrive is a full-stack web application that allows users to **upload**, **preview**, **search**, **rank**, and **manage** their multimedia files. It features **authentication**, **Cloudinary integration**, **view count tracking**, and **search ranking** based on user behavior.

---

## 🚀 Features

- 🔐 User Registration & Login with JWT Authentication
- ☁️ Cloudinary-based file upload & storage
- 🔎 Intelligent Search with Ranking (tags, view count, recency)
- 📊 View count tracking per file
- 🧾 API Documentation via Swagger
- 💻 Deployment using Railway (backend) & Vercel (frontend)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT & bcrypt
- Cloudinary SDK
- Swagger (OpenAPI)

---

## 🌐 Deployment URLs

- **Frontend (Vercel)**: [https://my-drive-dusky.vercel.app](https://my-drive-dusky.vercel.app)
- **Backend (Railway)**: [https://mydrive-production-ede9.up.railway.app](https://mydrive-production-ede9.up.railway.app)
- **API Docs**: `/api-docs` on backend URL

## Instructions to run locally

- change baseURL in frontend/src/config/api.js to your local backend server
- set secure:false and sameSite:'lax' in backend/utils/generateToken
- inside frontend use command npm run dev to start frontend server
- inside backend use command node index.js to start backend server
