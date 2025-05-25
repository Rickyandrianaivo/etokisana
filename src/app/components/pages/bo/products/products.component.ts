import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { MatTableModule } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

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
  logedUser : any;
  constructor(
    private productService: ProductService,
    private userService : UserService,
    private router : Router,
  ){
    this.logedUser = this.userService.getUserFromLocalStorage();
    this.userService.getUserByEmail(this.logedUser.userEmail).subscribe(userCurrent =>{
      if (userCurrent.userAccess != "Admin") {
        this.router.navigateByUrl('home')
      }
    });
    this.productService.getAll().subscribe(productAll=>{
      this.productsList = productAll;
    })
  }
  deleteProduct(productId:string){

  }
}
