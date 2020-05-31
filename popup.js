let minimumWaitTime = 1500;

chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},function(tab){
  console.debug(tab[0].id);
  $('#switchToTEXT').click(function(){
    chrome.browserAction.setPopup({tabId:tab[0].id,popup:'TEXTpopup.html'});
    window.close();
  })
  $('#switchToCNN').click(function(){
    chrome.browserAction.setPopup({tabId:tab[0].id,popup:'CNNpopup.html'});
    window.close();
  })
  $('#switchToTOI').click(function(){
    chrome.browserAction.setPopup({tabId:tab[0].id,popup:'TOIpopup.html'});
    window.close();
  })
  //document.getElementById('text').style.visibility = "inline";
})
