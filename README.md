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
- **Daisy-UI** – UI components and stylling
- **Tailwindcss** – For css inline-stylling

### **Backend**
- **Node.js & Express.js** – Server runtime and Web API framework
- **MongoDB & Mongoose** – NoSQL database and ODM schema definitions
- **socket.io** – Real-time server event broadcasting trigger
- **CORS & dotenv** – Cross-Origin Resource Sharing and environment management

---

## ⚙️ Prerequisites & Environment Setup

### Prerequisites
Ensure you have installed:
- [Node.js](https://nodejs.org/) (v14.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0 or higher)
- A **MongoDB** instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database connection string
- A [Cloudinary](https://cloudinary.com/) account for media storage app credentials

---

### Environment Variables

#### Backend Environment Configuration (`/server/.env`)
Create a `.env` file in the `server` directory with the following variables:

```env
NODE_ENV=node_environment -- development || production
PORT=your_port_number

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=your_jwt_expiration_duration

DB_URL=mongodbyour_mongodb_url -- can be local or cloud

CLOUDINARY_CLOUD_NAME=couldinary_name
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_secret

SECRET_KEY=your_secret_key -- for_message_encryption_decryption