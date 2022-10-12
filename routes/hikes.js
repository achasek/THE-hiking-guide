var express = require('express');
var router = express.Router();

const isLoggedIn = require('../config/auth');
const hikes = require('../controllers/hikes');
const hikesCtrl = require('../controllers/hikes');

router.get('/', hikesCtrl.index);
router.get('/new', isLoggedIn, hikesCtrl.new);
router.post('/', isLoggedIn, hikesCtrl.create);
router.get('/:id', hikesCtrl.show);
router.delete('/:id', isLoggedIn, hikesCtrl.delete);
router.get('/:id/edit', isLoggedIn, hikesCtrl.edit);
router.put('/:id', isLoggedIn, hikesCtrl.update);

module.exports = router;
