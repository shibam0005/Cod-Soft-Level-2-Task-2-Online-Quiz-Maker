# Online Quiz Maker

A full-stack web application that allows users to create, browse, and take quizzes. Users can register/login, create quizzes with multiple-choice questions, and view results immediately. The app is responsive and works on desktop and mobile.

## Features

- Home page with navigation to create or take quizzes
- Quiz creation form with support for multiple questions and options
- Quiz listing for all available quizzes
- Quiz taking interface showing one question at a time and scoring
- Result page displaying score and correct answers
- User authentication (register/login) with JWT
- Mobile responsive using Bootstrap

## Technology Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **Frontend**: React, React Router v6, Bootstrap, Axios

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- MongoDB running locally or connection string

### Backend (server)

1. Navigate to the server folder:
   ```bash
   cd "c:\Users\shibam\Desktop\Online Quiz Maker\server"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (optional):
   - `MONGO_URI` – MongoDB connection URI (default: `mongodb://localhost:27017/quizmaker`)
   - `JWT_SECRET` – Secret key for signing tokens
4. Start the server in development mode:
   ```bash
   npm run dev
   ```

### Frontend (client)

1. Open a new terminal and go to the client folder:
   ```bash
   cd "c:\Users\shibam\Desktop\Online Quiz Maker\client"
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. (Optional) set API base URL in `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The frontend will open at [http://localhost:3000](http://localhost:3000).

## Notes

- The backend must be running to provide API endpoints for the React app.
- Authentication token is stored in `localStorage` and sent in the header.
- The design uses Bootstrap for responsiveness; feel free to swap Tailwind or custom CSS.

