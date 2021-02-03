const router = require('express').Router();
const controller = require('../controllers/list.controller');

const { isLoggedIn } = require('../lib/auth');

router.use(isLoggedIn);

router.get('/objlist',controller.list);
router.get('/objlist/delete/:id',controller.delete);
router.post('/objlist/add',controller.add);
router.get('/*',controller.redirect);

module.exports = router;
