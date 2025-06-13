# School Management System

A comprehensive school management system built with MERN stack (MongoDB, Express.js, React, Node.js) designed to handle various school operations efficiently.

## 🚀 Tech Stack

### Frontend
- **React** with Vite for fast development
- **TailwindCSS** for styling
- **JavaScript** (ES6+)
- **React Router** for navigation
- **Axios** for API calls
- **React Hook Form** for form handling
- **React Query** for state management

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Nodemailer** for email services
- **Multer** for file uploads
- **Cors** for cross-origin requests

## 📁 Project Structure

```
school-management-system/
├── frontend/                 # React Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── context/        # React contexts
│   │   └── assets/         # Static assets
│   └── public/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Configuration files
│   └── uploads/            # File uploads
└── mobile/                 # Future React Native app
```

## 🎯 Modules

### Phase 1: Authentication & Authorization
- [x] User registration and login
- [x] Role-based access control (Admin, Teacher, Student, Parent)
- [x] JWT token management
- [x] Password reset functionality
- [x] Email verification
- [x] Profile management

### Future Modules
- Student Management
- Teacher Management
- Course Management
- Attendance System
- Grade Management
- Parent Portal
- Notification System
- Reports & Analytics

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/school-management
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=http://localhost:5173
```

## 🚀 Getting Started

1. Clone the repository
2. Set up backend (see Backend Setup)
3. Set up frontend (see Frontend Setup)
4. Access the application at `http://localhost:5173`

## 👥 User Roles

- **Super Admin**: Full system access
- **Admin**: School-wide management
- **Teacher**: Class and student management
- **Student**: Personal dashboard and resources
- **Parent**: Child's academic information

## 📱 Future Mobile App

This project is structured to support a future React Native mobile application, allowing students, parents, and teachers to access the system on mobile devices.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License. 