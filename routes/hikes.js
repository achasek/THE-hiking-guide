var express = require('express');
var router = express.Router();

const hikesCtrl = require('../controllers/hikes');

router.get('/', hikesCtrl.index);

module.exports = router;
