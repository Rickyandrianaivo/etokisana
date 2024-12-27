import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    TextInputComponent,
    DefaultButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit{
readonly productCategory = new FormControl();
  fileName = "";
  addProductForm!: FormGroup;
  isSubmitted = false;
  product : Product = new Product();
  currentUserEmail: string ="";
  productID!:string;
  selectedProduct!:Product
  constructor(
    private productService:ProductService,
    private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private activatedRoute:ActivatedRoute
  ){
    this.activatedRoute.params.subscribe((params)=>{
      this.productID=params['id']
      console.log(this.productID)
      if (this.productID) {
        this.productService.getProductById(this.productID).subscribe(theproduct=>{
          this.selectedProduct = theproduct;
          console.log(this.selectedProduct)
        })
      }
    })
    this.currentUserEmail  = this.userService.getUserFromLocalStorage().userEmail;
  }

  ngOnInit() : void {
    this.addProductForm = this.formBuilder.group({
      productName:[this.selectedProduct.productName,Validators.required],
      productDescription:[this.selectedProduct.productDescription,Validators.required],
      productPrice:[this.selectedProduct.productPrice,Validators.required],
      productCategory:[this.selectedProduct.productCategory],
      productUnite:[this.selectedProduct.productUnite],
      productStock:[this.selectedProduct.productStock],
      productState:[this.selectedProduct.productState],
      productSource:[this.selectedProduct.productSource],
    })
  }

  onFileSelected(event:Event) {
    let htmlInputElement = <HTMLInputElement>event.target!;
    const file = htmlInputElement.files ? htmlInputElement.files[0] :null;
    
    if (file) {

        this.fileName =file.name;

        const formData = new FormData();

        formData.append("file", file);

        this.productService.uploadFile(formData).subscribe();
    }
  }
  get fc(){
    return this.addProductForm.controls;
  }
  submit(){
    this.isSubmitted =true;
    if (this.addProductForm.invalid){ 
        console.log(this.addProductForm.getError);
        return;
      }
    
    const fv = this.addProductForm.value;
    // console.log(fv.userName);
    this.product = {
      productName       :fv.productName,
      productDescription:fv.productDescription,
      productPrice      :fv.productPrice,
      productCategory   :fv.productCategory,
      productUnite      :fv.productUnite,
      productStock      :fv.productStock,
      productState      :"en attente",
      productSource     :fv.productSource,
      productImage      :this.fileName,
      productOwner      :this.currentUserEmail,
    };
    // console.log(this.user);
    this.productService.updateProduct(this.product).subscribe(_ => {
      alert("Produit mis à jour avec succés!");
      this.router.navigateByUrl("user-products");
    })
  }
}