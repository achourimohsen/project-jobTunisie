const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');


//auth routes
// /api/signup
router.post('/sign-up', signup);
// /api/signin
router.post('/sign-in', signin);
// /api/logout
router.get('/log-out', logout);
// /api/me
router.get('/my-profile', isAuthenticated, userProfile);

module.exports = router
