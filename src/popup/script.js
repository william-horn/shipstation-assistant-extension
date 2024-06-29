import UI from './lib/UI.js';

UI.processOrderBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, { 
    request: 'parseOrder'
  });

  // check if response is valid
  if (response.status !== 200) throw Error(response.payload);

  // get the order data
  const orderData = response.payload;
  console.log('order data: ', orderData);

  // Update the UI
  UI.orderName.textContent = orderData.orderName;

  UI.jarCases.textContent = orderData.products.Jar.caseAmount;
  UI.barCases.textContent = orderData.products.Bar.caseAmount;
  UI.miniCases.textContent = orderData.products.Mini.caseAmount;
  
  UI.shippingCost.textContent = '$' + orderData.shippingCost;
  UI.handlingCost.textContent = '$' + orderData.totalHandling;
  UI.totalCost.textContent = '$' + orderData.totalShipping;
})
