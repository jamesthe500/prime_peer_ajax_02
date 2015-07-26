var oAuth = "167dea40fba88af144c01f404249df3723020599";
var fromPrime = "?client_id=f8a4b95805c9804c9eb7&client_secret=4b1bff35a5b8b802fe4bb4e1204afd2f56fc8d8d"
var repoList = "";
var display;
var userResults;

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
					repoList = repoList + " <p><a href='" + repoUrl + "'>" + repoName + "</a></p>" + repoInfo + "</p>";
		        	
		        } //for
	     
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
        			userResults = "<p>No such user, please try again.</p>";
        			repoList = "";
        		} else {
        			userResults = "<p> " + user.login + " A.K.A. " + user.name + " of " + user.location + "</p><p><img height='100px' src='" + user.avatar_url +"'></p><p>";
    			}
    			$(".resultsDisplay").prepend(userResults + repoList);
        	},
        	complete: function() {
        		console.log('User ajax complete');
        	}
        });
        	
		}); //ajax  for user
		}


	// search functon

}); //document ready

/*wishlist:
a light that goes green to yellow and back while the search is happening.

link to their page
link to email
recognize when undefined

clear search history.

*/