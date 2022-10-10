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
    Hike.findOne({'hikes._id': req.params.id, 'hikes.user': req.user._id})
    .then(function(hike) { 
        if(!hike) return res.redirect('/hikes')
        hike.remove(req.params.id)
        hike.save()
        .then(function() {
            res.redirect(`/hikes/${hike._id}`)
        })
        .catch(function(err) {
            return next(err)
        })
    })
};
