import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product-service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false

  // new props for page
  pageNumber: number = 1;
  pageSize: number = 3;
  totalElements: number = 0

  constructor(private _productService: ProductService,
    private _cartService: CartService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this._route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.hanldeSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  hanldeSearchProducts() {
    const theKeyword: string = this._route.snapshot.paramMap.get('keyword')!;

    this._productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleSearchProductsPaginate() {
    const theKeyword: string = this._route.snapshot.paramMap.get('keyword')!

    this._productService.searchProdctsPagination(
      theKeyword,
      this.pageNumber - 1,
      this.pageSize).subscribe(
        data => {
          this.products = data._embedded.products;
          this.pageNumber = data.page.number;
          this.pageSize = data.page.size;
          this.totalElements = data.page.totalElements;
        }
      )
  }

  handleListProducts() {
    const hasCategoryId: boolean = this._route.snapshot.paramMap.has('id')

    if (hasCategoryId) {
      this.currentCategoryId = +this._route.snapshot.paramMap.get('id')!;
      this._productService.getProductList(this.currentCategoryId).subscribe(
        data => {
          this.products = data
        }
      )
    } else {
      this._productService.getProductListPaginate(this.pageNumber - 1, this.pageSize).subscribe(
        data => {
          this.products = data._embedded.products;
          this.pageNumber = data.page.number + 1
          this.pageSize = data.page.size;
          this.totalElements = data.page.totalElements
        }
      )
    }
  }

  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1
    this.listProducts();
  }

  addToCart(product: Product) {
    console.log(`Adding To Cart: ${product.name}, ${product.unitPrice}`);
    const theCartItem = new CartItem(product);
    
    this._cartService.addToCart(theCartItem);
  }
}