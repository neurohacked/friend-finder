$(document).ready(function() {
    $('#addFriend').on('click', function(e) {
        e.preventDefault();
        // grab values from the form
        var friendName = $('#name').val().trim();
        var friendEmail = $('#email').val().trim();
        var friendImage = $('#photo').val().trim();
        var newFriend = {
            name: friendName,
            email: friendEmail,
            photo: friendImage,
            scores: []
        };
        // pushes the values from the survey to the scores array
        for (var i = 1; i <= 10; i++) {
            var answers = $('#q' + i).val();
            // requires the user to fill out all fields before they can submit
            if (answers === '' || friendName === '' || friendEmail === '' || friendImage === '') {
                return alert('Please fill out all fields before submitting...');
            }
            newFriend.scores.push(answers);
        }
        // post request to the server
        // sends the user info the server
        $.post('/api/friends', newFriend).done(function(response) {
            // shows best match in the modal
            var matchInfo = '<p>///////////////////////////</p><p>Name: ' + response.name + '</p><p>Email: ' + response.email + '</p><p>///////////////////////////</p>';
            var matchPhoto = $('<img>', {
                class: 'img-responsive',
                src: response.photo
            });
            // Show the modal with the best match
            $('.friend-info').html('');
            $('.friend-photo').html('');
            $('.friend-info').append(matchInfo).addClass('match-info');
            $('.friend-photo').append(matchPhoto);
            $("#resultsModal").modal('toggle');
        });
    });
});
