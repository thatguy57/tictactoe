var userSymbol;
var computerSymbol;

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

	var $target = $(evt.currentTarget);

	if ($target.is(".chosen")) return;

	$target.text(userSymbol).addClass("chosen");

	var unchosen = $("td:not(.chosen)");

	var index = Math.floor(Math.random() * (unchosen.length - 1));

	unchosen.eq(index).text(computerSymbol).addClass("chosen");

	console.log(index);


});

