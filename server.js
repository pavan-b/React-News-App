var path = require('path');
var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var index = require('./webserver/routes/index');
var users = require('./webserver/routes/users');
var app = express();
var compiler = webpack(config);
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, './webclient/')));

//Mongoose
var db = 'mongodb://localhost/news';
var userData = require('./webserver/model/userCredential');
mongoose.connect(db);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connnected with mongo");
});

//Passport
app.use(cookieParser());
app.use(session({ secret: 'pavan', resave: true,saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Ruotes
app.use('/data', index);
app.use('/users',users);




app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
}));

app.use(webpackHotMiddleware(compiler));

//Listening to port 8080
app.listen(8080, '0.0.0.0', function(err, result) {
    if (err) {
        console.error("Error ", err);
    }

    console.log("Server started at 8080");
});
