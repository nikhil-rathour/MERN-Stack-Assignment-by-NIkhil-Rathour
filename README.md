# MERN Stack Task Management API

A full-stack task management application built with MongoDB, Express.js, React, and Node.js.

## Features

- User authentication (register/login)
- JWT-based authorization
- CRUD operations for tasks
- User-specific task management
- RESTful API design

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Middleware**: CORS, Express JSON parser

## API Endpoints

### Base URL
```
http://localhost:5000
```

### Available APIs

1. **POST** `/auth/register` – Create user
2. **POST** `/auth/login` – Authenticate user and return JWT
3. **POST** `/tasks` – Create task (authenticated)
4. **GET** `/tasks` – Get tasks of logged-in user
5. **PUT** `/tasks/:id` – Update task
6. **DELETE** `/tasks/:id` – Delete task

### Authentication Endpoints

#### 1. Register User
- **POST** `/auth/register`
- **Description**: Create user
- **Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "password": "hashed_password"
}
```

#### 2. Login User
- **POST** `/auth/login`
- **Description**: Authenticate user and return JWT
- **Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**:
```json
{
  "token": "jwt_token_string"
}
```
- **Error Responses**:
  - `400`: User not found or invalid credentials

### Task Endpoints

> **Note**: All task endpoints require authentication. Include JWT token in Authorization header.

#### 3. Create Task
- **POST** `/tasks`
- **Description**: Create task (authenticated)
- **Headers**: `Authorization: jwt_token`
- **Request Body**:
```json
{
  "title": "string",
  "description": "string",
  "status": "string"
}
```
- **Response**:
```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "status": "pending",
  "userId": "user_id"
}
```

#### 4. Get All Tasks
- **GET** `/tasks`
- **Description**: Get tasks of logged-in user
- **Headers**: `Authorization: jwt_token`
- **Response**:
```json
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "status": "string",
    "userId": "user_id"
  }
]
```

#### 5. Update Task
- **PUT** `/tasks/:id`
- **Description**: Update task
- **Headers**: `Authorization: jwt_token`
- **Parameters**: `id` - Task ID
- **Request Body**:
```json
{
  "title": "string",
  "description": "string",
  "status": "string"
}
```
- **Response**:
```json
{
  "_id": "string",
  "title": "updated_title",
  "description": "updated_description",
  "status": "updated_status",
  "userId": "user_id"
}
```

#### 6. Delete Task
- **DELETE** `/tasks/:id`
- **Description**: Delete task
- **Headers**: `Authorization: jwt_token`
- **Parameters**: `id` - Task ID
- **Response**:
```json
{
  "msg": "Task deleted"
}
```

## Data Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Task Model
```javascript
{
  title: String,
  description: String,
  status: String (default: "pending"),
  userId: ObjectId (ref: "User")
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. Register or login to receive a JWT token
2. Include the token in the `Authorization` header for protected routes
3. Token contains the user ID for user-specific operations

## Error Handling

- **401 Unauthorized**: Missing or invalid JWT token
- **400 Bad Request**: Invalid credentials or user not found
- **500 Internal Server Error**: Server-side errors

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`:
   ```
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the server: `npm start`
5. Server runs on `http://localhost:5000`

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js   # Authentication logic
│   └── taskController.js   # Task CRUD operations
├── middleware/
│   └── authMiddleware.js   # JWT verification
├── models/
│   ├── User.js            # User schema
│   └── Task.js            # Task schema
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   └── taskRoutes.js      # Task routes
└── server.js              # Main server file
```
