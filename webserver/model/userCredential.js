var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userCredentialsSchema = new Schema({
	userId: String,
	password: String
}, {
	collection: 'data'
});

module.exports = mongoose.model('user', userCredentialsSchema);