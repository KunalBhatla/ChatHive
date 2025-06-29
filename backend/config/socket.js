const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

let io = null;
const userSockets = new Map();

const validateUserForSocket = (socket, next) => {
  const token = socket.handshake.auth?.authToken;
  if (!token) {
    return next(new Error("Authentication failed: Token missing"));
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    socket.userId = decoded.id;
    next();
  } catch (err) {
    return next(new Error("Authentication failed: Invalid token"));
  }
};

const getIOWithOnlineUsers = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return { io, onlineUsers: userSockets };
};

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  const userActivities = new Map();

  io.use(validateUserForSocket);

  io.on("connection", (socket) => {
    const userId = socket.userId;

    userSockets.set(userId, socket.id);

    //Emit for the online users
    io.emit("getOnlineUsers", [...userSockets.keys()]);

    socket.on("disconnect", () => {
      console.log("❌ User disconnected ->", userId, "| socket ID:", socket.id);

      const userSocketSet = userSockets.get(userId);
      if (userSocketSet) {
        if (userSockets.delete(userId)) {
          io.emit("getOnlineUsers", [...userSockets.keys()]);
        }
      }
    });
    console.log("userSockets ->", userSockets);
  });
};

module.exports = {
  initializeSocket,
  getIOWithOnlineUsers,
};

// socket.on("disconnect", () => {
//   console.log("Bitch disconnected ->", socket.id);
//   let disconnectedUserId;
//   for (const [userId, socketId] of userSockets.entries()) {
//     if (socketId === socket.id) {
//       disconnectedUserId = userId;
//       userSockets.delete(userId);
//       userActivities.delete(userId);
//       break;
//     }
//   }

//   if (disconnectedUserId) {
//     io.emit("user_disconnected", disconnectedUserId);
//   }
// });
