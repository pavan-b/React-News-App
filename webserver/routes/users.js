var express = require('express');
var mongoose = require('mongoose');

var userData = require('../model/userCredential');

var router = express.Router();

//Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(username, password, done) {

		userData.findOne({
			userId: username
		}, function(err, user) {

			if (err) {
				return done(err);
			}
			if (!user) {

				return done(null, false, {
					message: 'Incorrect username.'
				});
			}
			if (!(user.password == password)) {

				return done(null, false, {
					message: 'Incorrect password.'
				});
			}

			return done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	userData.findById(id, function(err, user) {
		done(err, user);
	});
});

router.post('/', function(req, res, next) {

	passport.authenticate('local',{failureFlash: true} ,function(err, user, info) {
		if (err) {
			return next(err);
		}
		//console.log(user);
		if (!user) {
			return res.send(user);
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			return res.send(true);
		});
	})(req, res, next);
});

/* User registration */
router.post('/register', function(req, res, next) {

	var credentials = new userData();
	credentials.userId = req.body.userId;
	credentials.password = req.body.password;

	credentials.save(function(err, data) {
		if (err) {
			console.log('err in saving');
		} else {
			res.send('Credentials saved succesfully');
		}

	})
});

module.exports = router;