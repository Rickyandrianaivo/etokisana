import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../shared/models/Product';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { TextareaComponent } from '../../partials/textarea/textarea.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { productCpc } from 'src/cpc-data';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
// import {MatStepperModule} from '@angular/material/stepper';

export interface Category{
  cpc : string;
  designation :string;
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    TextInputComponent,
    TextareaComponent,
    DefaultButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    HeaderComponent,
    NgIf,
    MatAutocompleteModule,
    AsyncPipe,
    // MatStepperModule,
],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})


export class AddProductComponent implements OnInit {
  // readonly section = new FormControl();
  // readonly division = new FormControl();
  // readonly groupe = new FormControl();
  // readonly classe = new FormControl();
  // readonly sousClasse = new FormControl();
  productCategory!:AbstractControl;
  
  fileName = "";
  addProductForm!: FormGroup;
  isSubmitted = false;
  product : Product = new Product();
  firstImage : string = "";
  productImage: string[] = [];
  currentUser :any;
  catCtrl = new FormControl('');
  listOfCategories : Category[]=productCpc;
  filteredCat: Observable<Category[]>;
  selected: any = "";

  constructor(
    private productService:ProductService,
    private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService
  ){
    // console.log(this.listOfCategories[0].designation);
    this.filteredCat = this.catCtrl.valueChanges.pipe(
      startWith(''),
      map(cat => (cat ? this._filterCats(cat): this.listOfCategories.slice())),
    )
    this.currentUser  = this.userService.getUserFromLocalStorage();

  }

  private _filterCats(value:string): Category[]{
    const filterValue = value.toLowerCase();
    console.log(this.listOfCategories.filter(category =>category.designation.length >=3 && category.designation.toLowerCase().includes(filterValue)))
    return this.listOfCategories.filter(category =>category.designation.length >=3 && category.designation.toLowerCase().includes(filterValue));
  }

  get productCategoryFormControl(){
    return this.productCategory as FormControl;
  }

  setCPC(codeCPC:string){
    this.selected = codeCPC;
  }

  ngOnInit() : void {
    this.addProductForm = this.formBuilder.group({
      productName:['',Validators.required],
      productDescription:['',Validators.required],
      // productState:['en attente'],
      productHauteur:[''],
      productLargeur:[''],
      productLongueur:[''],
      productPoids:[''],
      productVolume:[''],
      productCode:[''],
      // productCategory:[''],
    })
  }

  

  // onFileSelected(event:Event) {
  //   let htmlInputElement = <HTMLInputElement>event.target!;
  //   const file = htmlInputElement.files ? htmlInputElement.files[0] :null;
    
  //   if (file) {

  //       this.fileName =file.name;

  //       const formData = new FormData();

  //       formData.append("file", file);
  //       this.productService.uploadFile(formData).subscribe();
        
  //   }
  // }
  onFileSelected(event:any){
  //   const reader = new FileReader();
  //   if (event) {
  //     this.fileName = event.target?.files[0].name
  //     reader.readAsDataURL(event.target?.files[0]);
  //     reader.onload = () =>{
  //       console.log(reader.result);
  //     }
  // } if (event.target.files && event.target.files[0]) {

    const filesAmount = event.target.files.length;
    if (filesAmount>0) {
      for (let i = 0; i < filesAmount; i++) {
  
        const reader = new FileReader();
  
        reader.onload = (event:any) => {
          // console.log(event.target.result);
            this.productImage.push(event.target.result); 
          //  this.myForm.patchValue({
          //     fileSource: this.images
          //  });
        }
        reader.readAsDataURL(event.target.files[i]);
      }      
    }else{
      const reader = new FileReader();
  
        reader.onload = (event:any) => {
          // console.log(event.target.result);
            this.productImage.push(event.target.result);
            reader.readAsDataURL(event.target.files[0]);        
    }
    console.log(this.productImage[0])
    console.log(this.firstImage)
    this.firstImage = this.productImage[0];
  }

  }
  get fc(){
    return this.addProductForm.controls;
  }
  submit(){
    this.isSubmitted =true;
    if (this.addProductForm.invalid){ 
        console.log(this.addProductForm.getError);
        alert("Veuillez remplir correctement les champs obligatoires!");
        return;
      }
    
    const fv = this.addProductForm.value;
    console.log(fv.userName);
    this.product = {

      codeCPC           : this.selected,
      productName       : fv.productName,
      productDescription: fv.productDescription,
      productCategory   : fv.productCategory,
      productState      : "En attente",
      productValidation : false,
      productImage      : this.productImage,
      productHauteur    : fv.productHauteur,
      productLargeur    : fv.productLargeur,
      productLongueur   : fv.productLongueur,
      productPoids      : fv.productPoids,
      productVolume     : fv.productVolume
    };
    // console.log(this.user);
    this.productService.addProduct(this.product).subscribe(_ => {
      alert("adding product successfully!");
      this.router.navigateByUrl("user-products");
    })
  }
}
