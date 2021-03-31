const router = require('express').Router();
const controller = require('../controllers/req.controller');

const { isLoggedIn } = require('../lib/auth');

router.use(isLoggedIn);

router.get('/',controller.list);
router.post('/add',controller.add);

module.exports = router;