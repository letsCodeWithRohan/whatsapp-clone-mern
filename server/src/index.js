const express = require('express');
const morgan = require("morgan")
const { createServer } = require("http")
const connectDB = require('./config/connectDB');
const { Server } = require('socket.io')
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const messageRoutes = require('./routes/message.route')
const devRoutes = require("./routes/dev.route")
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors')
// Load environment variables from .env file
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your React app's origin
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Connect to MongoDB
connectDB();

// Map of userId -> socketId
const onlineUsers = {}

io.on('connection', (socket) => {

  socket.on('user-connected', (userId) => {
    onlineUsers[userId] = socket.id
    io.emit('update-user-status', Object.keys(onlineUsers))
  })

  socket.on("message-sent",({senderId,message,receiverId}) => {
    socket.to(onlineUsers[receiverId]).emit("receive-message",message)
  })

  socket.on('disconnect', () => {
    let disconnectedUserId = null

    for (const [userId, sId] of Object.entries(onlineUsers)) {
      if (sId === socket.id) {
        disconnectedUserId = userId
        delete onlineUsers[userId]
        break
      }
    }

    io.emit('update-user-status', Object.keys(onlineUsers))
  })

})

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true // ⬅️ allow cookies to be sent
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// User routes
app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/dev",devRoutes);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});