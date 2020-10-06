const router = require('express').Router();
const controller = require('../controllers/list.controller');

router.get('/',controller.mainp);
router.get('/objlist',controller.list);
router.get('/objlist/delete/:id',controller.delete);
router.post('/objlist/add',controller.add);
router.get('/*',controller.redirect);

module.exports = router;
