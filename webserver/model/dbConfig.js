var mongoose = require('mongoose');
var newsSchema = mongoose.Schema({	
	userId: String,
	author: String,
	title: String,
	description: String,
	url: String,
	urlToImage: String,
	publishedAt: Date,
	comments:String	
});
module.exports = mongoose.model('news', newsSchema); 
