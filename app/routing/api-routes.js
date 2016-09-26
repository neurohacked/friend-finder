var friendArray = require('../data/friends.js');
var path = require('path');

module.exports = function(app) {

    // GET Requests
    // render json data on /api/friends
    app.get('/api/friends', function(req, res) {
        res.json(friendArray);
    });

    // POST Requests
    // handle data after for submission
    app.post('/api/friends', function(req, res) {
        friendsData.push(req.body);
    });
};
