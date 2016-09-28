var friends = require('../data/friends.js');
var path = require('path');

module.exports = function(app) {
    // get method is called on /api/friends to send back friends array as json
    app.get('/api/friends', function(request, response) {
        response.json(friends);
    });
    // post method called from form
    app.post('/api/friends', function(request, response) {
        // // push form data into friends array
        var newFriend = request.body;
        friends.push(newFriend);
        var matchIndex = 0;
        var matchDiffs = [];

        for (var i = 0; i < friends.length; i++) {
            var totalDiff = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                totalDiff += Math.abs(request.body.scores[j] - friends[i].scores[j]);
            }
            matchDiffs.push(totalDiff);
        }

        matchIndex = matchDiffs.indexOf(Math.min.apply(Math, matchDiffs));
        response.json(friends[matchIndex]);
    });
};
