
console.log('running background script');

// chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//       console.log(response);
//   });
// }); 

// In your content script (content.js or similar)
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // Handle the message
//   console.log("Received message from popup:", message);

//   // You can optionally send a response back to the sender (popup script)
//   sendResponse({response: "Message received by content script!"});

//   chrome.runtime.sendMessage({thing: 'from background'}, response => console.log('from content: ', response));
// });