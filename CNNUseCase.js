console.log("CNNUseCase.js loaded");


//This JS file is content script injected to CNN article to scan it for fake news.



// $('.css-901oao.css-16my406.r-1qd0xha.r-ad9z0x.r-bcqeeo.r-qvutc0').each(function(index){
//     var t = $(this).html();
//     console.log(t);
//     $(this).effect( "highlight", {color:"#669966"}, 3000 );
// });




//Gathering required data from CNN article

var headline = $('.pg-headline').text();
console.log(headline);

// // var authors = $('.metadata__byline__author').find('a').text();

var authors = "";
$('.metadata__byline__author').children().each(function(index){
	authors = authors + $(this).html() + " ";
})
console.log(authors);

var para = $('.zn-body__paragraph').text().replace(/(<([^>]+)>)/ig,"").replace(/["']/g, "")
para = para.split(" ").splice(0,1000).join(" ");

console.log(para);




//Send a message to the background files

chrome.runtime.sendMessage({
  heading: headline,
  author: authors,
  text: para
});