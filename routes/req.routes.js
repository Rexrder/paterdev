const router = require('express').Router();
const controller = require('../controllers/req.controller');

const { isLoggedIn } = require('../lib/auth');

router.use(isLoggedIn);

router.get('/reqlist',controller.list);

module.exports = router;