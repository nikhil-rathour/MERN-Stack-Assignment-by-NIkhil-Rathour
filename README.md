# MERN Stack Task Management Application

A full-stack task management application built with MongoDB, Express.js, React, and Node.js.

## 🚀 Live Demo

**Frontend**: [https://mern-stack-assignment-by-n-ikhil-ra-alpha.vercel.app/](https://mern-stack-assignment-by-n-ikhil-ra-alpha.vercel.app/)

## Features

### Backend Features
- User authentication (register/login)
- JWT-based authorization
- CRUD operations for tasks
- User-specific task management
- RESTful API design

### Frontend Features
- Modern React with Vite
- Responsive UI with TailwindCSS
- User registration and login
- Task dashboard with CRUD operations
- Protected routes
- Real-time task management

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, Axios, React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/nikhil-rathour/MERN-Stack-Assignment-by-NIkhil-Rathour.git
cd MERN-Stack-Assignment-by-NIkhil-Rathour
```

### 2. Backend Setup
```bash
cd backend
npm install
```

**Environment Variables** (`.env`):
```env
MONGO_URI=mongodb://localhost:27017/taskmanagement

JWT_SECRET=your_super_secure_jwt_secret_key


```

**Start Backend**:
```bash
npm run dev    # Development
npm start      # Production
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

**Environment Variables** (`.env`):
```env
VITE_API_URL=http://localhost:5000
# For production: 
```

**Start Frontend**:
```bash
npm run dev    # Development
npm run build  # Production build
```

### 4. Access Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **Live Demo**: https://mern-stack-assignment-by-n-ikhil-ra-alpha.vercel.app/

## Project Structure

```
MERN-Stack-Assignment-by-NIkhil-Rathour/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main app component
│   ├── .env               # Frontend environment variables
│   └── package.json       # Frontend dependencies
├── backend/
│   ├── config/
│   │   └── db.js          # Database connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── taskController.js  # Task CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── models/
│   │   ├── User.js        # User schema
│   │   └── Task.js        # Task schema
│   ├── routes/
│   │   ├── authRoutes.js  # Authentication routes
│   │   └── taskRoutes.js  # Task routes
│   ├── .env               # Backend environment variables
│   ├── package.json       # Backend dependencies
│   └── server.js          # Main server file
└── README.md              # Project documentation
```
