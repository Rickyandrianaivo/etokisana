import { Component } from '@angular/core';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { ProductService } from 'src/app/services/product.service';
// import { DepotItem } from 'src/app/shared/models/DepotItem';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DefaultButtonComponent,
    RouterLink,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productList: any[]=[];
  constructor(private router:Router,
    private productservice:ProductService,
  ){
    this.productservice.getAllDeptoItem().subscribe(allproduct=>{
      // this.productList =allproduct.filter(filteredProduct=> filteredProduct.productValidation == true && filteredProduct.isStocker == true )
      this.productList=allproduct;
    })
  }
  registerbutton(){
      this.router.navigateByUrl('achat')
      console.log("hit the button")
  }
}
