import { Router } from 'express';
import { registerUser, loginUser, logOutUser, refreshAccessToken } from '../controllers/user.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

// Route to register a user (with avatar upload)
router.post(
    '/register',
    upload.fields([
        {
            name: 'avatar', // Image field name
            maxCount: 1,    // Maximum number of files allowed
        },
    ]),
    registerUser
);

// Additional routes for user functionality
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logOutUser); // Logout requires JWT verification
router.get('/refresh-token', refreshAccessToken);

export default router;
