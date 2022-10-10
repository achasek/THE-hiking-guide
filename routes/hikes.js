var express = require('express');
var router = express.Router();

const hikesCtrl = require('../controllers/hikes');

router.get('/', hikesCtrl.index);
router.get('/new', hikesCtrl.new);
router.post('/', hikesCtrl.create);
router.get('/:id', hikesCtrl.show);

module.exports = router;
