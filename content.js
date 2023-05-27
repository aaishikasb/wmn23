chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.method == "fetchPage"){
            sendResponse({text: document.body.innerText, method: "fetchPage"}); //same as innerText
        }
    }
);