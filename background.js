checkButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { method: 'fetchPage', tabId: tabs[0].id },
        (_) => {
          chrome.runtime.sendMessage({ type: 'getStoredSummary', tabId: tabs[0].id }, (response) => {
            updatePopupContent(response.summary);
          });
        }
      );
    });
  });