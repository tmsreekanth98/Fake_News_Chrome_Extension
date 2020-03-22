// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({color: '#3aa757'}, function() {
//         console.log('The color is green.');
//     });
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//         chrome.declarativeContent.onPageChanged.addRules([{
//             conditions: [new chrome.declarativeContent.PageStateMatcher({
//                 pageUrl: {hostEquals: 'developer.chrome.com'},
//             })
//             ],
//             actions: [new chrome.declarativeContent.ShowPageAction()]
//         }]);
//     });
// });

// Called when the user clicks on the browser action.




	// var url = ""
	// var domain = ""
	// chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	//     url = tabs[0].url;
	//     domain = url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
	// });

	// console.log(url)
	// if(domain == "twitter.com"){
	//   chrome.browserAction.setPopup({popup:'CNNpopup.html'});
	//   console.log("ff")
	// }
	// else{
	//   chrome.browserAction.setPopup({popup:'popup.html'});
	//   console.log("haha")
	// }



// chrome.tabs.onActivated.addListener(function(activeInfo) {
//     console.log(activeInfo.tabId);

// });


//Upon page refresh check whether the website is twitter and change the html page.
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {

  	//Check for twitter domain and change the html file
    var url = tab.url
    var domain = url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
    console.log(domain)


    if(domain == 'edition.cnn.com'){
    	chrome.browserAction.setPopup({tabId:tabId,popup:'CNNpopup.html'});
    	chrome.tabs.executeScript(null, {file: "CNNUseCase.js"});
    	console.log("A")
    }
    else{
    	chrome.browserAction.setPopup({tabId:tabId,popup:'popup.html'});
    	console.log("B")
    }


  }
  //console.log(changeInfo.status);
})



//Receive message from CNN content script to be used to send requests

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
       localStorage['heading'] = request.heading;
       localStorage['author'] = request.author;
       localStorage['text'] = request.text;
    }
);




chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    // console.log('Turning ' + tab.url + ' red!');
    // chrome.tabs.executeScript({
    //     code: 'document.body.style.backgroundColor="red"'
    // });

	var url = tab.url
    var domain = url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
    console.log(domain)


    if(domain == 'edition.cnn.com'){
    	chrome.browserAction.setPopup({tabId:tab.id,popup:'CNNpopup.html'});
    	console.log("A")
    }
    else{
    	chrome.browserAction.setPopup({tabId:tab.id,popup:'popup.html'});
    	console.log("B")
    }    

 	
    //new chrome.declarativeContent.ShowPageAction();
});

