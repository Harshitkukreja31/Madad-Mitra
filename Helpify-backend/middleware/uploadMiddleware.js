// Import required modules
import multer from 'multer';
import path from 'path';

// Configure disk storage for file uploads
const storage = multer.diskStorage({
  // Specify destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles');
  },
  
  // Generate unique filename for each upload
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File type validation middleware
const fileFilter = (req, file, cb) => {
  // Define allowed image mime types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  // Check if uploaded file type is allowed
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error('Invalid file type'), false);  // Reject the file
  }
};

// Create multer upload configuration
const upload = multer({
  storage: storage,        // Use the configured disk storage
  fileFilter: fileFilter,  // Apply file type validation
  limits: { 
    fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
  }
});

// Export the configured upload middleware
export default upload;