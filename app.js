var fromPrime = "?client_id=f8a4b95805c9804c9eb7&client_secret=4b1bff35a5b8b802fe4bb4e1204afd2f56fc8d8d"
var repoList = "";
var display;
var userResults;
var colorPick = "#D5BCF2"
var j = 1;

$(document).ready(function (){
	$("#submitBtn").on("click", function(){
		var uri = encodeURI($("#inputField").val());
		search(uri);

	}); //on click

// Serach function. First it does repos, then 
function search(query){
	$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		crossDomain: true,
		async: true,
		url: 'https://api.github.com/users/' + query + '/repos' + fromPrime,
		error: function(xhr, err){
			alert(err);
		},
		success: function(results, status, xhr) {
			repoList = "<p>" + query + "'s public repos:</p>";
			var repoName;
			var repoUrl;
			var repoInfo;
			for (var i =0; i < results.data.length; i++){
				repoName = results.data[i].name;
				repoUrl = results.data[i].html_url;
				repoInfo = results.data[i].description;
				if (repoInfo == ""){
					repoList = repoList + " <p><a href='" + repoUrl + "'>" + repoName + "</a>";
				} else {
					repoList = repoList + " <p><a href='" + repoUrl + "'>" + repoName + "</a><ul><li>" + repoInfo + "</li></ul>";
				}
		        } //for
		        if (repoList.length < 24 + query.length){
		        	repoList = '';
		        } else {
		        	repoList = repoList + "</div>";
		        }
		     }, //success
		     complete: function() {
		     	console.log('Repo ajax complete');
		    } //complete
		    //ajax for repos ends on next line
		}).always(function (){
			$.ajax({
				type: 'GET',
				dataType: 'jsonp',
				crossDomain: true,
				async: true,
				url: 'https://api.github.com/users/' + query + fromPrime,
				error: function(xhr, err){
					alert(err);
        	}, // This line didn't seem to work. It let success happen, even when an error code was thrown. I added the if to success and then it didn't even kick back in the console
        	success: function(results, status, xhr) {
        		var statusCode = results.meta.status;
        		var user = results.data;
        		if (statusCode > 399){
        			$(".inputRow").append("<div id='temp' class='alert'>No such user, please try again.</div>");
        			$(".inputRow").find("#temp").fadeOut(3000, function(){
        				$(this).remove();
        			});
        		} else {
        			switchColor();
        			userResults = "<div class='result col-lg-3 col-md-4 col-sm-6 col-xs-12' style='background-color : " + colorPick + "'><h4><strong><a href='" + user.html_url + "'>" + user.login + "</a></strong></h4><p>Name: " + user.name + "</p><p>From: " + user.location + "</p><p><img height='150px' src='" + user.avatar_url +"'></p><p>Email: <a email='" + user.email + "'>" + user.email + "</a>";
        			$(".resultsDisplay").prepend(userResults + repoList);
        		}
        	},
        	complete: function() {
        		console.log('User ajax complete');
        	}
        }); //always

		}); //ajax  for user
}

function switchColor(){
	switch (j){
		case 1:
		colorPick = "#F3CAC2";
		j++;
		break;
		case 2:
		colorPick = "#FCF6E1";
		j++;
		break;
		case 3:
		colorPick = "#B6E5AE";
		j++;
		break;
		case 4:
		colorPick = "#B3EDFC";
		j++;
		break;
		case 5:
		colorPick = "#D5BCF2";
		j=1;
		break;
	};
}
}); //document ready

/*wishlist:
a light that goes green to yellow and back while the search is happening.

recognize when undefined

clear search history.
*/