const Hike = require('../models/hike');

module.exports = {
    index,
    new: newHike,
    create,
    show,
};

function index(req, res) {
    Hike.find({}, function(err, hikes) {
        res.render('hikes/index', {title: 'All Hikes', hikes})
    })
};

function newHike(req, res) {
    res.render('hikes/new', { title: 'Post Hike' })
};

function create(req, res) {
    req.body.isOpen = !!req.body.isOpen
    Hike.create(req.body, function(err, hike) {
        res.redirect('/hikes')
    })
};

function show(req, res) {
    Hike.findById(req.params.id, function(err, hike) {
        res.render('hikes/show', {title: 'Hike Details', hike})
    })
};

