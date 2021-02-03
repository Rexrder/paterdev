const router = require('express').Router();
const controller = require('../controllers/profile.controller');

const { isLoggedIn } = require('../lib/auth');

router.get('/profile', isLoggedIn, controller.renderUserProfile);

module.exports = router;