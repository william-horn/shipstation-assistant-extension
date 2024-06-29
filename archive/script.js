console.log('loaded popup script', chrome)

function Product() {
  this.weight = 0;
  this.handlingCost = 0;
}

const Jar = new Product({ weight: 8.5, handlingCost: 0.5 })
const Bar = new Product({ weight: 1.8, handlingCost: 0.5 })
const Mini = new Product({ weight: 3, handlingCost: 1 })

// * create a custom pop-up window in a separate window
// let popupWindow = window.open(
//   chrome.runtime.getURL("./popup/main.html"),
//   "exampleName",
//   "width=400,height=400"
// );

// // close the Chrome extension pop-up
// window.close(); 
