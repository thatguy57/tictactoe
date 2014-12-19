var userSymbol,
		computerSymbol,
		
		userScore = 1,
		computerScore = -1;

$("button.choice").on("click", function(evt){

	userSymbol = $(evt.currentTarget).data("value");
	computerSymbol = (userSymbol === "X") ? "O" : "X"; 

	$("div.question").hide();

	$(".status-symbol").text(userSymbol);

	$("div.status, .restart").show();

	$("td").show();

});

$("button.restart").on("click", function(evt){

	window.location.reload();

});

$("td").on("click", function(evt){
	var index = $(evt.currentTarget).data("index"),
			hasWon;

	makeHumanMove(evt);

	if (scoreMove(index, userScore)) {
		// declare the player a winner
	}

	// if (scoreMove(makeAIMove(), computerScore)) {
	// 	// declare the computer a winner
	// };

});

var gridLength = 3,

		scores = {
			rows: [0, 0, 0],
			columns: [0, 0, 0],
			diagonals: [0, 0]
		}

function scoreMove(index, score) {
	var row = Math.ceil(index / gridLength),
			column = index % gridLength || gridLength,
			hasWon = false;

	hasWon = (scores.rows[row - 1] += score) === gridLength;
	hasWon = (scores.columns[column - 1] += score) === gridLength;

	console.log(index != 1,  (index != gridLength * gridLength), (index % (gridLength - 1) === 1))

	if (index !== 1 && (index !== gridLength * gridLength) && (index % (gridLength - 1) === 1)) {
		hasWon = (scores.diagonals[1] += score) === gridLength;
	}

	if (index % (gridLength) === 1) {
		hasWon = (scores.diagonals[0] += score) === gridLength;
	}

	console.log(scores, hasWon);

	return hasWon;
}

function makeHumanMove(evt) {

	var $target = $(evt.currentTarget);

	if ($target.is(".chosen")) return;

	$target.text(userSymbol).addClass("chosen");

}

function checkWin(indexes, subject) {

	for (var i = 0; i < indexes.length; i++) {
		if (subject.indexOf(indexes[i]) === -1 ) return false;
	}

	return true;
}

function hasWon() {

	var cells = $("td"),
		xcells = "",
		ocells = "";

	cells.each(function(i, cell){
		var addIndex = $(cell).data("index"),
			addSymbol = $(cell).text();

		if ( addSymbol === "X" ) {
			xcells += addIndex;
		} else if ( addSymbol === "O" ) {
			ocells += addIndex;
		}		
	});

	function ifWin() {
		if (isXWin) {
			$("table").hide();

			if (userSymbol === "X") {
				$(".status").html("The player won the game!");
			} else {
				$(".status").html("The computer won the game!");
			}
		}

		if (isOWin) {
			$("table").hide();

			if (userSymbol === "O") {
				$(".status").html("The player won the game!");
			} else {
				$(".status").html("The computer won the game!");
			}
		}
	}

	var isXWin = checkWin(["1","2","3"], xcells);
	ifWin();

	isXWin = checkWin(["4","5","6"], xcells);
	ifWin();

	isXWin = checkWin(["7","8","9"], xcells);
	ifWin();

	isXWin = checkWin(["1","4","7"], xcells);
	ifWin();

	isXWin = checkWin(["2","5","8"], xcells);
	ifWin();

	isXWin = checkWin(["3","6","9"], xcells);
	ifWin();

	isXWin = checkWin(["1","5","9"], xcells);
	ifWin();

	isXWin = checkWin(["3","5","7"], xcells);
	ifWin();

	var isOWin = checkWin(["1","2","3"], ocells);
	ifWin();

	isOWin = checkWin(["4","5","6"], ocells);
	ifWin();

	isOWin = checkWin(["7","8","9"], ocells);
	ifWin();

	isOWin = checkWin(["1","4","7"], ocells);
	ifWin();

	isOWin = checkWin(["2","5","8"], ocells);
	ifWin();

	isOWin = checkWin(["3","6","9"], ocells);
	ifWin();

	isOWin = checkWin(["1","5","9"], ocells);
	ifWin();

	isOWin = checkWin(["3","5","7"], ocells);
	ifWin();

	return isXWin, isOWin;
}

function makeAIMove() {

	var unchosen = $("td:not(.chosen)"),
			index = Math.floor(Math.random() * (unchosen.length - 1)),
			choice = unchosen.eq(index).text(computerSymbol).addClass("chosen");

	return choice.data("index");
}

