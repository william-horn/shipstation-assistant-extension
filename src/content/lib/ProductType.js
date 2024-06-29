/*
  ProductTypes: A comprehensive mapping of product data to product type
*/
export default {
  Jar: {
    handlingCost: 0.5,
    caseWeight: 8.15,
    singleWeight: 1.38,
    name: 'Jar',
    unit: 6,
    slotSpace: [1],
  },

  Mini: {
    handlingCost: 1,
    caseWeight: 6,
    singleWeight: 0.5,
    name: 'Mini',
    unit: 12,
    slotSpace: [2, 0.5]
  },

  Bar: {
    caseWeight: 2,
    singleWeight: 0.167,
    handlingCost: 0.5,
    weight: 1.8,
    name: 'Bar',
    unit: 12,
    slotSpace: [0.5],
  },

  NotFound: {
    handlingCost: 0,
    weight: 0,
    name: 'NotFound',
    unit: 1,
    slotSpace: [0],
  }
}