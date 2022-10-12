const Hike = require('../models/hike');

module.exports = {
    create,
    delete: deleteComment,
    update: updateComment,
};

function create(req, res) {
    Hike.findById(req.params.id, function(err, hike) {
        req.body.user = req.user._id
        req.body.userName = req.user.name
        req.body.avatar = req.user.avatar
        hike.comments.push(req.body)
        hike.save(function(err){
            console.log(err)
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

function updateComment(req, res) {
    Hike.findOne({'comments._id': req.params.id}, function(err,hike) {
       const commentSubdoc = hike.comments.id(req.params.id)
       if(!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/hikes/${hike._id}`)
       commentSubdoc.content = req.body.content;
       hike.save(function(err) {
        res.redirect(`/hikes/${hike._id}`)
       })
    })
};