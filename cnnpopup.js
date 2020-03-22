
//code for CNN mode analysis

chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},function(tab){

	// var bgLogger = chrome.extension.getBackgroundPage();
	// bgLogger.console.log('foo');



	var result_label;

	let minimumWaitTime = 1500;
	let entry = document.getElementById('entry');
	let loading = document.getElementById('loading');
	let content = document.getElementById('content');
	let percentage = document.getElementById('percentage_range');
	let statistics = document.getElementById('statistics');

	$('#analyse-CNN').click(function(){

	    //Send a request to the backend API to give us results for the CNN page

	    var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "http://localhost:8000/analyse/",
		  "method": "POST",
		  "headers": {
		    "Content-Type": "application/json",
		    "Cache-Control": "no-cache",
		    "Postman-Token": "39e11f0d-04f1-430f-97c2-9d2e9cce48ef"
		  },
		  "processData": false,
		  "data": "{\"text\": \"" + localStorage['text'] + "\",\n\"author\": \"" + localStorage['author'] + "\",\n\"heading\": \"" + localStorage['heading'] + "\",\n\"source\":\"CNN\"}"
		}

	    $.ajax(settings).done(function (response) {
	      // bgLogger.console.log(response);
	      // //var json_response = JSON.parse(response);
	      // bgLogger.console.log(response);
	      result_label = (parseInt(response.label)-1)*20;
	    });

	  	
	  	//Transition to loading and results page

	  	function startAnalysis(){
			entry.style.display = 'none';
			loading.style.display = 'block';
			content.style.display = 'none';
			window.setTimeout(showResults, 2500);
		}


		function showResults(){
			entry.style.display = 'none';
			loading.style.display = 'none';
			content.style.display = 'block';
			statistics.style.display = 'none';
		}


		$('#calculate').click(function(){
			$('#percentage').text(result_label+"%");
			percentage.style.display = 'inline';
			var result_label_min = (result_label)*(100/6)/20;
			var result_label_max = (((result_label)/20) + 1)*(100/6);

			$('#percentage_range').text(result_label_min.toFixed(2)+"% - "+result_label_max.toFixed(2)+"%");
			//percentage.style.display = 'inline';

			setBackground();
			$('#percentage').hide();
		})

	  	startAnalysis();


  	})

})


function setBackground(){
    percentage.style.display = 'inline';
    var value = parseInt($('#percentage').text().trim().split("%")[0]);
    var background = 'rgba(0, 0, 0)';
    if(!isNaN(value)) {
        if(value > 50) {
            background = 'rgba(0, 168, 107)';
        }
        if(value < 50) {
            background = 'rgba(246, 70, 91)';
        }
        $('#percentage_range').css('color', background);
    }
}



