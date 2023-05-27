chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.method == "fetchPage") {

      var tweetTextElement = document.querySelector('[data-testid="tweetText"]').innerText;
      console.log(tweetTextElement);
      var suffix = "Can you give more context on - "
      var openText = suffix.concat(tweetTextElement);
      console.log(openText);

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
          "messages": [{ "role": "user", "content": openText }]
        }),
      })
        .then(response => response.json())
        .then(data => {
          var openOutput = data.choices[0].message.content;
          console.log(openOutput);
          sendResponse({ text: (openOutput), method: "fetchPage" });
        })
        .catch(error => console.error(error));
    };
  });