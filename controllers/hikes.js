const { deleteOne } = require('../models/hike');
const Hike = require('../models/hike');

module.exports = {
    index,
    new: newHike,
    create,
    show,
    delete: deleteHike,
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
    req.body.user = req.user._id
    Hike.create(req.body, function(err, hike) {
        res.redirect('/hikes')
    })
};

function show(req, res) {
    Hike.findById(req.params.id, function(err, hike) {
        res.render('hikes/show', {title: 'Hike Details', hike})
    })
};

function deleteHike(req, res, next) {
    Hike.deleteOne({'hikes._id': req.params.id})
        .then(function() {
            res.redirect('/hikes')
        })
        .catch(function(err) {
            return next(err)
        })
};
