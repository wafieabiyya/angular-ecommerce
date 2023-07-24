import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})

export class CartDetailsComponent implements OnInit{
  cartItems: CartItem[] = [];
  totalPrice: number = 0.0
  totalQuantity: number = 0

  constructor(private _cartService: CartService){}

  ngOnInit(): void {
      this.listCartDetails();
  }

  listCartDetails(){
    //put data in cart item from cart service into array 
    this.cartItems = this._cartService.cartItems;

    //subscribe to cart totalPrice
    this._cartService.totalPrice.subscribe(
      data =>this.totalPrice = data
    );

    //subscribe to cart totalQuantity
    this._cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
    
    //calculate cart total price & total quantity
    this._cartService.computeCartTotal();
  }

  incrementQuantity(cartItem: CartItem){
    this._cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem){
    this._cartService.decrementQuantity(cartItem);
  }

  removeItem(cartItem: CartItem){
    this._cartService.removeItem(cartItem);
  }
}
