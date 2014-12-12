var userSymbol,
	computerSymbol;

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

	makeHumanMove(evt);

	hasWon();

	makeAIMove();

	hasWon();

});

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
		index = Math.floor(Math.random() * (unchosen.length - 1));

	unchosen.eq(index).text(computerSymbol).addClass("chosen");

}

