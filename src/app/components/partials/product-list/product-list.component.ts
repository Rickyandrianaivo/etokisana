import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../shared/models/Product';
import { NgFor } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor,ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productList:Product[] = []

  @Input()  state:string="";
  @Input() category!:string
  @Output() categoryChange = new EventEmitter<string>();
  


  constructor(
    private productService : ProductService
  ){
    
  }
  ngOnInit(){
    if (this.state == "") {
      this.productList = this.productService.getAll()
    }
    if (this.state == "Offre speciale" && this.category=="") {
      this.productList = this.productService.getOffreSpecial()
    }
    if (this.category !="") {
      this.productList = this.productService.getByCat(this.category)
    }
    if(this.category == ""){
      this.productList = this.productService.getAll();
    }
  }
  CatSelection(selectedCat:string){
    this.categoryChange.emit(this.category);
  }
}
