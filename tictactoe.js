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

	var isWin = checkWin(["1","2","3"], xcells);
	console.log(isWin);

	if (isWin) {
		$("table").hide();
		$(".status").html("X won the game!");
	}

	return isWin;
}

function makeAIMove() {

	var unchosen = $("td:not(.chosen)"),
		index = Math.floor(Math.random() * (unchosen.length - 1));

	unchosen.eq(index).text(computerSymbol).addClass("chosen");

}

