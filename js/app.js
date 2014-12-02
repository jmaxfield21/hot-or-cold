
$(document).ready(function(){

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});



  	$('.new').on('click', newGame );
  	
	$('form').submit( handleGuess );

	newGame();
});

var secretNumber;
var guess;
var count;

function newGame() {
	generateSecretNumber();
	resetCount();
	resetFeedback();
	clearGuesses();
	clearGuessField();
	$('#guessButton').prop('disabled', false);
}

function generateSecretNumber() {
	secretNumber = Math.floor(Math.random() * 100);
}

function resetCount() {
	count = 0;
	$('span#count').text(count);
}

function resetFeedback() {
	$('#feedback').text('Make your Guess!');
}

function clearGuesses() {
	$('#guessList').empty();
}

function handleGuess( event ) {
	event.preventDefault();
	guess = $('#userGuess').val();
	if ( isValidGuess() ) handleFeedback();
}

function isValidGuess() {
	if ( isNaN( guess ) ) {
		$('#feedback').text('Invalid Input. Please Try Again');
		clearGuessField();
		return false;
	}
	if ( isNumberOutOfRange( guess ) ) {
		$('#feedback').text('Please guess a number between 1 and 100');
		clearGuessField();
		return false;
	}
	if ( isDecimal( guess ) ) {
		$('#feedback').text('Please guess a WHOLE number');
		clearGuessField();
		return false;
	}

	return true;
}

function isNumberOutOfRange( guess ) {
	return guess <= 0 || guess > 100;
}

function isDecimal( guess ) {
	return guess % 1 != 0;
}

function handleFeedback() {
	incrementCount();
	saveGuess( guess );
	var diff = Math.abs( guess - secretNumber );
	if ( diff == 0 ) correctFeedback();
	else {
		clearGuessField();
		var feedback;
		if ( diff <= 5 ) feedback = 'Very Hot!';
		else if ( diff <= 10 ) feedback = 'Hot!';
		else if ( diff < 20 ) feedback = 'Warm';
		else if ( diff < 30 ) feedback = 'Cool';
		else if ( diff < 50 ) feedback = 'Cold';
		else feedback = 'Ice Cold';

		if ( diff > 0 ) {
			feedback += ' (you are too ' + (guess > secretNumber ? 'high' : 'low') + ')';
		} 
		$('#feedback').text(feedback);
	}
}

function incrementCount() {
	count += 1;
	$('#count').text(count);
}

function saveGuess() {
	$('#guessList').append( $('<li>' + guess + '</li>' ) );
}

function correctFeedback() {
	$('#feedback').text('Correct! You Win! Play Again?');
	$('#guessButton').prop('disabled', true);
}

function clearGuessField() {
	$('#userGuess').val('');
}
