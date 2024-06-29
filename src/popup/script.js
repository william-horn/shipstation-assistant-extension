// import UI from './lib/UI.js';

// UI.calculateBtn.addEventListener('click', async () => {
//   const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//   const response = await chrome.tabs.sendMessage(tab.id, { 
//     request: 'parseOrder'
//   });

//   if (response.status !== 200) throw Error(response.payload);

//   const orderData = response.payload;

//   console.log('order data: ', orderData);
//   UI.jarCases.textContent = 'testingggg';
// })
