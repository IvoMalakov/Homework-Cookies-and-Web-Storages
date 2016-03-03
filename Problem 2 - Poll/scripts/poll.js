$(document).ready(function () {
    var timerDiv = $('#timer'),
        timeAllowed = 5 * 60,
        counter;

    function saveData() {
        if (!localStorage.saved && localStorage.length) {
            localStorage.saved = true;
            localStorage.women = $('input[name=women]:checked').val();
            localStorage.enemy = $('input[name=enemy]:checked').val();
            localStorage.womenCorrect = 'Bulgarian women';
            localStorage.enemyCorrect = 'Turkey';
        }
    }

    function loadSavedData() {
        switch (localStorage.women) {
            case "Bulgarian women" :
                $('#Bulgarian-women').attr('checked', true);
                break;
            case "Russian women" :
                $('#Russian-women').attr('checked', true);
                break;
            case "Ukrainian women" :
                $('#Ukrainian-women').attr('checked', true);
                break;
            case "American women" :
                $('#American-women').attr('checked', true);
                break;
        }

        switch (localStorage.enemy) {
            case "USA" :
                $('#USA').attr('checked', true);
                break;
            case "Russia" :
                $('#Russia').attr('checked', true);
                break;
            case "Turkey" :
                $('#Turkey').attr('checked', true);
                break;
            case "China" :
                $('#China').attr('checked', true);
                break;
        }
    }

    function countDown() {
        var minutes,
            seconds;

        localStorage.count--;

        if (localStorage.count < 0) {
            clearInterval(counter);
            return;
        }

        minutes = Math.floor(localStorage.count / 60);
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        seconds = Math.floor(localStorage.count % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        timerDiv.text(minutes + ':' + seconds);
    }

    function timeExpired() {
        timerDiv.css('color', 'red');
        $('button').attr('disabled', true);
    }

    function showResults() {
        var timeElapsed = timeAllowed - localStorage.count,
            womenSubmitted = $('#women-answer-submitted'),
            enemySubmitted = $('#enemy-answer-submitted'),
            minutes,
            seconds;

        clearInterval(counter);
        $('form').hide();
        timerDiv.hide();

        if (!localStorage.submitted) {
            saveData();
        }

        womenSubmitted.prepend('Your answer: ' + localStorage.women);
        $('#women-answer-correct').text('Correct answer: ' + localStorage.womenCorrect);

        if (localStorage.women === localStorage.womenCorrect) {
            womenSubmitted.find('.correct-msg').show();
            womenSubmitted.css('color', 'green');
        } else {
            womenSubmitted.find('.incorecct-msg').show();
            womenSubmitted.css('color', 'red');
        }

        enemySubmitted.prepend('Your answer: ' + localStorage.enemy);
        $('#enemy-answer-correct').text('Correct answer: ' + localStorage.enemyCorrect);

        if (localStorage.enemy === localStorage.enemyCorrect) {
            enemySubmitted.find('.correct-msg').show();
            enemySubmitted.css('color', 'green');
        } else {
            enemySubmitted.find('.incorecct-msg').show();
            enemySubmitted.css('color', 'red');
        }

        $('#answers').show();

        minutes = Math.floor(timeElapsed / 60);
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        seconds = Math.floor(timeElapsed % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        $('#time-elapsed').append(minutes + ':' + seconds);
        localStorage.submitted = true;
    }

    if (!localStorage.submitted) {
        if (!localStorage.count) {
            localStorage.count = timeAllowed;
        } else if (localStorage.count < 0) {
            timeExpired();
        }

        counter = setInterval(countDown, 1000);

        if (localStorage.saved) {
            loadSavedData();
        }
    } else {
        showResults();
    }

    $('button').click(saveData, showResults);

    window.onbeforeunload = saveData;
});