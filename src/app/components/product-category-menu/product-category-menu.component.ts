import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product-service';


@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})

export class ProductCategoryMenuComponent implements OnInit {
  productCategories: ProductCategory[] =[];

  constructor(private _productService: ProductService){}

  ngOnInit(): void {
      this.listProductMenuCategories();
  }

  listProductMenuCategories(){
    this._productService.getProductMenuCategories().subscribe(
      data => {
        console.log('Product Categories = '+JSON.stringify(data));
        this.productCategories = data;
      }
    )
  }
}
