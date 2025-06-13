# School Management System - Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

## Quick Start

### 1. Clone and Setup Backend
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# Required variables:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (generate a secure random string)
# - EMAIL_USER and EMAIL_PASS (for email functionality)
```

### 2. Setup Frontend
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 3. Start the Application

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
Server will start on http://localhost:5000

#### Terminal 2 - Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will start on http://localhost:5173

### 4. Access the Application
Open your browser and navigate to http://localhost:5173

## Environment Configuration

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/school-management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=http://localhost:5173
```

### MongoDB Setup Options

#### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/school-management`

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Get connection string and replace in .env

## Default Test Users
After starting the application, you can register new users or use these demo credentials (if seeded):

- **Admin**: admin@school.com / password123
- **Teacher**: teacher@school.com / password123  
- **Student**: student@school.com / password123

## Features Available
✅ User Authentication (Login/Register)
✅ Role-based Access Control
✅ Dashboard (Role-specific views)
✅ User Profile Management
✅ Responsive Design

## Next Steps
- Add student management module
- Implement course management
- Add attendance tracking
- Create grade management system
- Build notification system

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env
   - Verify network access for MongoDB Atlas

2. **Port Already in Use**
   - Change PORT in backend .env file
   - Update proxy in frontend vite.config.js

3. **Email Not Working**
   - Configure EMAIL_USER and EMAIL_PASS
   - For Gmail, use App Password instead of regular password

## Development Commands

### Backend
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Project Structure
```
school-management-system/
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── utils/          # Utility functions
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   └── context/        # React contexts
│   └── package.json
└── README.md
```

## Support
For issues and questions, please check the README.md file or create an issue in the repository. 