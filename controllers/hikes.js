const { deleteOne } = require('../models/hike');
const Hike = require('../models/hike');

module.exports = {
    index,
    new: newHike,
    create,
    show,
    delete: deleteHike,
    edit,
    update,
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
        console.log(req.body.user)
        res.redirect('/hikes')
    })
};

function show(req, res) {
    Hike.findById(req.params.id, function(err, hike) {
        res.render('hikes/show', {title: 'Hike Details', hike})
    })
};

function deleteHike(req, res) {
    Hike.findById(req.params.id,
        function (err, hike) {
        hike.remove();
        hike.save(function (err) {
            res.redirect('/hikes'); 
        })
	})
};

function edit(req, res) {
    Hike.findOne({'_id': req.params.id}, function(err, hike) {
        res.render('hikes/edit', {title: 'Edit Hike', hike})
    })
};

function update(req, res) {
    req.body.isOpen = !!req.body.isOpen
    Hike.findByIdAndUpdate(req.params.id, 
    req.body,
    {new: true},
    function(err, hike) {
        res.redirect(`/hikes/${hike._id}`)
    })
};