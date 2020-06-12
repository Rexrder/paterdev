const router = require('express').Router();
const controller = require('../controllers/controller');

router.get('/',controller.list);
router.get('/delete/:id',controller.delete);
router.post('/add',controller.add);
router.get('/*',controller.redirect);

module.exports = router;
