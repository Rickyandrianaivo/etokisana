import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CurrencyPipe } from '@angular/common';
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";
import { HeaderComponent } from '../../partials/header/header.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CurrencyPipe, DefaultButtonComponent,
    HeaderComponent
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{
  theProduct:any;
  productId!:string;
  constructor(
    private productService:ProductService,
    private cartService : CartService,
    private activatedRoute:ActivatedRoute,
    private router : Router,
  ){
    this.activatedRoute.params.subscribe(params=>{
      this.productId = params['id'];
      this.productService.getProductById(params['id']).subscribe(productDist =>{
        this.theProduct=productDist;
      })
    })
  }

  ngOnInit(): void {
    
  }
  addtoCart(productId:string){
    productId = this.productId;
    this.theProduct ={
      id: this.productId,
      productName:this.theProduct.productName,
      productDescription: this.theProduct.productDescription,
      productPrice: this.theProduct.productPrice,
      productCategory: this.theProduct.productCategory,
      productUnite: this.theProduct.productUnite,
      productStock: this.theProduct.productStock,
      productState: this.theProduct.productState,
      productSource: this.theProduct.productSource,
      productImage: this.theProduct.productImage,
      productOwner: this.theProduct.productOwner,
    }
    this.cartService.addToCart(this.theProduct);
    this.router.navigateByUrl('/cart-page');
  }
}
