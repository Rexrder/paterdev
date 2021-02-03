const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.get('/',controller.mainp);

router.get('/signin',controller.renderSignIn);
router.post('/signin', controller.signIn);

router.get('/signup',controller.renderSignUp);
router.post('/signup', controller.signUp);

router.get('/logout',controller.logout);

module.exports = router;
