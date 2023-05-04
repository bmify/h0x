document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('scrapeButton').addEventListener('click', function() {
      chrome.runtime.sendMessage({type: 'scrapeOrder'}, function(response) {
        alert('Order data scraped successfully! Check your new tab for the formatted data.');
      });
    });
  });
  