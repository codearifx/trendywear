const express = require('express');
const router = express.Router();
const { loginUser, registerUser, toggleLike, getLikes, deleteAccount } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile/likes/:id', protect, toggleLike);
router.get('/profile/likes', protect, getLikes);
router.delete('/profile', protect, deleteAccount);

module.exports = router;
