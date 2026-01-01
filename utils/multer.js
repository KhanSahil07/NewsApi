// utils/multer.js
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only jpg, jpeg, png allowed"), false);
};

export const upload = multer({ storage, fileFilter });
