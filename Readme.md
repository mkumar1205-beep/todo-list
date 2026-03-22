#  Todo App 

This is a full-stack Todo application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to securely manage their daily tasks through a clean and responsive interface.

Users can register and log in to their accounts, after which they can create, update, delete, and organize their personal todos. Each task can be assigned a priority level (low, medium, high) and marked as completed or active, making it easier to manage workload efficiently.

---

##  Features

*  User authentication with JWT
*  Create, read, update, and delete todos
*  Set priority levels (Low, Medium, High)
*  Filter todos by status (All, Active, Completed)
*  Protected routes (user-specific data)
*  Input validation (frontend + backend)

---

##  Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JSON Web Tokens (JWT)
* bcryptjs
* Joi Validation
* CORS

### Frontend

* React (Vite)
* React Router DOM
* Axios

---

##  Project Structure

```
todo-list/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── src/
    └── index.html
```

---

##  Getting Started

### 🔹 Prerequisites

* Node.js installed
* MongoDB Atlas account

---

###  Backend Setup

```bash
git clone https://github.com/YOUR_USERNAME/todo-list.git
cd todo-list/backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

Run backend:

```bash
npm run dev
```

Backend runs on: http://localhost:5000

---

###  Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

---

##  API Base URL

```
http://localhost:5000/api
```

---

##  API Endpoints

### Auth Routes

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | /auth/register | Register a new user |
| POST   | /auth/login    | Login user          |

---

### Todo Routes

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| GET    | /todos     | Get all todos     |
| GET    | /todos/:id | Get a single todo |
| POST   | /todos     | Create a todo     |
| PUT    | /todos/:id | Update a todo     |
| DELETE | /todos/:id | Delete a todo     |

---

## 🔎 Query Parameters

* `?completed=true`
* `?priority=high`

---

##  Environment Variables

| Variable   | Description               |
| ---------- | ------------------------- |
| PORT       | Backend server port       |
| MONGO_URI  | MongoDB connection string |
| JWT_SECRET | Secret key for JWT        |
| JWT_EXPIRE | Token expiry duration     |

---

##  Deployment

* Frontend: Vercel / Netlify
* Backend: Render / Railway

---

##  What I Learned

* Building REST APIs with Node.js and Express
* MongoDB integration using Mongoose
* Authentication with JWT and bcrypt
* Input validation using Joi
* React hooks and routing
* Connecting frontend and backend
* Version control using Git and GitHub

---

##  Contributing

Contributions are welcome!
Feel free to fork this repository and submit a pull request.

---

##  Author

**Manya Kumar**
GitHub: https://github.com/mkumar1205-beep
