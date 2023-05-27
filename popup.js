document.addEventListener('DOMContentLoaded', function() {
    var checkButton = document.getElementById('check');
    checkButton.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {method: "fetchPage"}, function(response) {
            if(response.method == "fetchPage"){
              alert(response.text);
            }
          });
        });
    }, false);
  }, false);