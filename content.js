window.tabSummaries = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const tabId = request.tabId;
  console.log("Received message:", request);

  if (request.method == "fetchPage") {
    var tweetTextElement = document.querySelector('div[lang]').innerText;
    var suffix = "Can you give more context on - ";
    var openText = suffix.concat(tweetTextElement);

    console.log("Tweet text:", tweetTextElement);
    console.log("OpenText:", openText);

    const apiKey = "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";
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": openText
          }]
      }),
    })
    .then(response => {
        console.log('API response:', response);
        return response.json();
      })
      .then(data => {
        var openOutput = "The Explanation is: "+data.choices[0].message.content;
        console.log("OpenAI output:", openOutput);
        
        chrome.runtime.sendMessage({ type: 'storeSummary', tabId: tabId, summary: openOutput });
        sendResponse({
          summary: openOutput,
          method: "fetchPage"
        });
      })
      .catch(error => console.error(error));
    return true;
  }
  if (request.type === 'getSummary') {
    const openOutput = window.tabSummaries[tabId];
    sendResponse({ summary: openOutput || "No summary available." });
    return true;
  }
});