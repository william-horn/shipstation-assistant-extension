console.log('loaded popup script', chrome)

// get HTML elements
const jarCasesEl = document.getElementById('jar-cases');
const barCasesEl = document.getElementById('bar-cases');
const miniCasesEl = document.getElementById('mini-cases');

const shippingCostEl = document.getElementById('shipping-cost');
const handlingCostEl = document.getElementById('handling-cost');
const totalCostEl = document.getElementById('total-cost');

const calculateButtonEl = document.getElementById('calculate');

calculateButtonEl.addEventListener('click', () => {
  // Send a message to the content script to get the div content
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getDivContent" }, function(response) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        console.log("Content received from content script:", response.divContent);
        // Handle the received content here
      }
    });
  });
})


// Class constructors
function BoxType(info) {
  this.slots = info.slots || 0;
  this.inTermsOf = info.inTermsOf;
  this.name = info.name || "Box";
}

function Box(boxType) {
  this.type = boxType;
  this.slotCapacity = boxType;
  this.slotsUsed = 0;
  this.content = [];
}

function Product(info) {
  this.weight = info.weight;
  this.handlingCost = info.handlingCost;
  this.perUnit = info.perUnit;
  this.jarCaseRatio = info.jarCaseRatio;
}

// Instantiation
const JarCase = new Product({ 
  weight: 8.5, 
  handlingCost: 0.5, 
  perUnit: 6,
  jarCaseRatio: [1],
})

const BarCase = new Product({ 
  weight: 1.8, 
  handlingCost: 0.5, 
  perUnit: 12,
  jarCaseRatio: [0.5],
})

const MiniCase = new Product({ 
  weight: 3, 
  handlingCost: 1, 
  perUnit: 6,
  jarCaseRatio: [2, 0.5]
})

const Boxes = {}
Boxes.TwoThick = new BoxType({ slots: 4, inTermsOf: JarCase, name: '2-Thick' }); 
Boxes.OneThick = new BoxType({ slots: 2, inTermsOf: JarCase, name: '1-Thick' }); 
Boxes.Peanut = new BoxType({ slots: 10, inTermsOf: BarCase, name: 'Peanut' }); 
Boxes.SixJar = new BoxType({ slots: 5, inTermsOf: BarCase, name: '6 Jar' });
Boxes.FourJar = new BoxType({ slots: 3, inTermsOf: BarCase, name: '4 Jar' });

const UnitDataPrototype = {
  getTotal() {
    return this.getJars() + this.getBars() + this.getMinis();
  },

  getJars() {
    return this[JarCase];
  },

  getBars() {
    return this[BarCase];
  },

  getMinis() {
    return this[MiniCase];
  },

  remove(caseType, qty=1) {
    this[caseType] = Math.max(this[caseType] - qty, 0);
    return caseType;
  }
}

const getRawData = () => {
  const rawData = {};



  return rawData;
}

// Utility
const getUnitQuantity = (rawData) => {
  const unitQuantities = Object.create(UnitDataPrototype)

  for (let key in rawData) {
    const value = rawData[key];

    // todo: account for remainder after division here. this could manifest in cases where sample jars exist
    unitQuantities[key] = value/key.perUnit;
  }

  return unitQuantities;
}

const getPackingConfiguration = (rawData) => {
  const unitData = getUnitQuantity(rawData)

  const boxes = [];
  const box = null;
  // const products = [];

  while (unitData.getTotal() > 0) {
    //* pack cycle 
    let caseType = null;

    if (unitData.getJars() > 0) {
      caseType = unitData.remove(JarCase);

    } else if (unitData.getMinis() > 0) {
      caseType = unitData.remove(MiniCase);

    } else if (unitData.getBars() > 0) {
      caseType = unitData.remove(BarCase);

    }


  }
}

// const rawProductData = {
//   [MiniCase]: 42, // divide by unit -> 7
//   [BarCase]: 72, // divide by unit -> 6
//   [JarCase]: 60, // divide by unit -> 10
// }

// const packingConfig = getPackingConfiguration(rawData)