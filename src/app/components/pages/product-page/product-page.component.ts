import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CurrencyPipe } from '@angular/common';
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CurrencyPipe, DefaultButtonComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{
  theProduct:any;
  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
  ){
    this.activatedRoute.params.subscribe(params=>{
      this.productService.getProductById(params['id']).subscribe(productDist =>{
        this.theProduct=productDist;
      })
    })
  }

  ngOnInit(): void {
    
  }
  addtoCart(){

  }
}
