const express = require('express');
const router = express.Router();


const {
    registerUser,
    loginUser,
    getUserProfile
} = require('../controllers/user.controller');

const protect = require('../middlewares/auth.middleware');


router.post('/register', registerUser);
router.post('/login', loginUser);

// using middleware in get user profile 
router.get('/profile', protect, getUserProfile);

module.exports = router;