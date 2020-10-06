const router = require('express').Router();
const controller = require('../controllers/prof.controller');

router.get('/signin',controller.signin);
router.get('/signup',controller.signin);
router.get('/logout',controller.signout);

module.exports = router;
