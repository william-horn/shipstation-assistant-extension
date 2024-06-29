console.log('loaded popup script', chrome);

// get HTML elements
const jarCasesEl = document.getElementById('jar-cases');
const barCasesEl = document.getElementById('bar-cases');
const miniCasesEl = document.getElementById('mini-cases');

const shippingCostEl = document.getElementById('shipping-cost');
const handlingCostEl = document.getElementById('handling-cost');
const totalCostEl = document.getElementById('total-cost');

const calculateButtonEl = document.getElementById('calculate');

calculateButtonEl.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, { 
    request: 'parseOrder'
  });

  if (response.status !== 200) throw Error(response.payload);

  const orderData = response.payload;

  console.log('order data: ', orderData);
})
