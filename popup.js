let minimumWaitTime = 1500;
let entry = document.getElementById('entry');
let loading = document.getElementById('loading');
let content = document.getElementById('content');
let percentage = document.getElementById('percentage_range');
let statistics = document.getElementById('statistics');
// var bgLogger = chrome.extension.getBackgroundPage();
// bgLogger.console.log('foo');



chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},function(tab){
  console.debug(tab[0].id);
  $('#switchToCNN').click(function(){
    chrome.browserAction.setPopup({tabId:tab[0].id,popup:'CNNpopup.html'});
    window.close();
  })

  $('#switchToNormal').click(function(){
    chrome.browserAction.setPopup({tabId:tab[0].id,popup:'popup.html'});
    window.close();
  })

  //document.getElementById('text').style.visibility = "inline";
  pasteSelection();

})








$(function(){
  $('#paste').click(function(){pasteSelection();});
});

function pasteSelection() {
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
      var text = document.getElementById('text');
      //alert(response) 
      var selected_text = ""+response.data;
      if(response.data){
        //alert("a")
        text.innerHTML = selected_text.replace(/(([^\s]+\s\s*){10})(.*)/,"$1…");
        document.getElementById('analyse').disabled = false;
      }
      else{
        //alert("b")
        text.innerHTML = "Please Select Text To Analyse!";
        document.getElementById('analyse').disabled = true;
      }
      
    });
  });
}

$(function(){
  $('#analyse').click(function(){
    //var text = document.getElementById('text').innerHTML;
    var para = $('#text').text().replace(/(<([^>]+)>)/ig,"").replace(/["']/g, "")
    para = para.split(" ").splice(0,1000).join(" ");
    para = para.split("\n").join(" ");

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
      "data": "{\"text\": \"" + para + "\",\n\"author\": \"" + "a" + "\",\n\"heading\": \"" + "a" + "\",\n\"source\":\"copy-paste\"}"
    }

    console.log(para);

    $.ajax(settings).done(function (response) {
      // bgLogger.console.log(response);
      // //var json_response = JSON.parse(response);
      // bgLogger.console.log(response);
      result_label = (parseInt(response.label)-1)*20;
    });

    $('#calculate').click(function(){
      $('#percentage').text(result_label+"%");
      var result_label_min = (result_label)*(100/6)/20;
      var result_label_max = (((result_label)/20) + 1)*(100/6);

      $('#percentage_range').text(result_label_min.toFixed(2)+"% - "+result_label_max.toFixed(2)+"%");

      percentage.style.display = 'inline';
      setBackground();
    })

    setLoading();
  });
});

function setLoading() {
    entry.style.display = 'none';
    loading.style.display = 'block';
    window.setTimeout(setDisplay, 5000);
}

function setDisplay() {
    loading.style.display = 'none';
    content.style.display = 'block';
    statistics.style.display = 'none';
}

$(function(){
  $('#calculate').click(function(){setBackground();});
});
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