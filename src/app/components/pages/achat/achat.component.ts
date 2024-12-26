import { Component } from '@angular/core';
import { ProductListComponent } from '../../partials/product-list/product-list.component';
// import { CategoryListComponent } from '../../partials/category-list/category-list.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenavModule} from '@angular/material/sidenav';
import { NgFor } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import { ProductCategory } from '../../../shared/models/ProductCategory';
import { Route, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../shared/models/Product';
import { ProductItemComponent } from "../../partials/product-item/product-item.component";

@Component({
  selector: 'app-achat',
  standalone: true,
  imports: [
    // ProductListComponent,
    MatSidenavModule,
    MatDrawerContainer, MatDrawerContent, MatDrawer,
    // CategoryListComponent,
    NgFor,
    ProductItemComponent
],
  templateUrl: './achat.component.html',
  styleUrl: './achat.component.css'
})
export class AchatComponent {
  categoryName:string ="Vehicule";
  categoryList:ProductCategory[]=[];
  productList: Product[]=[];
  offreSpecialeList:Product[]=[];
  constructor(
    private categoryService:CategoryService,
    private router : Router,
    private productService:ProductService,
  ){
    
  }
  ngOnInit(){
    this.categoryList=this.categoryService.getAll();
    this.productList = this.productService.getAll();
    this.offreSpecialeList = this.productService.getOffreSpecial();
  }
  setCategory(category :string){
    this.categoryName = category;
    this.productList= this.productService.getByCat(category);
  }

}
