# GlobalTNA - Mini Service Request Board

A full-stack web application built for the GlobalTNA Full-Stack Developer Intern technical assessment. This application allows homeowners to post service requests and tradespeople to view and update them.

## Tech Stack
* **Frontend:** Next.js (App Router), Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/globaltna-service-board.git
cd globaltna-service-board
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## Environment Variables (.env) Setup

You need to configure the environment variables for the backend to connect to the database.

1. Navigate to the `backend` directory.
2. Create a new file named `.env`.
3. Add the following lines to the `.env` file:

```env
PORT=5000
MONGO_URI=""
```
*(Note: If you are using MongoDB Atlas, replace the `MONGO_URI` value with your actual connection string).*

## Run Instructions

You need to run the backend and frontend concurrently in two separate terminal windows.

### 1. Start the Backend API
Open your first terminal, navigate to the `backend` folder, and start the server:
```bash
cd backend
npm run dev
```
*The backend API will start running on http://localhost:5000*

### 2. Start the Frontend Application
Open a second terminal, navigate to the `frontend` folder, and start the Next.js app:
```bash
cd frontend
npm run dev
```
*The frontend application will start running on http://localhost:3000*

## Features Implemented
* **Home Page:** Lists all job requests with a category filter dropdown.
* **New Job Form:** Allows users to create a new request with client-side validation.
* **Job Detail Page:** Displays full details, allows status updates, and includes a delete button.
* **Global Error Handling:** Includes a custom 404 page for missing resources.
```

