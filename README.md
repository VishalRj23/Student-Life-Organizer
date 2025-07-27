# 🎓 Student Life Organizer

A full-stack web application designed to help college students organize their academic lives — from managing tasks and tracking goals to logging moods and planning exams. Everything is neatly visualized in a clean dashboard with performance summaries.

---

## 🚀 Features

- ✅ **User Authentication** (Register & Login)
- 📋 **Task Manager** – Add, view, and delete personal tasks
- 🎯 **Goal Tracker** – Track short- and long-term academic goals
- 😊 **Mood Logger** – Log your daily mood and see weekly/monthly patterns
- 📅 **Exam Planner** – Schedule exams and manage study timelines *(coming soon)*
- 📈 **Dashboard** – Weekly overview with visual analytics
- 📊 **Productivity Reports** – Weekly performance summaries

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Context API (for authentication state)
- CSS / Tailwind CSS *(optional for styling)*

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- dotenv

---

## 📁 Project Folder Structure

student-life-organizer/
├── client/ # Frontend React App
│ ├── public/
│ └── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route pages (Dashboard, Tasks, Goals, etc.)
│ ├── context/ # AuthContext Provider
│ ├── App.jsx
│ ├── index.js
│ └── styles/
├── server/ # Backend API
│ ├── controllers/ # Logic for routes
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes (auth, tasks, moods, goals)
│ ├── middleware/ # JWT auth middleware
│ ├── config/ # MongoDB connection
│ ├── .env # Environment variables
│ └── server.js # Entry point
├── .gitignore
├── README.md
├── package.json
└── package-lock.json


✅ How to Run the Project Locally
Clone the Repository

Open your terminal and run:

git clone https://github.com/your-username/student-life-organizer.git
cd student-life-organizer

Setup Backend

Navigate to the server folder:

cd server

Install backend dependencies:

npm install

Create a .env file inside the server directory and add the following:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

Start the backend server:

npm run dev

The backend will start at:
http://localhost:5000

Setup Frontend

Go to the client folder:

cd ../client

Install frontend dependencies:

npm install

Start the React frontend:

npm start

The frontend will start at:
http://localhost:3000
