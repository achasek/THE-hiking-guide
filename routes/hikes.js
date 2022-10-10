var express = require('express');
var router = express.Router();

const isLoggedIn = require('../config/auth');
const hikesCtrl = require('../controllers/hikes');

router.get('/', hikesCtrl.index);
router.get('/new', isLoggedIn, hikesCtrl.new);
router.post('/', isLoggedIn, hikesCtrl.create);
router.get('/:id', hikesCtrl.show);
router.delete('/:id', isLoggedIn, hikesCtrl.delete);

module.exports = router;
