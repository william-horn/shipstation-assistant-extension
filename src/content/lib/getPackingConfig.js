
const productPrototype = {
  getTotal() {
    return this.getJars() + this.getBars() + this.getMinis();
  }, 

  getJars() {
    return this
  }
}

/*
  @function: getPackingConfig()
  @desc: 
*/
export const getPackingConfig = (ProductTypes, products) => {
  const box = Object.create(productPrototype);

  while (box.getTotal() > 0) {
    const jar = box.remove(ProductTypes.Jar, 1);
    const bar = box.remove(ProductTypes.Bar, 4);
    const mini = box.remove(ProductTypes.mini, 5);
  }
}

