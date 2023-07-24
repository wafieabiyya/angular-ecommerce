import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    //alogrithm
    //1. checking if there is already item in the cart
    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem | undefined;

    if (this.cartItems.length > 0) {
      //2. find item by id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)
      //3. check, is product founded
      alreadyExistInCart = (existingCartItem != undefined)
    }
    if (alreadyExistInCart) {
      //4. increment the product
      existingCartItem!.quantity++
    } else {
      // 5. adding new product into array
      this.cartItems.push(theCartItem)
    }
    //6.calculate the total
    this.computeCartTotal();
  }

  //calculate method
  computeCartTotal() {
    let totalPriceValue: number = 0.0;
    let totalQuantityValue: number = 0

    for (let currentItem of this.cartItems) {
      totalPriceValue += currentItem.quantity * currentItem.unitPrice;
      totalQuantityValue += currentItem.quantity;
    }

    //publishing new value data from totalprice and total quantity
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Content Of The Car: ');

    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`Name: ${tempCartItem.name}, Quantity: ${tempCartItem.quantity}, Price: ${tempCartItem.unitPrice}`)
    }
    console.log(`Total Price: ${totalPriceValue.toFixed(2)}, Total Quantity: ${totalQuantityValue}`);
    console.log('---');
  }

  decrementQuantity(cartItem: CartItem){
    cartItem.quantity--

    if(cartItem.quantity == 0){
      this.removeItem(cartItem);
    }else{
      this.computeCartTotal();
    }
  }

  removeItem(cartItem: CartItem){
    //get indexes from array
    
    for(let tempCartItem of this.cartItems){
      const itemIndex = this.cartItems.findIndex(
        tempCartItem => tempCartItem.id == cartItem.id
      )

      //if founded, delete item from array by index
      if(itemIndex > -1){
        this.cartItems.splice(itemIndex, 1);
        this.computeCartTotal();
      }
    }
  }
}
