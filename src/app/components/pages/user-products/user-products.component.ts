import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../services/product.service';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
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
  OwnerId!:string

  constructor(
    private productService:ProductService,
    private userService :UserService,
    private router:Router,
    // private activated
  ){
    this.currentUserEmail =this.userService.getUserFromLocalStorage().userEmail;
    this.userService.getUserByEmail(this.currentUserEmail).subscribe((userServer:any) =>{
      this.OwnerId = userServer._id
      this.productService.getProductByOwner(this.OwnerId).subscribe(productFromServer=>{
      this.dataSource = productFromServer;
    })
    })
  }
  ngOnInit(){
  }
  deleteProduct(productId:string){
    this.productService.deleteProduct(productId).subscribe(_=>{
      alert("Produit retirer avec succés !")
      this.router.navigateByUrl('user-products')
    });
  }
}
