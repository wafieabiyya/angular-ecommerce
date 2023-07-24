import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service'; 

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})


export class ProductDetailsComponent implements OnInit {

  product!: Product;

  constructor(private _productService: ProductService,
              private _cartService: CartService, 
              private _route: ActivatedRoute) {

     }

  ngOnInit(): void {
    this._route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  //handle product details
  handleProductDetails(){
    //get product detail with id from products
    const productId = +this._route.snapshot.paramMap.get('id')!;
    
    this._productService.getProductDetails(productId).subscribe(
      data => {
        this.product = data;
      }
    )
  }
  addToCart(product: Product) {
    console.log(`Adding To Cart: ${product.name}, ${product.unitPrice}`);
    const theCartItem = new CartItem(product);
    
    this._cartService.addToCart(theCartItem);
  }
}
