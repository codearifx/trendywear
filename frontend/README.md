# Trendy Collection 🛍️✨

Welcome to the **Trendy Collection** project! This is a modern, full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce application designed with a premium, futuristic "Anti-Gravity" UI featuring sleek dark modes, glassmorphism, and neon accents.

## 🚀 Features

### Frontend (React)
- **UI**: A highly responsive, dynamic interface focusing on dark theme aesthetics, modern typography, and smooth micro-animations.
- **Dynamic Shopping Flow**: Modern product listing page, fast one-page "Buy Now" checkout, and customized address flows.
- **Instagram-Style Reels**: Engaging vertical scrolling reels section for product discovery.
- **User Authentication**: Secure JWT-based login/signup flows distinguishing between new and returning users.
- **User Space**: Keep track of liked items, order history, and account settings.

### Backend (Node.js + Express + MongoDB)
- **Robust MVC Architecture**: Secure and scalable backend design.
- **Authentication API**: JWT implementation for secure routes and data.
- **Product & Order Management**: Comprehensive endpoints for retrieving products, managing stock, and handling orders.
- **Admin Roles**: Secure routes for administrators to manage inventory and user flows.

## 🛠️ Tech Stack

- **Frontend:** React.js, JavaScript, modern Vanilla CSS/Tailwind
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)

## 📁 Project Structure

This repository is primarily split into two main directories:

- `/frontend` - Contains the React user interface and application styling.
- `/backend` - Contains the Express APIs, application controllers, and MongoDB schema models.

## 🔧 Getting Started

### Prerequisites
- Node.js installed
- MongoDB database (local or Atlas)

### Installation

1. **Backend Setup:**
   Navigate to the backend directory, install dependencies, and start the server.
   ```bash
   cd backend
   npm install
   # Make sure to create a .env file with your PORT, MONGO_URI, and JWT_SECRET
   npm start
   ```

2. **Frontend Setup:**
   Navigate to the frontend directory, install dependencies, and start the development server.
   ```bash
   cd frontend
   npm install
   npm run dev  # or npm start
   ```

