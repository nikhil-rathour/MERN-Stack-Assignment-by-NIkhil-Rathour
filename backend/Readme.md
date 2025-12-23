# Task Management Backend API

RESTful API for task management with user authentication built with Node.js, Express.js, and MongoDB.

## Features

- User registration and login
- JWT authentication
- Task CRUD operations
- User-specific tasks

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Auth**: JWT, bcryptjs
- **Dev Tools**: nodemon

## Quick Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment variables** (`.env`):
   ```env
   MONGO_URI=mongodb://localhost:27017/taskmanagement
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. **Start server**:
   ```bash
   npm run dev    # Development with auto-restart
   npm start      # Production
   ```

## API Endpoints

### Base URL: `http://localhost:5000`

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "jwt_token_here"
}
```

### Tasks (Requires Authentication)

> **Header**: `Authorization: Bearer <jwt_token>`

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Task title",
  "description": "Task description",
  "status": "pending"
}
```

#### Get All Tasks
```http
GET /tasks
Authorization: Bearer <token>
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

## Data Models

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed)
}
```

### Task
```javascript
{
  title: String (required),
  description: String,
  status: String (default: "pending"),
  userId: ObjectId (required)
}
```

## Error Responses

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found (resource not found)
- `500` - Server Error

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── taskController.js  # Task CRUD operations
├── middleware/
│   └── authMiddleware.js  # JWT verification
├── models/
│   ├── User.js           # User schema
│   └── Task.js           # Task schema
├── routes/
│   ├── authRoutes.js     # Authentication routes
│   └── taskRoutes.js     # Task routes
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Dependencies and scripts
└── server.js            # Main server file
```

