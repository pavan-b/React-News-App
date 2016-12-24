var express = require('express');
var mongoose = require('mongoose');
var news = require('../model/dbConfig');

var router = express.Router();

//
function isAuthenticate(req, res, next){
	console.log("inside isAuthenticated");
    if (req.isAuthenticated()){      
        return next();
    }else{
        console.log("false");
    }
}

//
function save(req, res, next){	
    if (req.isAuthenticated()){       
        
        return next();

    }else{
        console.log("false");
        res.send(false);
    }
}

//get login status
router.get('/status', function(req, res, next) {
	if (req.isAuthenticated()){       
        
        res.send(true);

    }else{
        
        res.send(false);
    }

});

//logout route
router.get('/logout', function(req, res, next) {
	req.logout();
	req.session.destroy();
	res.send(true)	
});


/* GET Saved News data. */
router.get('/',isAuthenticate, function(req, res, next) {
	console.log("inside Get News");
	news.find(function(err, data) {
		if (err) {
			return console.error(err);
		} else {
			res.send(data);
		}
	})
});


/* GET single document */
router.get('/:id', function(req, res, next) {
	news.findOne({
		"_id": req.params.id
	}, function(err, data) {
		if (err) {
			return console.error(err);
		} else {
			console.log(req.params.id);
			res.send(data);
		}
	})
});

/* POST home page. */
router.post('/',save, function(req, res, next) {
	var article = new news();
	article.userId = req.body.userId;
	article.author = req.body.author;
	article.title = req.body.title;
	article.description = req.body.description;
	article.url = req.body.url;
	article.urlToImage = req.body.urlToImage;
	article.publishedAt = req.body.publishedAt;
	article.comments = req.body.comments;

	article.save(function(err, news) {
		if (err) {
			console.log('err in saving');
		} else {
			res.send(news);
		}

	})
});

/* PUT home page. */
router.put('/:id', function(req, res) {
	news.update({
		"_id": req.params.id
	}, {
		$set: {
			"comments": req.body.comments
		}
	}, function(err, raw) {
		if (err) {
			console.log('error updating');
		} else {

			res.send(true)
		}
	})

});

/* DELETE home page. */
router.delete('/:id', function(req, res, next) {
	news.remove({
		"_id": req.params.id
	}, function(err, data) {
		if (err) {
			console.log('error deleting');
		} else {

			res.send(true)
		}
	})
});



module.exports = router;