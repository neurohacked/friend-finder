var path = require('path');

module.exports = function(app) {
    // link to quiz
    app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/survey.html'));
    });

    // default link to home page
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });
	
	// if there is a 404 not found error, sends back error msg
	app.get('*', function(request, response) {
		response.status(404).send('page not found');
	});
};
