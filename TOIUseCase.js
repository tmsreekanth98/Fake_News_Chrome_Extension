console.log("TOIUseCase.js loaded");


//This JS file is content script injected to TOI article to scan it for fake news.





//Gathering required data from CNN article

var headline = $('.K55Ut').text();
console.log(headline);

// // var authors = $('.metadata__byline__author').find('a').text();

var author = "";
$('._3Mkg- byline').children().each(function(index){
	author = authors + $(this).html() + " ";
})
console.log(author);

//if(authors == ""){
//    authors = $('._3Mkg- byline').text().replace()
//    }
//}

$('.a3_tR').text("");
$('._3ABz7').text("");
$('._1Hw00').text("");
var para = $('._3WlLe').first().text().replace(/(<([^>]+)>)/ig,"").replace(/["']/g, "")
para = para.split(" ").splice(0,1000).join(" ");

console.log(para);


//Send a message to the background files

chrome.runtime.sendMessage({
  heading: headline,
  author: author,
  text: para
});