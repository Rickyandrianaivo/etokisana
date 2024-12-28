import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../shared/models/Product';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    TextInputComponent,
    DefaultButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  readonly productCategory = new FormControl();
  fileName = "";
  addProductForm!: FormGroup;
  isSubmitted = false;
  product : Product = new Product();
  currentUserEmail: string =""

  constructor(
    private productService:ProductService,
    private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService
  ){
    this.currentUserEmail  = this.userService.getUserFromLocalStorage().userEmail;
    
  }

  ngOnInit() : void {
    this.addProductForm = this.formBuilder.group({
      productName:['',Validators.required],
      productDescription:['',Validators.required],
      productPrice:['',Validators.required],
      productCategory:[''],
      productUnite:[''],
      productStock:[''],
      productState:[''],
      productSource:[''],
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
    console.log(fv.userName);
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
    this.productService.addProduct(this.product).subscribe(_ => {
      alert("adding product successfully!");
      this.router.navigateByUrl("user-products");
    })
  }
}
