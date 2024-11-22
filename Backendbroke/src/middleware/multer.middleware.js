import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the directory exists
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using UUID and preserve the file extension
    const uniqueSuffix = `${uuidv4()}-${Date.now()}`;
    const fileExtension = file.originalname.split('.').pop(); // Extract the file extension
    cb(null, `${uniqueSuffix}.${fileExtension}`); // Save file with a unique name
  },
});

export const upload = multer({ storage });
