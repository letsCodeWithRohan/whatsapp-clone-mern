# 💬 WhatsApp Clone (MERN Stack)

A real-time full-stack web application replicating key features of WhatsApp Web, built using MongoDB, Express.js, React.js, and Node.js (MERN), featuring real-time messaging powered by Pusher WebSockets.

---

## 🚀 Key Highlights & Features

- **Real-Time Synchronization**: Instant message delivery across active clients without page reloads using Pusher WebSockets.
- **Persistent Storage**: All chat histories, timestamps, and user message details are stored in MongoDB.
- **RESTful API**: Clean Express backend API for fetching and posting messages.
- **Modern UI**: Styled after WhatsApp Web using React and Material-UI (MUI) components.

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js** – Client-side UI framework
- **Axios** – HTTP client for API requests
- **Material-UI (MUI)** – UI components and icons
- **Pusher-js** – Real-time event listening on the client

### **Backend**
- **Node.js & Express.js** – Server runtime and Web API framework
- **MongoDB & Mongoose** – NoSQL database and ODM schema definitions
- **Pusher** – Real-time server event broadcasting trigger
- **CORS & dotenv** – Cross-Origin Resource Sharing and environment management

---

## ⚙️ Prerequisites & Environment Setup

### Prerequisites
Ensure you have installed:
- [Node.js](https://nodejs.org/) (v14.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0 or higher)
- A **MongoDB** instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database connection string
- A [Pusher Channels](https://pusher.com/) account for real-time app credentials

---

### Environment Variables

#### Backend Environment Configuration (`/server/.env`)
Create a `.env` file in the `server` directory with the following variables:

```env
PORT=9000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/whatsappdb?retryWrites=true&w=majority
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster
