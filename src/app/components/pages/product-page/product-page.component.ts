import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { NgIf } from '@angular/common';
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";
import { HeaderComponent } from '../../partials/header/header.component';
import { CartService } from 'src/app/services/cart.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    DefaultButtonComponent,
    HeaderComponent,
    NgIf,
    MatTabsModule,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{
  theProduct:any;
  productId!:string;
  productImage:any[]=[];
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
        this.productImage=productDist.productImage;
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
      productCategory: this.theProduct.productCategory,
      productState: this.theProduct.productState,
      productImage: this.theProduct.productImage,
      productValidation : this.theProduct.productValidation,
      productPoids : this.theProduct.productPoids,
      productVolume : this.theProduct.productVolume,
      productHauteur : this.theProduct.productHauteur,
      productLongueur : this.theProduct.productLongueur,
      productLargeur : this.theProduct.productLargeur,
    }
    this.cartService.addToCart(this.theProduct);
    this.router.navigateByUrl('/cart-page');
  }
}
