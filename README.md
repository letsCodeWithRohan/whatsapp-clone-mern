# 💬 WhatsApp Clone (MERN Stack)

A real-time full-stack web application replicating key features of WhatsApp, built using MongoDB, Express.js, React.js, and Node.js (MERN), featuring real-time messaging powered by Pusher / WebSockets.

---

## 🚀 Features

- **Real-Time Messaging**: Send and receive instant messages across client sessions.
- **User Authentication**: Secure user login and registration.
- **Chat Interface**: Sidebar displaying active chats and a main messaging window styled after WhatsApp Web.
- **Database Persistence**: Automatic storage of chat history and user details in MongoDB.
- **Responsive UI**: Clean UI built with React and modern CSS / Material UI components.

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js** – UI Framework
- **Context API / Redux** – State Management
- **Axios** – HTTP Client
- **Material-UI (MUI)** – UI Components & Icons

### **Backend**
- **Node.js & Express.js** – Backend Server & REST API
- **MongoDB & Mongoose** – Database & ODM
- **Pusher / Socket.io** – Real-time event subscription

---

## 📂 Repository Structure

```text
whatsapp-clone-mern/
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/  # Chat, Sidebar, Login, etc.
│   │   ├── axios.js     # Base Axios configuration
│   │   └── App.js
│   └── package.json
├── server/          # Node.js & Express backend API
│   ├── dbMessages.js # Mongoose schema for messages
│   ├── server.js     # Entry point & API routes
│   └── package.json
└── README.md
