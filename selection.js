
function getSelectionHTML() {
  var userSelection;
  if (window.getSelection) {
	// W3C Ranges
	userSelection = window.getSelection ();
	// Get the range:
	if (userSelection.getRangeAt)
	  var range = userSelection.getRangeAt (0);
	else {
	  var range = document.createRange ();
	  range.setStart (userSelection.anchorNode, userSelection.anchorOffset);
	  range.setEnd (userSelection.focusNode, userSelection.focusOffset);
	}
	// And the HTML:
	var clonedSelection = range.cloneContents ();
	var div = document.createElement ('div');
	div.appendChild (clonedSelection);
	return div.innerHTML;
  } else if (document.selection) {
	// Explorer selection, return the HTML
	userSelection = document.selection.createRange ();
	return userSelection.htmlText;
  } else {
	return '';
  }
}


chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection")
    sendResponse({data: window.getSelectionHTML()});
  else
    sendResponse({}); // snub them.
});



