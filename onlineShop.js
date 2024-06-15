class OnlineShop {
  warehouseSPace;
  products = [];
  sales = [];

  constructor(warehouseSPace) {
    this.warehouseSPace = warehouseSPace;
  }

  loadingStore(product, quantity, spaceRequired) {
    //TODO:
    //The product is of type string,
    //while the spaceRequired and quantity are of type number.
    //If there is not enough space in the warehouse for the new product, throw an Error:
    //"Not enough space in the warehouse."
    //Otherwise, this function should add the product with the properties:
    //product and quantity to the products array,
    //reduce the space available with the space required by the product, and return:
    //"The {product} has been successfully delivered in the warehouse."
    //NOTE: Product names will be unique.
    //We check if the space we have is enough, if not throw error

    if (this.warehouseSPace < spaceRequired) {
      throw new Error(`Not enough space in the warehouse.`);
    }
    
    const data = this.products.find((p) => p.product == product);

    if (data) {
      data.quantity+=quantity;
    }else(this.products.push)({
      product,
      quantity,
    });

    //we lose space from the total space
    this.warehouseSPace -= spaceRequired;

    return `The ${product} has been successfully delivered in the warehouse.`;
  }

  quantityCheck(product, minimalQuantity) {
    //TODO:
    //The quantity is of type number.

    //If the product is not found, throw an Error:
    //"There is no {product} in the warehouse."

    //If the received minimalQuantity is less than or equal to 0, throw an Error:
    //"The quantity cannot be zero or negative."

    //If the received minimalQuantity is less or equal to the product quantity
    //in the warehouse, return:
    //"You have enough from product {product}."

    //Otherwise, this function should replace the value of product
    //quantity with a minimalQuantity value and return:
    //"You added {difference} more from the {product} products."
    //Difference is the number between the minimum quantity and the product quantity.

    const data = this.findProduct(product);

    if (minimalQuantity <= 0) {
      throw new Error(`The quantity cannot be zero or negative.`);
    }

    if (data.quantity >= minimalQuantity) {
      return `You have enough from product ${product}.`;
    } else {
      const difference = minimalQuantity - data.quantity;
      data.quantity = minimalQuantity;
      return `You added ${difference} more from the ${product} products.`;
    }
  }

  sellProduct(product) {
    //TODO:
    //If the product is not found, throw an Error:
    //"There is no {product} in the warehouse."
    //Otherwise, this function should decrement by 1 the product quantity from the product
    //in the products array, add it to sales
    //with properties {product} and {1} for quantity, and return:
    //"The {product} has been successfully sold."

    const data = this.findProduct(product);

    data.quantity--;

    this.sales.push({
      product,
      quantity: 1,
    });
    return `The ${product} has been successfully sold.`;
  }

  revision() {
    //TODO:
    //This method should return the complete information about the shop:
    //If nothing is sold, throw an Error:
    //"There are no sales today!"
    //Otherwise, return how many sales you have:
    //"You sold {sales} products today!"
    //On the second line:
    //"Products in the warehouse:"
    //On the new line, display information about each product in the warehouse:
    //"{product}-{quantity} more left"

    if (this.sales.length == 0) {
      throw new Error(`There are no sales today!`);
    }

    const result = [
      `You sold ${this.sales.length} products today!`,
      `Products in the warehouse:`,
    ];
    for (let { product, quantity } of this.products) {
      result.push(`${product}-${quantity} more left`);
    }
    return result.join("\n");
  }

  findProduct(product) {
    const data = this.products.find((p) => p.product == product);

    if (!data) {
      throw new Error(`There is no ${product} in the warehouse.`);
    }

    return data;
  }
}
const myOnlineShop = new OnlineShop(500);

console.log(myOnlineShop.loadingStore("headphones", 10, 200));

console.log(myOnlineShop.loadingStore("laptop", 5, 200));

console.log(myOnlineShop.loadingStore("TV", 40, 500));
