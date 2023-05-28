document.addEventListener('DOMContentLoaded', () => {
  const updatePopupContent = (summary) => {
    const summaryElement = document.getElementById('summary');
    summaryElement.textContent = summary;
  };

  const fetchPage = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { method: 'fetchPage', tabId: tabs[0].id },
        (response) => updatePopupContent(response.summary || 'No summary available')
      );
    });
  };

  const checkButton = document.getElementById('check');
  checkButton.addEventListener('click', fetchPage);
});