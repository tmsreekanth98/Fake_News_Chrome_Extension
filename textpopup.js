let entry = document.getElementById('entry');
let loading = document.getElementById('loading');
let content = document.getElementById('content');
let percentage = document.getElementById('percentage_range');
let classification = document.getElementById('classification');
let statistics = document.getElementById('statistics');
let fvalue = document.getElementById('false');
let htvalue = document.getElementById('halftrue');
let mtvalue = document.getElementById('mostlytrue');
let tvalue = document.getElementById('true');
let btvalue = document.getElementById('barelytrue');
let pofvalue = document.getElementById('pantsonfire')

chrome.tabs.query({active:true,windowType:"normal", currentWindow: true},function(tab){
    console.debug(tab[0].id);
    $('#switchToNormal').click(function(){
      chrome.browserAction.setPopup({tabId:tab[0].id,popup:'popup.html'});
      window.close();
    })
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
        text.innerHTML = selected_text//.replace(/(([^\s]+\s\s*){100})(.*)/,"$1 …");
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

    var result_label,result_label_raw;
    var class_probabilities = [];

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
      "data": "{\"text\": \"" + para + "\",\n\"author\": \"" + "Anonymous" + "\",\n\"heading\": \"" + "None" + "\",\n\"source\":\"Custom-text\"}"
    }

    console.log(para);

    $.ajax(settings).done(function (response) {
      result_label_raw = parseInt(response.label); 
      result_label = (parseInt(response.label)-1)*20;

      var pants_on_fire = parseFloat(response.pants_on_fire)*100;
      var _false = parseFloat(response.false)*100;
      var barely_true = parseFloat(response.barely_true)*100;
      var half_true = parseFloat(response.half_true)*100;
      var mostly_true = parseFloat(response.mostly_true)*100;
      var _true = parseFloat(response.true)*100;

      class_probabilities = [pants_on_fire,_false,barely_true,half_true,mostly_true,_true];
        
    });

    $('#calculate').click(function(){
      $('#percentage').text(result_label+"%");
      percentage.style.display = 'inline';
      classification.style.display = 'inline';
      var result_label_min = (result_label)*(100/6)/20;
      var result_label_max = (((result_label)/20) + 1)*(100/6);

      $('#percentage_range').text(result_label_min.toFixed(2)+"% - "+result_label_max.toFixed(2)+"%");


      //Zoom the graph in case all probabilities are less than 50%. (Zoom is 2X)
      var greater_than_50 = 0;
      for(var item=0;item<6;item++){
        if(class_probabilities[item] > 50){
          greater_than_50 = 1;
          break;
        }
      }

      if(greater_than_50 == 1){
        pofvalue.style.width = class_probabilities[0] + '%';
        fvalue.style.width = class_probabilities[1] + '%';
        btvalue.style.width = class_probabilities[2] + '%';
        htvalue.style.width = class_probabilities[3] + '%';
        mtvalue.style.width = class_probabilities[4] + '%';
        tvalue.style.width = class_probabilities[5] + '%';  
      }
      else{
        pofvalue.style.width = 2*class_probabilities[0] + '%';
        fvalue.style.width = 2*class_probabilities[1] + '%';
        btvalue.style.width = 2*class_probabilities[2] + '%';
        htvalue.style.width = 2*class_probabilities[3] + '%';
        mtvalue.style.width = 2*class_probabilities[4] + '%';
        tvalue.style.width = 2*class_probabilities[5] + '%';
      }
      
      //Set the name of classification label in result
      var label_names = ['pants-on-fire','false','barely-true','half-true','mostly-true','true'];

      classification.innerHTML = label_names[result_label_raw-1];


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
}

$(function(){
  $('#calculate').click(function(){setBackground();});
});

function setBackground(){
    percentage.style.display = 'inline';
    statistics.style.display = 'block';
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
        $('#classification').css('color',background);
    }
}