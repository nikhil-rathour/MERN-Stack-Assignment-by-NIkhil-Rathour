# Task Management Frontend

A modern React frontend for the MERN Stack Task Management application built with React 19, Vite, and TailwindCSS.

## Features

- Modern React 19 with Vite for fast development
- Responsive UI with TailwindCSS
- User authentication (login/register)
- Protected routes
- Task CRUD operations
- Real-time task management
- Context-based state management
- Loading states and error handling

## Tech Stack

- **React 19**: Latest React version
- **Vite**: Fast build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Router DOM**: Client-side routing
- **ESLint**: Code linting

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.example`:
   ```
   VITE_DEPLOYED_BACKEND_URL=http://localhost:5000
   ```

3. Start development server:
   ```bash
   npm run dev
   ```



## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation component
│   ├── ProtectedRoute.jsx # Route protection
│   ├── Spinner.jsx     # Loading spinner
│   ├── TaskForm.jsx    # Task creation/edit form
│   └── TaskItem.jsx    # Individual task component
├── context/
│   └── AuthContext.jsx # Authentication context
├── pages/
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Login.jsx       # Login page
│   └── Register.jsx    # Registration page
├── services/
│   └── api.js          # API service functions
├── App.jsx             # Main app component
└── main.jsx            # App entry point
```

## Components

### Core Components
- **App.jsx**: Main application component with routing
- **Navbar.jsx**: Navigation with authentication status
- **ProtectedRoute.jsx**: Route wrapper for authenticated pages

### Task Components
- **TaskForm.jsx**: Form for creating and editing tasks
- **TaskItem.jsx**: Individual task display with actions
- **Spinner.jsx**: Loading indicator

### Pages
- **Login.jsx**: User authentication
- **Register.jsx**: User registration
- **Dashboard.jsx**: Main task management interface

## State Management

- **AuthContext**: Global authentication state using React Context
- Local component state for forms and UI interactions

## API Integration

- **api.js**: Centralized API calls using Axios
- Automatic JWT token handling
- Error handling and response formatting

