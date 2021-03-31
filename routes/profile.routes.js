const router = require('express').Router();
const controller = require('../controllers/profile.controller');

const { isLoggedIn } = require('../lib/auth');

router.use(isLoggedIn);

router.get('/', controller.renderUserProfile);
router.get('/delete', controller.deleteUserProfile);
router.post('/edit', controller.editAccount);

module.exports = router;