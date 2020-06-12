const router = require('express').Router();
const controller = require('../controllers/controller')

router.get('/',controller.list)

module.exports = router;
