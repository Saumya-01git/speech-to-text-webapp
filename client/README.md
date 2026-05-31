# 🎤 SpeechAI - AI Powered Speech-to-Text Web Application

## 🚀 Live Demo

🌐 Frontend (Vercel)
https://speech-to-text-webapp-roan.vercel.app

⚙️ Backend (Render)
https://speech-to-text-webapp.onrender.com

📂 GitHub Repository
https://github.com/Saumya-01git/speech-to-text-webapp

---

# 📌 Overview

SpeechAI is a full-stack AI-powered Speech-to-Text web application that enables users to upload audio files, record voice, perform live speech recognition, and securely manage transcription history.

The application integrates modern authentication, cloud deployment, and speech recognition services to provide a seamless transcription experience.

---

# ✨ Features

## 🔐 Authentication

* User Registration (Signup)
* User Login
* Email Verification
* Forgot Password
* Password Reset
* Password Visibility Toggle
* Secure Authentication with Supabase

## 🎙 Speech-to-Text

* Upload Audio Files
* Record Audio from Microphone
* Live Speech Recognition
* AI-Powered Speech Transcription
* Real-Time Speech Processing

## 📜 History Management

* Save Transcriptions to Database
* View Previous Transcriptions
* Delete Individual Records
* Clear Complete History
* User-Specific History Storage

## 🎨 User Experience

* Modern Glassmorphism UI
* Dark Mode / Light Mode
* Responsive Design
* Loading Indicators
* Friendly Error Messages
* Smooth Animations

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Icons

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Multer

## Authentication

* Supabase Authentication

## AI & Speech Processing

* Deepgram Speech-to-Text API
* Web Speech API (Live Recognition)

## Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)
* Supabase (Authentication)

---

# 📂 Project Structure

```text
speech-to-text-webapp
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── App.jsx
│   │   ├── supabaseClient.js
│   │   └── main.jsx
│   │
│   └── .env
│
├── backend
│   ├── config
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── .env
│
└── README.md
```

---

# ⚙️ Local Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Saumya-01git/speech-to-text-webapp.git

cd speech-to-text-webapp
```

---

## 2️⃣ Frontend Setup

```bash
cd client

npm install

npm run dev
```

### Frontend Environment Variables

Create:

```env
client/.env
```

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL

VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

VITE_API_URL=http://localhost:5000
```

---

## 3️⃣ Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Backend Environment Variables

Create:

```env
backend/.env
```

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

DEEPGRAM_API_KEY=YOUR_DEEPGRAM_API_KEY
```

---

# 🔌 API Endpoints

## Transcribe Audio

```http
POST /transcribe
```

Converts uploaded audio into text using Deepgram.

---

## Get User History

```http
GET /history?userId=<USER_ID>
```

Returns all transcription records for a user.

---

## Delete One History Record

```http
DELETE /history/:id?userId=<USER_ID>
```

Deletes a specific transcription.

---

## Clear Entire History

```http
DELETE /history?userId=<USER_ID>
```

Deletes all transcription records of the user.

---

# ☁️ Deployment

## Backend Deployment (Render)

Configuration:

```text
Root Directory: backend

Build Command: npm install

Start Command: npm start
```

Environment Variables:

```env
MONGO_URI

DEEPGRAM_API_KEY
```

---

## Frontend Deployment (Vercel)

Configuration:

```text
Framework: Vite

Root Directory: client

Build Command: npm run build

Output Directory: dist
```

Environment Variables:

```env
VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

VITE_API_URL
```

---

## Supabase Configuration

### Site URL

```text
https://speech-to-text-webapp-roan.vercel.app
```

### Redirect URLs

```text
https://speech-to-text-webapp-roan.vercel.app/**

http://localhost:5173/**
```

---

# 📸 Application Workflow

1. User creates an account.
2. User verifies email.
3. User logs into SpeechAI.
4. User uploads audio or records speech.
5. Audio is processed using Deepgram.
6. Transcribed text is displayed.
7. Transcription is stored in MongoDB.
8. User can view, copy, delete, or clear history.

---

# 🎯 Key Learning Outcomes

* Full-Stack MERN Development
* Authentication with Supabase
* API Integration
* MongoDB Database Management
* Cloud Deployment
* Environment Variable Management
* Speech Recognition Technologies
* Responsive UI Design
* State Management in React

---


# 👨‍💻 Author

**Saumya**

SpeechAI – AI Powered Speech-to-Text Web Application 🚀

