/*
  @author: William J. Horn
  @desc: Parsing rules for obtaining and processing raw webpage data.

  Currently this plugin only supports orders that involve Bars, Jars, and Minis
  for wholesale, which don't include sample products or bulk product.

  todo:
    - Fix issue with float rounding
    - Add support for Bulks
    - Add support for Sample products
*/

import { getNumberComponents } from './math.js';
import ProductType from './ProductType.js';
import { getPackingConfig } from './getPackingConfig.js';

/*
  @function: getProductType()
  @desc: Parses the raw input string of a product SKU and returns what type of product it is.
  @param: rawString<string>
  @return: productType<string>
*/
export const getProductType = (rawString) => {
  if (rawString.match('13OZ')) return ProductType.Jar;
  if (rawString.match('MINI')) return ProductType.Mini;
  if (rawString.match('BAR')) return ProductType.Bar;

  return ProductType.NotFound;
};

/*
  @function: parseItems()
  @desc: Parses the shipstation HTML
*/
export const parseOrder = () => {
  // outer HTML of shipstation order list
  const outerList = document.querySelector('.react-table-wrapper-uZ_76Y3');
  const innerList = outerList.querySelector('div[role="rowgroup"]');
  const itemList = innerList.querySelectorAll('.react-table-body-row-icH4FVD'); 

  // shipstation rate estimate element & rate value (shipping & handling)
  let shippingRateLabel = document.querySelector('.rate-amount-R6LSuka');
  let shippingCost = 0;
  let totalWeight = 0;
  let totalHandling = 0;

  // if the first rate element doesn't exist, then the order has already been shipped
  if (!shippingRateLabel) {
    shippingRateLabel = document.querySelector('p[aria-describedby="rate-card-label-cost"]');

    // if no shipping rate label exists at all then error
    if (!shippingRateLabel) throw Error('Could not find ShippingRateLabel element');
  }

  // use substring on existing rate value due to dollar sign in the string
  // for ex the textContent looks like: '$10.34'
  shippingCost = Number(shippingRateLabel.textContent.substring(1));

  if (isNaN(shippingCost)) {
    shippingCost = 'Not Found';
  }

  // product list mapping product type to total quantity
  /*
    products = {
      'Jar': {
        caseAmount: 3,
        remaining: 4
      }
    }
  */
  const products = {};

  // iterate through the element item list and parse HTML for relevant product data
  for (const item of itemList) {

    // item label and quantity elements
    const itemLabel = item.querySelector('.item-sku-ONq0BTI'); 
    const itemQuant = item.querySelector('.quantity-text-UmGFNkF'); 

    // beyond this point, itemLabel and itemQuant exists
    if (!itemLabel || !itemQuant) throw Error('ItemLabel or ItemQuantity element does not exist');

    // get the product type
    const productType = getProductType(itemLabel.textContent);
    const productQuantity = Number(itemQuant.textContent.replaceAll(',', ''));

    // exclude any invalid product types from the final product output
    // if (productType === ProductType.NotFound) {
    //   continue;
    // };

    // beyond this point, itemValue is a valid number
    if (isNaN(productQuantity)) throw Error('ProductQuantity could not be converted to a number');

    let productQuant = products[productType.name];

    // create the product data if not exists
    if (typeof(productQuant) !== 'object') {
      products[productType.name] = {
        caseAmount: 0,
        remaining: 0,
        original: 0,
        handlingCost: 0,
        weight: 0,
        type: productType,
      };

      productQuant = products[productType.name];
    }

    // increase the count of the product quantity
    productQuant.original += productQuantity;
  };


  // convert product quantities to product case amount and product remaining
  for (const productName in products) {
    const productQuant = products[productName];
    const productType = productQuant.type;

    let quant = getNumberComponents(productQuant.original/productType.unit, productType.unit);

    //* note: handling cost currently does not account for remaining 6-pack mini jars
    //* handling should be excluded for remaining SAMPLE product - but should be added for remaining non-sample products that sum to a case amount
    productQuant.caseAmount = quant.whole;
    productQuant.remaining = quant.remaining;
    productQuant.handlingCost = productType.handlingCost*productQuant.caseAmount;
    productQuant.weight = productType.caseWeight*productQuant.caseAmount + productType.singleWeight*productQuant.remaining;

    totalWeight += productQuant.weight;
    totalHandling += productQuant.handlingCost;
  };

  return {
    products,
    shippingCost,
    totalWeight,
    totalHandling,
    totalShipping: totalHandling + shippingCost,
    orderName: 'N/A',
  };
};

export const parseOrder__test = () => {
  const orderNames = [
    'Central Market - Huston',
    'Etaly',
    'Loco Pops',
    'Farm to People',
    'Ace Hardware'
  ];

  const shippingCost =  Math.floor(Math.random()*23);
  const totalHandling = Math.floor(Math.random()*10);

  const products = { 
    Jar: {
      caseAmount: Math.floor(Math.random()*21),
      remaining: Math.floor(Math.random()*5),
      handlingCost: Math.floor(Math.random()*45),
      weight: Math.floor(Math.random()*97)
    }, 
    Bar: {
      caseAmount: Math.floor(Math.random()*7),
      remaining: Math.floor(Math.random()*2),
      handlingCost: Math.floor(Math.random()*13),
      weight: Math.floor(Math.random()*23)
    }, 
    Mini: {
      caseAmount: Math.floor(Math.random()*10),
      remaining: Math.floor(Math.random()*6),
      handlingCost: Math.floor(Math.random()*27),
      weight: Math.floor(Math.random()*45)
    }
  }

  return {
    products,
    shippingCost,
    totalHandling,
    totalShipping: shippingCost + totalHandling,
    totalWeight: Math.floor(Math.random()*103),

    orderName: orderNames[Math.floor(Math.random()*(orderNames.length - 1))],

    // packingConfig: getPackingConfig(ProductType, products)
  }
}