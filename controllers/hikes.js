const Hike = require('../models/hike');

module.exports = {
    index,
};

function index(req, res) {
    Hike.find({}, function(err, hikes) {
        res.render('hikes/index', {title: 'All Hikes', hikes})
    })
};