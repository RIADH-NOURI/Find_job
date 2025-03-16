import multer from "multer";
import fs from "fs";
import path from "path";
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir ); // Temporary storage
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Invalid file type. Only images are allowed!'), false); 
  }
};

export const uploadMiddleware = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 10 * 1024 * 1024 }, 
}).single('image');
