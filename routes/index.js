var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET custom home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// No home page -- straight to index view
router.get('/', function(req, res, next) {
  res.redirect('/hikes')
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/hikes',
    failureRedirect: '/hikes'
  }
));

// OAuth Logout Route
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if(err) return next(err)
    res.redirect('/hikes')
  })
});


module.exports = router;
