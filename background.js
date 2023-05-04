chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab to scrape the order data
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'scrapeOrder'}, function(response) {
      // Create a new tab with the formatted order data
      chrome.tabs.create({url: 'about:blank'}, function(newTab) {
        chrome.tabs.executeScript(newTab.id, {code: `document.write('<pre>${response}</pre>')`});
      });
    });
  });
});
