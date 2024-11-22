import express from 'express';
import multer from 'multer';
import { upload } from '../middleware/multer.middleware.js';
import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
} from '../controllers/card.controller.js';

const router = express.Router();

// Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'), // Adjust path as needed
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });



// Routes
router.post('/create',   upload.fields([
    {
        name: 'image', // Image field name
        maxCount: 1,    // Maximum number of files allowed
    },
]), createListing); // Create
router.get('/', getAllListings); // Read all
router.get('/:id', getListingById); // Read one
router.put('/:id',   upload.fields([
    {
        name: 'cardimage', // Image field name
        maxCount: 1,    // Maximum number of files allowed
    },
]), updateListing); // Update
router.delete('/:id', deleteListing); // Delete

export default router;
