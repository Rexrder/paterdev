const router = require('express').Router();
const controller = require('../controllers/list.controller');

const { isLoggedIn } = require('../lib/auth');

router.use(isLoggedIn);

router.get('/',controller.list);
router.get('/delete/:id',controller.delete);
router.get('/edit/:id',controller.renderEdit);
router.post('/edit/:id',controller.edit);
router.post('/add',controller.add);

module.exports = router;
