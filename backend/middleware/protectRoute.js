const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
  try {
    const authHeader = req.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid or expired token", error: err.message });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while verifying the token",
      error: error.message,
    });
  }
};

module.exports = protectRoute;
