import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    SideBarComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productsList:any[]=[]
  displayedColumns: string[] = ['Photo','Nom', 'Description', 'Unité', 'Prix Unitaire','Validé','Action'];
  constructor(
    private productService: ProductService,
  ){
    this.productService.getAll().subscribe(productAll=>{
      this.productsList = productAll;
    })
  }
  deleteProduct(productId:string){

  }
}
