const Hike = require('../models/hike');

module.exports = {
    create,
    delete: deleteComment,
};

function create(req, res) {
    Hike.findById(req.params.id, function(err, hike) {
        req.body.user = req.user._id
        req.body.userName = req.user.name
        req.body.avatar = req.user.avatar
        hike.comments.push(req.body)
        hike.save(function(err){
            console.log(req.body)
            res.redirect(`/hikes/${hike._id}`)
        })
    })
};

function deleteComment(req, res) {
    Hike.findOne({'comments._id': req.params.id, 'comments.user': req.user._id})
    .then(function(hike) {
        hike.comments.remove(req.params.id)
        hike.save()
        .then(function() {
            res.redirect(`/hikes/${hike._id}`)
        })
        .catch(function(err) {
            return next(err)
        })
    })
};