chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.method == "fetchPage"){
            sendResponse({text: document.querySelector('[data-testid="tweetText"]').innerText, method: "fetchPage"}); //same as innerText
            var tweetTextElement = document.querySelector('[data-testid="tweetText"]').innerText;
            console.log(tweetTextElement);
        }
    }
);