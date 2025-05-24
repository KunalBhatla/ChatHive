const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  const userSockets = new Map();
  const userActivities = new Map();

  io.use((socket, next) => {
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
  });

  io.on("connection", (socket) => {
    console.log("Bitch connected ->", socket.id);
    const userId = socket.userId;

    console.log("✅ User connected ->", userId, "| socket ID:", socket.id);

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

    userSockets.set(userId, socket.id);

    io.emit("user_connected", userId);

    socket.on("disconnect", () => {
      console.log("❌ User disconnected ->", userId, "| socket ID:", socket.id);

      userSockets.delete(userId);
      userActivities.delete(userId);
      io.emit("user_disconnected", userId);
    });
  });
};

module.exports = {
  initializeSocket,
};
