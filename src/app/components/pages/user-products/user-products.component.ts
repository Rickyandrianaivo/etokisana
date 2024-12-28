import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../services/product.service';
import { UserService } from '../../../services/user.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-products',
  standalone: true,
  imports: [MatTableModule,
    RouterLink,
    MatIconModule],
  templateUrl: 'user-products.component.html',
  styleUrl: 'user-products.component.css'
})
export class UserProductsComponent implements OnInit{
  displayedColumns: string[] = ['Thumbnail','Nom', 'Description', 'Unité', 'Stock','Prix Unitaire','Action'];
  dataSource : Product[] = [];
  currentUserEmail!:string ;

  constructor(
    private productService:ProductService,
    private userService :UserService,
  ){
    this.currentUserEmail =this.userService.getUserFromLocalStorage().userEmail;
  }
  ngOnInit(){
    this.productService.getProductByOwner(this.currentUserEmail).subscribe(productFromServer=>{
      this.dataSource = productFromServer;
    })
  }
}
