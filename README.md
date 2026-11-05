# Student Directory System

## Project Description

The Student Directory System is a web application built using React that allows authenticated users to access student information from a backend REST API.

The application uses JWT (JSON Web Token) authentication to protect access to student records. Users can register, log in, view the student directory, and log out securely.

## Technologies Used

**Frontend:**
- React.js
- Vite
- React Router DOM
- JavaScript
- CSS

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

## Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Student Directory
- Authorization Header for API Requests
- Logout Functionality
- Responsive User Interface

## Project Structure

```text
student-directory-frontend/
├── screenshots/
│   ├── 01-login-page.png
│   ├── 02-register-page.png
│   ├── 03-successful-login.png
│   ├── 04-failed-login.png
│   ├── 05-protected-route.png
│   └── 06-network-authorization.png
│   └── 07-protected-route-after-logout.png
│   └── 08-login-after-logout.png
│   └── 09-new-account-registration-login.png
│   └── 09-10-duplicate-email-registration.png

├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Install Frontend Dependencies

```bash
cd student-directory-frontend
npm install
```

### 3. Start the Backend Server

Open the backend project folder in a separate terminal and install its dependencies:

```bash
npm install
```

Create a `.env` file in the backend folder with your own MongoDB connection string, port, and JWT secret. Do not upload this file to GitHub.

Start the backend:

```bash
node server.js
```

The backend should run at:

```text
http://localhost:3000
```

### 4. Start the React Frontend

In the frontend terminal, run:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:5173
```

Make sure both the backend and frontend servers are running.

## Screenshots

The following screenshots demonstrate the application's functionality:

1. **Login Page** – Displays the user login form.
2. **Register Page** – Displays the account registration form.
3. **Successful Login** – Shows the student directory after successful authentication.
4. **Failed Login** – Demonstrates the error message for invalid credentials.
5. **Protected Route** – Demonstrates redirection to the login page when an unauthenticated user accesses a protected page.
6. **Network Authorization** – Shows the Authorization header included in the student API request.

All screenshots are available in the `screenshots/` folder.

## Reflection Questions

### 1. Why do we store the token in `localStorage`? What is one security risk of doing so, and what is a more secure alternative?

We store the JWT in `localStorage` so the application can keep the user authenticated even after refreshing the page. It also makes the token accessible to different components that need to send authenticated API requests. However, one security risk is that malicious JavaScript from a Cross-Site Scripting (XSS) attack could access and steal the token. A more secure alternative is using HttpOnly, Secure, and SameSite cookies because JavaScript cannot directly access HttpOnly cookies.

### 2. What is the purpose of the `AuthContext`? Why not just pass the token as a prop to each component?

The purpose of `AuthContext` is to manage and share authentication information across the application. It provides access to the user, token, login function, and logout function. Without it, we would need to pass authentication data through multiple components using props. Using Context makes the code cleaner and easier to maintain.

### 3. What happens on the frontend when the JWT expires? Describe the user experience you would want to implement.

When the JWT expires, the backend rejects requests that require authentication. The frontend should detect the unauthorized response and clear the expired token from localStorage. The user should receive a message explaining that their session has expired and be redirected to the login page. After logging in again, the user can access the protected pages.

### 4. What is the difference between the backend's `requireAuth` middleware (from Lesson 5) and the frontend's `ProtectedRoute` component? Why do we need both?

The backend's `requireAuth` middleware checks and verifies the JWT before allowing access to protected API endpoints. The frontend's `ProtectedRoute` component checks whether the user is authenticated before displaying protected pages. We need both because frontend protection controls page navigation, while backend middleware protects the actual data and API resources. Using both provides better security for the application.

---

## Author

**Student Directory System**  
Developed as part of the React Frontend and JWT Authentication laboratory activity.
