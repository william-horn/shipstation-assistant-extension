import { parseOrder, parseOrder__test } from './lib/parser.js';

const processMessageRequest = data => {
  switch (data.request) {
    case 'parseOrder':
      return { 
        status: 200,
        payload: parseOrder() 
      };

    default:
      return {
        status: 200,
        payload: 'Not Available'
      }
  }
}

// Handle message events
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse(processMessageRequest(message));
});


