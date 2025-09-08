import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Journal } from 'src/app/shared/models/Journal';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Product } from 'src/app/shared/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { IUserRegister } from 'src/app/shared/Interfaces/IUserRegister';
import { SiteService } from 'src/app/services/site.service';
import { MatTabsModule } from '@angular/material/tabs';
import { Site } from 'src/app/shared/models/Sites';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { DepotItem } from 'src/app/shared/models/DepotItem';
import { DepotItemService } from 'src/app/services/depot-item.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [
    HeaderComponent,
    // NgFor,
    // NgIf,
    // NgModel,
    FormsModule,
    ReactiveFormsModule,
    DefaultButtonComponent,
    // TextInputComponent,
    UpperCasePipe,
    RouterLink,
    MatTabsModule,
  ],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {
  subscriptions : Subscription[] = []
  depotId !: string;
  typeES !: string;
  isEmpty :boolean = true;
  produitsAdeposer : any[] = [];
  montantTotal : number = 0;
  articles : Product[]=[]
  currentUser : any ;
  currentSite !:Site;
  theProduct : any;
  theProductId : string = "";
  siteOwner !:any;
  returnUrl !: string;
  depotItemStock : any[] = [];
  currentItemStock : any;
  cartItemsHolder : any[]=[];
  imageDisplayed : string = "";
  itemToStock : any;
  isLoged : boolean = true; 

  constructor(
    private userService:UserService,
    private transactionservice:TransactionService,
    private formBuilder : FormBuilder,
    private activatedRoute : ActivatedRoute, 
    private productService : ProductService,
    private siteService : SiteService,
    private router : Router,
    private notificationService : NotificationService,
    private depotItemService : DepotItemService,  
  ){}

  ngOnInit(): void {
    this.itemToStock = {
      productId : this.theProductId,
      quantity : 0,
      price : 0,
      currentDepotId : this.depotId,      
    }


    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || 'home';
    this.currentUser = this.userService.getUserFromLocalStorage();
    this.activatedRoute.params.subscribe(params =>{
      this.depotId=params['depotId'];
      this.theProductId = params['productId'];
      if (this.theProductId) {
        this.depotItemService.getAllByProductId(this.theProductId).subscribe(currentItemStock=>{
          if (currentItemStock) {
            this.currentItemStock = currentItemStock;
          }else{
            this.currentItemStock = 0;
          }
        })
      }
      this.productService.getProductById(this.theProductId).subscribe(theProduct=>{
        this.theProduct=theProduct;
        this.imageDisplayed = this.theProduct.productImage[0];
      })
      this.siteService.getSiteById(this.depotId).subscribe(currentSite =>{
        this.currentSite = currentSite;
        this.userService.getUserByUserId(this.currentSite.siteUserID).subscribe(result=>{
          this.siteOwner = result;
        })
      })
    })
  }
  NouveauProduit(){
    this.router.navigateByUrl("/user-products/add")
  }
    
  
  selectImage(image:string){
    this.imageDisplayed = image;
  }

  changeCartItemQuantity(CartItemQuantity:number){
    this.itemToStock.quantity = CartItemQuantity;
    this.calculTotal();
  }
  changeCartItemPrice(CartItemPrice:number){
    this.itemToStock.price = CartItemPrice;
    this.calculTotal();
  }

  qtUp(){
    this.itemToStock.quantity++;
    this.changeCartItemQuantity(this.itemToStock.quantity);
  }

  qtDown(itemQte:number){
    if (itemQte > 1) {
      this.itemToStock.quantity--;
      this.changeCartItemQuantity(this.itemToStock.quantity);
    }
  }

  insertQty(itemCartItemQuantity : string){
    const intItemCartItemQuantity = parseInt(itemCartItemQuantity);
    this.changeCartItemQuantity(intItemCartItemQuantity);
  }
  insertPrice(itemCartItemPrice : string){
    const intItemCartItemPrice = parseInt(itemCartItemPrice);
    this.changeCartItemPrice(intItemCartItemPrice);
  }
  calculTotal(){
    this.montantTotal = this.itemToStock.price * this.itemToStock.quantity;
    console.log(this.montantTotal);
  }
  
  submit(){
    let depotItemData:DepotItem = {
      productId : this.theProductId,
      stock: this.itemToStock.quantity,
      price   : this.itemToStock.price,
      lastUpdate : new Date(),
      currentDepotId : this.depotId,
    }
    this.depotItemService.add(depotItemData).subscribe(_=>{
      console.log("Produit Stocker !")
      this.productService.updateProduct(depotItemData.productId,{isStocker:true}).subscribe(_=>{
        this.router.navigateByUrl('user-products');
      })
      // Ajouter popup pour revenir à la liste de produit
      this.notificationService.openNotificationDialog(
        "Produit Stocké",
        "Produit stocké avec succès",
        'user-products',
        false
      )
    })
  }
}
