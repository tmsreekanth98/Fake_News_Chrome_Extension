console.log("CNNUseCase.js loaded");


//This JS file is content script injected to CNN article to scan it for fake news.





//Gathering required data from CNN article

var headline = $('.pg-headline').text();
console.log(headline);

// // var authors = $('.metadata__byline__author').find('a').text();

var author = "";
$('.metadata__byline__author').children().each(function(index){
	author = author + $(this).html() + " ";
})
console.log(author);

if(author = ""){
	author = $('.metadata__byline__author').text().replace("CNN","").replace(",","").replace("and","");
}


var para = $('.zn-body__paragraph').text().replace(/(<([^>]+)>)/ig,"").replace(/["']/g, "")
para = para.split(" ").splice(0,1000).join(" ");

console.log(para);




//Send a message to the background files

chrome.runtime.sendMessage({
  heading: headline,
  author: author,
  text: para
});