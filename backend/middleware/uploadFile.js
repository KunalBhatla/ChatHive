const multer = require("multer");
const fs = require("fs");
const path = require("path");

const getUploadPath = (uploadPath) => {
  return path.join(__dirname, `../public/${uploadPath}`);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = null;
    const fileName = file.fieldname;
    switch (fileName) {
      case "profile":
        uploadPath = "profiles";
        break;
      default:
        console.log("Name doesn't match");
    }
    fs.mkdirSync(getUploadPath(uploadPath), { recursive: true });
    cb(null, getUploadPath(uploadPath));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});

module.exports = uploadImage;
