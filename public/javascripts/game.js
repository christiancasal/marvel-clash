$(document).ready(function(){
	var queryUrl = '/game/api/' + $('#host').text();
	console.log(queryUrl)
	$.ajax({
	    dataType: 'json',
	    url: queryUrl,
	    method: 'GET'})
	    .done(function(response) {
	    	console.log(response)
	    	main = response.playerOne.img

	    })
});

function main(player1img, player1name) {

}