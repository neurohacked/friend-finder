var friends = require('../data/friends.js');
var path = require('path');

module.exports = function(app) {
    // get method is called on /api/friends to send back friends array as json
    app.get('/api/friends', function(request, response) {
        response.json(friends);
    });
    // post method called from form
    app.post('/api/friends', function(request, response) {
        // pull data from form sent through jquery and push into friends array
        var newFriend = request.body;
        friends.push(newFriend);
        var count = 0;
        var bestMatch = [];

        function diff() {
            var totalDiff = 0;
            // current user scores will be the array index of length - 1
            var userScores = friends[friends.length - 1].scores;
            var friendScores = friends[count].scores;
            // loop until count is equal to the length of the friends array
            // calculate difference between user and available friends
            if (count < friends.length - 1) {
                console.log('Friend Scores:', friendScores);
                var userScoresArray = [];
                var friendScoreArray = [];
                // get string back from the post method so use parse to turn into number
                // pushes numbers from the survey into an array
                for (var i = 0; i < userScores.length; i++) {
                    userScoresArray.push(parseInt(userScores[i]));
                    friendScoreArray.push(parseInt(friendScores[i]));
                }
                console.log('User Scores Array:', userScoresArray);
                console.log('Friend Scores Array:', friendScoreArray);
                // subtract each number from the survey based on the array index
                // Math.abs to get absolute value
                for (var j = 0; j < userScoresArray.length; j++) {
                    totalDiff += Math.abs(userScoresArray[j] - friendScoreArray[j]);
                }
                console.log('Total Difference:', totalDiff);
                // push the number to the bestMatch array
                // if the diff after each iteration is less than the previous number
                // or if the array is empty
                if (totalDiff < bestMatch[0] || !bestMatch[0]) {
                    bestMatch[0] = count;
                }
                // increment count so loop can continue through the friends array
                count++;
                console.log('Best Match:', bestMatch);
                diff();
            } else {
                // once loop is finished send back the response to the post request
                console.log('reached the end');
                console.log(bestMatch);
                response.json(friends[bestMatch]);
            }
        }
        diff();

    });
};
