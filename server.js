// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// express configuration
var app = express();
var PORT = process.env.PORT || 80;

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse an HTML body into a string
app.use(bodyParser.text({
    type: 'text/html'
}));
// parse various different custom JSON types as JSON
app.use(bodyParser.json({
    type: 'application/*+json'
}));

// set express to use the public folder
app.use(express.static(__dirname + '/app/public'));

// routing
require('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);

// listener
app.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT);
});
